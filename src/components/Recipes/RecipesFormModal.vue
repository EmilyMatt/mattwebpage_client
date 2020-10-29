<template>
  
    <div id="modal-mask">
        <div id="modal-wrapper">

            <div id="modal-header">
              <h1>Add Recipe</h1>
              <span class="close" @click="$emit('closeModal')">&times;</span>
            </div>

            <div id="modal-body">

              <div class="box">
                <recipes-text-input label="Recipe Name:" @valChange="inputs[0] = $event" @valErr="errs[0] = $event"></recipes-text-input>
                <br />

                <recipes-text-input label="Contributor:" @valChange="inputs[1] = $event" @valErr="errs[1] = $event"></recipes-text-input>
                <br />

                <recipes-text-area label="Instructions:" @valChange="inputs[2] = $event" @valErr="errs[2] = $event"></recipes-text-area>

              </div>

              <div class="box">
                <recipes-text-ingredients label="Ingredients:" @valChange="inputs[3] = $event" @valErr="errs[3] = $event"></recipes-text-ingredients>
                
              </div>

              <div class="box">
                <recipes-image-upload label="Upload Image:" @valChange="img = $event" @submittable="toggleSubmit" @valErr="errs[4] = $event"></recipes-image-upload>
              </div>
              
            </div>

            <div id="modal-footer">
              <button class="btn site-btn" @click="submitRecipe" :disabled="!submittable">Submit</button>
            </div>

        </div>
    </div>

</template>

<script>
  import axios from 'axios'
  import RecipesTextIngredientsVue from "./RecipesTextIngredients.vue";
  import RecipesTextInputVue from "./RecipesTextInput.vue";
  import RecipesImageUploadVue from './RecipesImageUpload.vue'
  import RecipesTextAreaVue from "./RecipesTextArea.vue";

  export default {
    name: 'form-modal',
    data() {
      return {
        errs: [true, true, true, true],
        inputs: ["", "", "", [""]],
        img: { uploaded: false, uuid: "", path: "", thumb: "" },
        submittable: true
      }
    },
    methods: {
      submitRecipe() {
        if (this.errs.includes(true)) {
          return
        }
        else {
          //set up form data
          let formObj = {
            name: this.inputs[0],
            addedBy: this.inputs[1],
            instructions: this.inputs[2],
            ingredients: this.inputs[3],
          }

          //if an image has been uploaded add the image data from the server
          if (this.img.uploaded) {
            formObj.uuid = this.img.uuid
            formObj.path = this.img.path
            formObj.thumb = this.img.thumb
          }
          console.log(formObj)

          //send the form data
          axios({
            method: "POST",
            url: this.$route.params.proxy+"/server/recipes/postRecipe",
            data: formObj,
          })
            //if success then show and redirect
            .then(() => {
              this.$emit('submitted')
            })
            //if error then show error and allow retry
            .catch(() => {
            })
        }
      },
      toggleSubmit(event) {
        this.submittable = event
      }
    },
    components: {
      'recipes-text-input': RecipesTextInputVue,
      'recipes-text-ingredients': RecipesTextIngredientsVue,
      'recipes-image-upload': RecipesImageUploadVue,
      'recipes-text-area': RecipesTextAreaVue
    }
  }
</script>

<style scoped>
    #modal-mask {
        position: absolute;
        display: flex;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
    }

    #modal-wrapper {
        display: flex;
        flex-direction: column;
        height: 60vh;
        width: 60vw;
        margin: 5%;
    }

  #modal-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 5px;
    height: 10%;
    border-bottom: 1px solid black;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background-color: rgb(168, 168, 168);
    color: darkgreen;
  }

  .close{
      font-size: 50px;
      margin-left: auto;
  }

  h1 {
      margin: auto;
      margin-left: 23vw;
  }

  #modal-body {
    display: flex;
    padding: 20px;
    flex-direction: row;
    height: 100%;
    background-color: rgb(192, 192, 192);
  }

  .box {
      display: flex;
      width: 20vw;
      flex-direction: column;
      align-items: center;
  }

  #modal-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    bottom: 0;
    padding: 20px;
    border-top: 1px solid black;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    background-color: rgb(168, 168, 168);
  }

  #modal-footer button {
      width: 100px;
  }

</style>
