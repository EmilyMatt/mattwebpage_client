<template>
  <div class="row">
    <label>{{label}}</label>
    <input type="text" v-model="text" />
  </div>
</template>

<script>
  export default {
    name: "recipesTextInput",
    data() {
      return {
        text: ""
      }
    },
    watch: {
      text: function (val) {
        let asc = true
        for (let i = 0; i < val.length; i++) {
          if (val.charCodeAt(i) >= 127)
            asc = false
        }

        this.$emit("valChange", val)

        let err = false
        if (val.length <= 0 || !asc)
          err = true

        this.$emit("valErr", err)
      }
    },
    props: ['label']
  }
</script>

<style scoped>
  input {
    margin-left: auto;
  }

  label {
    align-self: flex-start;
  }
</style>
