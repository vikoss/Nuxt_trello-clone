import { v4 as uuid } from 'uuid'
import Vue from 'vue'
import { db } from '../plugins/firebase'
import { orderByDate } from '~/utils/array'

export default {
  state: () => ({
    boards: {},
    lists: {},
    cards: {},
    activities: {},
    itemTmp: {},
    backgroundColor: 'gray',
    modals: {
      card: false
    }
  }),
  mutations: {
    SET_BACKGROUND_COLOR: (state, color) => (state.backgroundColor = color),
    SET_ITEM_TMP: (state, item) => (state.itemTmp = item),
    SET_MODAL: (state, { name, value }) => (state.modals[name] = value),
    SET_ITEMS: (state, { resource, id, items }) => {
      Vue.set(state[resource], id, items)
    }
  },
  getters: {
    boards: state => state.boards,
    lists: state => state.lists,
    cards: state => state.cards,
    activities: state => state.activities,
    itemTmp: state => state.itemTmp,
    modals: state => state.modals,
    backgroundColor: state => state.backgroundColor
  },
  actions: {
    CREATE_ITEM: (context, { item, resource }) => new Promise((resolve, reject) => {
      const dateNow = Math.floor(Date.now() / 1000)
      const newItem = {
        ...item,
        createdAt: dateNow,
        updatedAt: dateNow,
        id: uuid()
      }
      db
        .collection(resource)
        .doc(newItem.id)
        .set(newItem)
        .then(() => resolve(newItem))
        .catch(error => reject(error))
    }),
    FETCH_BOARDS: ({ commit }, ownerId) => {
      // WHERE array-contains
      db
        .collection('boards')
        .where('memberId', 'array-contains', ownerId)
        .onSnapshot((snapshot) => {
          const boards = []
          snapshot.forEach(board => boards.push(board.data()))
          commit('SET_ITEMS', { items: boards, resource: 'boards', id: ownerId })
        })
    },
    FETCH_LISTS: ({ commit, state }, boardId) => new Promise((resolve, reject) => {
      db
        .collection('lists')
        .where('boardId', '==', boardId)
        .onSnapshot((snapshot) => {
          const lists = []
          snapshot.forEach(list => lists.push(list.data()))
          commit('SET_ITEMS', { items: lists, resource: 'lists', id: boardId })
          resolve(state.lists)
        }, error => reject(error))
    }),
    FETCH_CARDS: ({ commit }, listId) => {
      db
        .collection('cards')
        .where('listId', '==', listId)
        .onSnapshot((snapshot) => {
          const cards = []
          snapshot.forEach(card => cards.push(card.data()))
          commit('SET_ITEMS', { items: cards, resource: 'cards', id: listId })
        })
    },
    UPDATE_ITEM: (context, { item, resource }) => new Promise((resolve, reject) => {
      const newItem = { ...item, updatedAt: Math.floor(Date.now() / 1000) }
      db
        .collection(resource)
        .doc(newItem.id)
        .update(newItem)
        .then(() => resolve(newItem))
        .catch(error => reject(error))
    }),
    FETCH_ACTIVITIES: ({ commit, state }, boardId) => new Promise((resolve, reject) => {
      db
        .collection('activities')
        .where('boardId', '==', boardId)
        .onSnapshot((snapshot) => {
          const activities = []
          snapshot.forEach(list => activities.push(list.data()))
          commit('SET_ITEMS', { items: orderByDate(activities), resource: 'activities', id: boardId })
          resolve(state.activities)
        }, error => reject(error))
    }),
    ADD_MEMBER_TO_BOARD: ({ rootGetters: getters, dispatch }, boardId) => new Promise((resolve, reject) => {
      dispatch('FETCH_ITEM', { resource: 'boards', id: boardId })
        .then(async (board) => {
          const userId = getters['auth/user'].id
          if (!board.memberId.includes(userId)) {
            board.memberId.push(userId)
            try {
              resolve(await dispatch('UPDATE_ITEM', { item: board, resource: 'boards' }))
            } catch (error) {
              reject(new Error('Error updating document.'))
            }
          }
          resolve(board)
        })
    }),
    FETCH_ITEM: (cxt, { resource, id }) => new Promise((resolve, reject) => {
      db
        .collection(resource)
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            resolve(doc.data())
          }
          reject(new Error('No such document!'))
        })
        .catch(error => reject(error))
    })
  }
}
