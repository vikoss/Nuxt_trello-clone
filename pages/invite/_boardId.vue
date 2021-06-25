<template>
  <div>
    {{ boardId }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['user', 'isAuthenticated']),
    boardId () {
      return this.$route.params.boardId
    }
  },
  mounted () {
    if (this.isAuthenticated) {
      this.addMemberToBoard(this.$route.params.boardId)
        .then(({ id }) => this.$router.push(`/${this.user.id}/boards/${id}`))
        // Redirect to 500 page
        // .catch(error => console.log(error))
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapActions({ addMemberToBoard: 'ADD_MEMBER_TO_BOARD' })
  }
}
</script>

<style>

</style>
