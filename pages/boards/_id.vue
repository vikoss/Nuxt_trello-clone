<template>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AddItem from '~/components/AddItem'
import List from '~/components/List'
import Modal from '~/components/Modal'

export default {
  components: { List, AddItem, Modal },
  data: () => ({
    list: {
      name: '',
      archived: false
    }
  }),
  computed: {
    ...mapGetters(['boards', 'lists', 'modals', 'auth/user'])
  },
  beforeCreate () {
    this.$store.dispatch('FETCH_LISTS', this.$route.params.id)
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
    }
  }
}
</script>

<style>

</style>
