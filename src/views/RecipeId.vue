<template>
  <div class="recipe">
    <div class="row" style="align-self: center;">
      <h1>{{recipeInfo.name}}</h1>
    </div>
    <div class="row">
      <img id="img" v-if="recipeInfo.path" :src="this.$route.params.proxy+recipeInfo.path" @error="imgErr()" />
    </div>
    <br /><br />
    <div class="row">
      <p><b style="color: var(--pallete3)">Ingredients:</b></p>
    </div>
    <div class="row">
      <ol>
        <li v-for="(ingredient, idx) in recipeInfo.ingredients" :key="idx" style="color: white;">{{ingredient}}</li>
      </ol>
    </div>
    <div class="row">
      <p><b style="color: var(--pallete3)">Instructions:</b></p>
    </div>
    <div>
      <pre style="color: white;">{{recipeInfo.instructions}}</pre>
    </div>
  </div>
    
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'recipe-id',
    data() {
      return {
        recipeInfo: {}
      }
    },
    mounted() {
      axios({
        method: "GET",
        url: this.$route.params.proxy+"/server/recipes/getRecipe/" + this.$route.path.replace('/recipes/', '') 
      })
        .then(res => {
          this.recipeInfo = res.data
        })
    },
    methods: {
      imgErr() {
        const img = document.getElementById("img")
        img.setAttribute("width", "0")
        img.setAttribute("height", "0")
      }
    }
  }
</script>

<style scoped>
  .recipe {
    display:flex;
    flex-direction: column;
    width: 100%;
    padding-left: 3vw;
  }

  h1 {
    text-decoration: underline;
  }

  img {
    box-shadow: 0 0 5px 5px #000000;
    border-radius: 10%;
    height: 500px;
    width: 500px;
  }
</style>
