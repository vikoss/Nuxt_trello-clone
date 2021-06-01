<template>
  <div>
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
    </div>
    <add-item
      name-item="lista"
      @create-item="createList"
    />
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
    ...mapGetters(['lists', 'modals', 'auth/user'])
  },
  beforeCreate () {
    this.$store.dispatch('FETCH_LISTS', this.$route.params.id)
  },
  methods: {
    ...mapActions({ createItem: 'CREATE_ITEM' }),
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
        .then(() => this.createItem({
          item: {
            boardId,
            text: `'Usuario estatico' ah agregado una nueva lista "${this.list.name}" a este tablero.`
          },
          resource: 'activities'
        }))
    }
  }
}
</script>

<style>

</style>
