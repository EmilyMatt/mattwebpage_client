<template>
  <div class="loading">
    <img id="load-img" src="/img/Loading.png" :style="loadingRot" />
    <br />
    <br />
  </div>
</template>

<script>
  export default {
    name: 'loadingImg',
    data() {
      return {
        loadingRot: ''
      }
    },
    mounted() {
      this.loadingImg()
    },
    methods: {
      async loadingImg() {

        let angle = 0
        while (true) {
          this.loadingRot = `transform: rotate(${angle}deg)`
          await new Promise(res => setTimeout(() => res(), 1))
          angle++
          if (angle >= 360)
            angle = 0
        }
      }
    },
    props: ['condition']
  }
</script>

<style scoped>
  img {
    width: 30px;
    display:flex;
    margin-left: 45%;
  }
</style>
