<template>
  <div class="register">
    <h1>Register</h1>
    <h3 class="subheader">Sign up at Saturn Game Studios</h3>
    <transition name="fadeDown">
      <h3 style="color: green" v-show="success">An email has been sent to you, please verify your account</h3>
    </transition>
      <br />
    <transition name="fadeDown">
      <h3 style="color: green;" v-show="success">
        If you did not recieve your mail,
        <br /> check your spam folder or click
        <a href="#" @click="resendMail()">here</a>
        to resend
      </h3>
    </transition>

    <br />
    <br />

    <div class="myFlex">
      <p class="register-header">Sign up to enjoy all of our games for free!</p>
      <input-text labelText="Name:" @valChange="form.name = $event"></input-text>
      <input-mail labelText="Mail:" @valChange="form.mail = $event"></input-mail>
      <input-password-verify @valChange="form.password = $event"></input-password-verify>
      <br />
      <transition name="fadeDown">
        <p v-show="errorDisplay"><b class="err err-label">All fields must be valid.</b></p>
      </transition>
      <transition name="fadeDown">
        <p v-show="serverError"><b class="err err-label">{{serverError}}</b></p>
      </transition>
      <button class="btn site-btn" @click="createUser" :disabled="form.buttonDisabled">Submit</button>
      <br />
    </div>

  </div>
</template>

<script>
  import crypto from 'crypto'
  import viewsFunctions from '../controllers/views'
  import InputMailVue from '../components/Forms/InputMail.vue'
  import InputTextVue from '../components/Forms/InputText.vue'
  import InputPasswordVerifyVue from '../components/Forms/InputPasswordVerify'
  export default {
  
    name: 'register',
    data() {
      return {
        form: {
          name: '',
          mail: '',
          password: '',
          buttonDisabled: false
        },
        errorDisplay: false,
        serverError: '',
        success: false,
        resendLink: ''
      }
    },
    mounted() {
      viewsFunctions.updateButtons(this.pagesList, this.$options.name)
    },
    methods: {
      createUser() {
        if (Object.values(this.form).find(element => element == "false"))
          return this.errorDisplay = true;

        this.form.password = crypto.createHash('md5').update(this.form.password).digest('hex')
        axios({
          method: "POST",
          url: this.$route.params.proxy+'/server/saturn/postUser',
          data: this.form
        })
          .then(res => {
            if (!res.data.success)
              return this.serverError = res.data.err

            this.serverError = ""
            this.errorDisplay = false
            this.success = true
            this.resendLink = res.data.mail
          })
          .catch(() => {
            this.serverError("Connectivity Error")
            this.errorDisplay = true
            this.success = false
          })
      },
      resendMail() {
        this.success = false;
        axios({
          method: "GET",
          url: this.$route.params.proxy + '/server/saturn/resend/' + this.resendLink
        })
          .then(res => {
            if (!res.data.success)
              return this.serverError = res.data.err

            this.serverError = ""
            this.errorDisplay = false
            this.success = true
          })
          .catch(() => {
            this.serverError("Connectivity Error")
            this.errorDisplay = true
          })
      }
    },
    props: ["pagesList"],
    components: {
      "input-mail": InputMailVue,
      'input-password-verify': InputPasswordVerifyVue,
      'input-text': InputTextVue
    }
}
</script>

<style scoped>

  .register {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .register-header {
    width: 100%;
    text-align: center;
    padding-bottom: 1vh;
    padding-top: 1vh;
    background-color: #bbbbbb;
    border-bottom: 1px solid black;
    font-family: opensans;
    color: var(--pallete3);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .myFlex {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: darkgrey;
      border-radius: 20px;
      min-width: 50%;
      max-width: 1200px;
  }

  label {
      float:left;
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
