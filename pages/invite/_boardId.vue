<template>
  <div>
    {{ boardId }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['user']),
    boardId () {
      return this.$route.params.boardId
    }
  },
  mounted () {
    this.$store.dispatch('ADD_MEMBER_TO_BOARD', this.$route.params.boardId)
      .then(({ id }) => this.$router.push(`/${this.user.id}/boards/${id}`))
      // Redirect to 500 page
      // .catch(error => console.log(error))
  }

}
</script>

<style>

</style>
