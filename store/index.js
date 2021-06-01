import { v4 as uuid } from 'uuid'
import Vue from 'vue'
import { db } from '../plugins/firebase'

export default {
  state: () => ({
    boards: {},
    lists: {},
    cards: {},
    activities: {},
    itemTmp: {},
    modals: {
      card: false
    }
  }),
  mutations: {
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
    modals: state => state.modals
  },
  actions: {
    CREATE_ITEM: (context, { item, resource }) => new Promise((resolve, reject) => {
      const newItem = item
      newItem.createdAt = Math.floor(Date.now() / 1000)
      newItem.id = uuid()
      db
        .collection(resource)
        .doc(newItem.id)
        .set(newItem)
        .then(() => resolve(newItem))
        .catch(error => reject(error))
    }),
    FETCH_BOARDS: ({ commit }, ownerId) => {
      db
        .collection('boards')
        .where('ownerId', '==', ownerId)
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
      db
        .collection(resource)
        .doc(item.id)
        .update(item)
        .then(() => resolve(item))
        .catch(error => reject(error))
    })
  }
}
