<template>
  <div class="home">
    <h1>Site Visitors</h1>
    <br />
    <br />
    <widget/>
  </div>
</template>

<script>
  import Widget from '../components/Widget.vue'
  import viewsFunctions from '../controllers/views'

export default {
  name: 'home',
    mounted() {
      viewsFunctions.updateButtons(this.pagesList, this.$options.name)
  },
  components: {
    'widget': Widget,
    },
  props:["pagesList"]
}
</script>

<style scoped>
  h1 {
      text-align: center;
  }
</style>
