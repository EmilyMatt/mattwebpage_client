<template>
  <div class="verify">

    <h1 class="header">Email Verification</h1>
    <h3 class="subheader" style="color: green;">{{msg[0]}}<br />{{msg[1]}}</h3>

  </div>
</template>

<script>
  import axios from 'axios'
  import viewsFunctions from '../controllers/views'
  export default {
    name: 'verify',
    data() {
      return {
        msg: ['', '']
      }
    },
    mounted() {
      viewsFunctions.updateButtons(this.pagesList, null)
      axios({
        method: "GET",
        url: this.$route.params.proxy + '/server/saturn/verify/' + this.$route.params.code
      })
        .then(res => {
          if (!res.data.success)
            this.msg = ['Oops...Something went wrong', res.data.err]
          else
            this.msg = ['Thank you for verifying your email,', 'you may now connect to any of our games!']
        })
        .catch(err => {
          this.msg = ['Connectivity error,', 'an error has occured while connecting to server']
        })
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
