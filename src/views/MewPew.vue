<template>
  <div class="mewpew">
    <h1>Mew Pew</h1>
    <h3 class="subheader">The space simulator</h3>

    <br />
    <br />

    <div class="banner">
      <img src="img/MewPew.png" />
    </div>
    
    <select id="selectOS" v-model="os">
      <option>Windows(x86x64)</option>
      <option>Linux</option>
    </select>

    <br /><br />

    <div v-show="os == 'Windows(x86x64)'">
      <button type="button" class="btn site-btn noanimation" @click="downloadMewPew('win')">Click Here <i class="fab fa-windows" /></button>
    </div>
    <div v-show="os == 'Linux'">
      <button type="button" class="btn site-btn noanimation" @click="downloadMewPew('linux')">Click Here <i class="fab fa-linux" /></button>
    </div>

  </div>
</template>

<script>

  import viewsFuctions from '../controllers/views'
  export default {
  
    name: 'mewpew',
    data() {
      return {
        os: ""
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
        console.log(os)
        let link = this.$route.params.proxy + "/downloadmewpew"
        if (os == "Linux")
          link += "_linux"
        window.open(link)
      }
    },
    props: ["pagesList"]
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
      left: 31.5vw;
      bottom: 15vh;
      box-shadow: 0 0 2px 2px black
  }

  select {
      position: relative;
      left: 30vw;
      bottom: 10vw;
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
