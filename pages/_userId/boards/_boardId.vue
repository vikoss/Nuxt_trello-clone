<template>
  <main>
    <section class="px-5 pt-2  text-white">
      <span class="inline-block">
        <view-boards-icon size="2x" class="inline-block" />
        <h1 class="font-bold inline-block">
          {{ board.name }}
        </h1>
      </span>
      <span id="container-activities">
        <div
          v-show="!show"
          class="flex justify-center items-center rounded cursor-pointer bg-white-light hover:bg-white-transparent float-right px-2 ml-2 h-8"
          @click="showActivities"
        >
          <dots-horizontal-icon size="2x" />
          <h2 class="ml-1">
            Mostrar actividad
          </h2>
        </div>
        <activities v-show="show" :activities="activities[$route.params.boardId]" @close="showActivities" />
      </span>
      <span id="container-invite">
        <div
          class="flex justify-center items-center rounded cursor-pointer bg-white-light hover:bg-white-transparent float-right px-2 h-8"
          @click="showInvite"
        >
          <user-add-icon size="1.3x" />
          <h2 class="ml-1">
            Invitar
          </h2>
        </div>
        <div
          v-show="showInviteSection"
          class="absolute right-1 bg-white text-black shadow-2xl rounded px-2 max-w-xs"
          style="top: 6.3rem;"
        >
          <section class="border-b py-2">
            <user-add-icon size="1.7x" class="inline-block opacity-70" />
            <h3 class="inline-block">
              Invitar al tablero
            </h3>
            <x-icon size="2x" class="cursor-pointer float-right opacity-70 hover:opacity-50" @click="showInvite" />
          </section>
          <section class="py-2">
            <div class="my-2">
              <p class="text-sm font-medium">
                Invita a mas usuarios compartiendo el enlace.
              </p>
              <input-base id="input-invite-url" v-model="inviteURL" readonly class="my-2" />
              <button-base id="button-invite-url" text="Copiar" />
              <p class="opacity-40 text-xs mt-2">
                Cualquier usuario que tenga el enlace podra unirse al tablero.
              </p>
            </div>
          </section>
        </div>
      </span>
    </section>
    <div class="p-4 overflow-x-auto">
      <section v-if="!lists[$route.params.boardId]">
        <p>
          You have no lists yet.
        </p>
      </section>
      <div v-else class="flex">
        <list
          v-for="listItem in lists[$route.params.boardId]"
          :key="listItem.id"
          :list-id="listItem.id"
          :name="listItem.name"
          :order="listItem.order"
        />
        <div>
          <add-item
            name-item="lista"
            class="w-64"
            @create-item="createList"
          />
        </div>
      </div>
      <modal v-show="modals.card" />
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { ViewBoardsIcon, DotsHorizontalIcon, XIcon, UserAddIcon } from '@vue-hero-icons/outline'
import Activities from '~/components/Activities.vue'
import AddItem from '~/components/AddItem'
import List from '~/components/List'
import Modal from '~/components/Modal'
import { isObjectEmpty } from '~/utils/object'
import InputBase from '~/components/InputBase.vue'
import ButtonBase from '~/components/ButtonBase.vue'

export default {
  components: { List, AddItem, Modal, Activities, ViewBoardsIcon, DotsHorizontalIcon, InputBase, XIcon, ButtonBase, UserAddIcon },
  data: () => ({
    list: {
      name: '',
      archived: false
    },
    show: false,
    showInviteSection: false,
    inviteURL: ''
  }),
  computed: {
    ...mapGetters(['boards', 'lists', 'activities', 'modals']),
    ...mapGetters('auth', ['user']),
    board () {
      const boards = this.boards[this.$route.params.userId]
      if (!boards) {
        return {}
      }
      return boards.find(board => board.id === this.$route.params.boardId)
    },
    boardId () {
      return this.$route.params.boardId
    },
    backgroundColor () {
      return this.board.background
    }
  },
  watch: {
    backgroundColor (color) {
      this.setBackgroundColor(color)
    }
  },
  beforeCreate () {
    this.$store.dispatch('FETCH_LISTS', this.$route.params.boardId)
    this.$store.dispatch('FETCH_ACTIVITIES', this.$route.params.boardId)
    if (isObjectEmpty(this.$store.getters.boards[this.$route.params.userId])) {
      this.$store.dispatch('FETCH_BOARDS', this.$route.params.userId)
    }
  },
  mounted () {
    this.inviteURL = `${window.location.origin}/invite/${this.$route.params.boardId}`
    window
      .addEventListener('click', this.hideActivities)
    window
      .addEventListener('click', this.hideInvite)
    document
      .getElementById('button-invite-url')
      .addEventListener('click', this.copyToClipboard)
  },
  beforeDestroy () {
    window.removeEventListener('click', this.hideActivities)
  },
  methods: {
    ...mapActions({
      createItem: 'CREATE_ITEM',
      updateItem: 'UPDATE_ITEM'
    }),
    ...mapMutations({
      setBackgroundColor: 'SET_BACKGROUND_COLOR'
    }),
    createList (name) {
      const boardId = this.$route.params.boardId
      this.createItem({
        item: {
          ...this.list,
          boardId,
          name
        },
        resource: 'lists'
      })
        .then(() => {
          this.createItem({
            item: {
              boardId,
              text: `${this.$store.state.auth.user.email} ah agregado una nueva lista "${name}" a este tablero.`
            },
            resource: 'activities'
          })
          this.updateItem({
            item: this.board,
            resource: 'boards'
          })
        })
    },
    showActivities () {
      this.show = !this.show
    },
    showInvite () {
      this.showInviteSection = !this.showInviteSection
    },
    hideActivities ({ target }) {
      const activityContainer = document.getElementById('container-activities')
      if (activityContainer) {
        if (!activityContainer.contains(target) && this.show) {
          this.show = false
        }
      }
    },
    hideInvite ({ target }) {
      const inviteContainer = document.getElementById('container-invite')
      if (inviteContainer) {
        if (!inviteContainer.contains(target) && this.showInviteSection) {
          this.showInviteSection = false
        }
      }
    },
    copyToClipboard () {
      document
        .getElementById('input-invite-url')
        .select()
      document
        .execCommand('copy')
      document
        .getElementById('button-invite-url')
        .innerHTML = 'Copiado!'
    }
  }
}
</script>

<style>

</style>
