<template>
  <div class="mewpew">
    <h1>Mew Pew</h1>
    <h3 class="subheader">The space simulator</h3>

    <br />
    <br />

    <div class="banner">
      <loading-img v-if="!imageReady"></loading-img>
      <img src="img/MewPew.jpg" :onload="imageReady = true" alt="MewPew banner" />
    </div>

    <div class="buttons">
      <select v-if="imageReady" id="selectOS" v-model="os">
        <option>Windows(x86x64)</option>
        <option>Linux</option>
      </select>

      <br />

      <div v-if="os == 'Windows(x86x64)' && imageReady">
        <button type="button" class="btn site-btn noanimation" @click="downloadMewPew('win')">Click Here <i class="fab fa-windows" /></button>
      </div>
      <div v-if="os == 'Linux' && imageReady">
        <button type="button" class="btn site-btn noanimation" @click="downloadMewPew('linux')">Click Here <i class="fab fa-linux" /></button>
      </div>
    </div>

  </div>
</template>

<script>

  import viewsFuctions from '../controllers/views'
  import Loading from '../components/Loading'
  export default {
  
    name: 'mewpew',
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
      downloadMewPew(os) {
        let link = this.$route.params.proxy + "/downloadmewpew"
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

  .mewpew {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      top: -20%;
      left: 10%;
  }

  .site-btn {
      box-shadow: 0 0 2px 2px black
  }

  select {
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
      }
  }
</style>
