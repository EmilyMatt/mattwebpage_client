<template>
  <div class="submarines">
    <h1>Submarines [WIP]</h1>
    <h3 class="subheader">Battle in the deep</h3>

    <br />
    <br />

    <div class="banner">
      <loading-img v-if="!imageReady"></loading-img>
      <img src="img/Submarines.png" :onload="imageReady = true" />
    </div>
    
    <select v-if="imageReady" id="selectOS" v-model="os">
      <option>Windows(x86x64)</option>
      <option>Linux</option>
    </select>

    <br /><br />

    <div v-if="os == 'Windows(x86x64)' && imageReady">
      <button type="button" class="btn site-btn noanimation" @click="downloadSubmarines('win')">Click Here <i class="fab fa-windows" /></button>
    </div>
    <div v-if="os == 'Linux' && imageReady">
      <button type="button" class="btn site-btn noanimation" @click="downloadSubmarines('linux')">Click Here <i class="fab fa-linux" /></button>
    </div>

  </div>
</template>

<script>

  import viewsFuctions from '../controllers/views'
  import Loading from '../components/Loading'
  export default {
  
    name: 'submarines',
    data() {
      return {
        os: "",
        imageReady: false
      }
    },
    mounted() {
      viewsFuctions.updateButtons(this.pagesList, this.$options.name)
      const osLocal = navigator.appVersion
      if (osLocal.indexOf("Win") != -1)
        this.os = "Windows(x86x64)"
      else if (osLocal.indexOf("Linux") != -1)
        this.os = "Linux"
      else
        this.os = "none"
    },
    methods: {
      downloadSubmarines(os) {
        let link = this.$route.params.proxy + "/downloadsubmarines"
        if (os == "Linux")
          link += "_linux"
        window.open(link)
      }
    },
    props: ["pagesList"],
    components: {
      'loading-img': Loading
    }
}
</script>

<style scoped>
  h1 {
      text-align: center;
  }

  h3 {
      text-align: center;
  }

  .site-btn {
      position: relative;
      left: 6.5vw;
      bottom: 15vh;
      box-shadow: 0 0 2px 2px black
  }

  select {
      position: relative;
      left: 5vw;
      bottom: 15vh;
      box-shadow: 0 0 2px 2px black;
  }

  .banner img {
      width: 50vw;
      z-index: 0;
      border-radius: 5%;
      box-shadow: 0 0 5px 5px black;
  }

  @media(max-width: 1100px) {
      .banner img {
          width: 90vw;
      }
      .site-btn {
          width: 28vw;
          height: 3vh;
          padding: 0;
          left: 50vw;
      }
      select {
          left: 45vw;
      }
  }
</style>
