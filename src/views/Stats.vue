<template>
  <div class="stats">
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
  name: 'stats',
    mounted() {
      viewsFunctions.updateButtons(this.pagesList, this.$options.name)
  },
  components: {
    'widget': Widget,
    },
  props:["pagesList"]
}
</script>
