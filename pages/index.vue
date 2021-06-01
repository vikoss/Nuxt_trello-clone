<template>
  <div class="container">
    <p v-show="boards.length">
      You have no boards yet.
    </p>
    <div v-for="boardItem in boards" :key="boardItem.id">
      <div>
        <h1>{{ boardItem.name }}</h1>
      </div>
    </div>
    <input id="name" v-model="board.name" type="text" name="name">
    <input type="button" value="Test" @click="createBoard">
  </div>
</template>

<script>
export default {
  async fetchBoards () {
    await this.$store.dispatch('FETCH_BOARDS', this.$route.params.id)
  },
  data: () => ({
    board: {
      name: '',
      background: 'default'
    },
    boards: []
  }),
  methods: {
    createBoard () {
      this.$store.dispatch('CREATE_BOARD', this.board)
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
