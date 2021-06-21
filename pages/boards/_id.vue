<template>
  <main>
    <section class="px-5 pt-2  text-white">
      <span class="inline-block">
        <view-boards-icon size="2x" class="inline-block" />
        <h1 class="font-bold inline-block">
          {{ boards[$store.state.auth.user.id].find(board => board.id === $route.params.id).name }}
        </h1>
      </span>
      <span id="container-activities">
        <div
          v-show="!show"
          class="flex justify-center items-center rounded cursor-pointer bg-white-light hover:bg-white-transparent float-right px-2"
          @click="showActivities"
        >
          <dots-horizontal-icon size="2x" />
          <h2 class="ml-1">
            Mostrar actividad
          </h2>
        </div>
        <activities v-show="show" :activities="activities[$route.params.id]" @close="showActivities" />
      </span>
    </section>
    <div class="p-4 overflow-x-auto">
      <section v-if="!lists[$route.params.id]">
        <p>
          You have no lists yet.
        </p>
      </section>
      <div v-else class="flex">
        <list
          v-for="listItem in lists[$route.params.id]"
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
import { mapGetters, mapActions } from 'vuex'
import { ViewBoardsIcon, DotsHorizontalIcon } from '@vue-hero-icons/outline'
import Activities from '~/components/Activities.vue'
import AddItem from '~/components/AddItem'
import List from '~/components/List'
import Modal from '~/components/Modal'

export default {
  components: { List, AddItem, Modal, Activities, ViewBoardsIcon, DotsHorizontalIcon },
  data: () => ({
    list: {
      name: '',
      archived: false
    },
    show: false
  }),
  computed: {
    ...mapGetters(['boards', 'lists', 'activities', 'modals', 'auth/user'])
  },
  beforeCreate () {
    this.$store.dispatch('FETCH_LISTS', this.$route.params.id)
    this.$store.dispatch('FETCH_ACTIVITIES', this.$route.params.id)
  },
  mounted () {
    window.addEventListener('click', this.hideActivities)
  },
  destroyed () {
    window.removeEventListener('click', this.hideActivities)
  },
  methods: {
    ...mapActions({ createItem: 'CREATE_ITEM', updateItem: 'UPDATE_ITEM' }),
    createList (name) {
      const boardId = this.$route.params.id
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
            item: this.boards[this.$store.state.auth.user.id].find(board => board.id === boardId),
            resource: 'boards'
          })
        })
    },
    showActivities () {
      this.show = !this.show
    },
    hideActivities ({ target }) {
      const activityContainer = document.getElementById('container-activities')
      if (activityContainer) {
        if (!activityContainer.contains(target) && this.show) {
          this.show = false
        }
      }
    }
  }
}
</script>

<style>

</style>
