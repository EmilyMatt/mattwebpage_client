<template>
  <div>
    <label>{{label}}</label>
    <input type="file" @change="uploadImg" />
    <br />
    <img :src="imgSrc" class="preview" />
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "recipesImageUpload",
    data() {
      return {
        imgSrc: this.$route.params.proxy +"/img/noImg.jpg"
      }
    },
    methods: {
      uploadImg(event) {
        this.$emit('submittable', false)
        const imgData = new FormData
        imgData.append("file", event.target.files[0])
        this.imgSrc = this.$route.params.proxy+"/img/loading.webp"

        axios({
          method: "POST",
          url: this.$route.params.proxy +"/server/recipes/uploadImg",
          data: imgData,
          validateStatus: false,
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        })
          .then(res => {
            this.imgSrc = this.$route.params.proxy+res.data.thumb
            this.$emit('errImage', "")
            this.$emit('submittable', true)
            this.$emit('valChange', res.data)

          })
          .catch(err => {
            imgSrc = this.$route.params.proxy +"/img/noImg.jpg"
            this.$emit('errImage', "There was an error uploading the image")
            this.$emit('submittable', true)
          })
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

  .preview {
      height: 300px;
      width: 300px;
      align-self: center;
      align-content: center;
      justify-content: center;
      justify-self: center;
      justify-items: center;
      align-items: center;
  }
</style>
