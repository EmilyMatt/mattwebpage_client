<template>
  <div class="row">
    <label>{{label}}</label>
    <div class="col">
      <template v-for="(ingredient, index) in ingredientIdx">
        <div class="row"><input type="text" :key="index" v-model="ingredients[index]" /></div>
      </template>
      <button class="btn ingbtn add" v-if="ingredientIdx < 10" @click="addIngredient">+</button>
      <button class="btn ingbtn sub" v-if="ingredientIdx > 1" @click="removeIngredient">-</button>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: "recipesTextIngredients",
    data() {
      return {
        ingredientIdx: 1,
        ingredients: []
      }
    },
    methods: {
      addIngredient() {
        if (this.ingredientIdx < 10)
          this.ingredientIdx++
      },
      removeIngredient() {
        if (this.ingredientIdx > 1)
          this.ingredientIdx--
      }
    },
    watch: {
      ingredients: function (val) {
        let asc = true
        if (this.ingredients.length == 0)
          asc = false
        else {
          this.ingredients.forEach(element => {
            if (element.length == 0)
              asc = false
            else {
              for (let i = 0; i < element.length; i++) {
                if (element.charCodeAt(i) >= 127)
                  asc = false
              }
            }
          })
        }

        this.$emit("valChange", this.ingredients)

        let err = false
        if (!asc)
          err = true

        this.$emit("valErr", err)
      }
    },
    props: ['label']
  }
</script>

<style scoped>

  label {
    align-self: flex-start;
  }

  input {
    max-width: 100px;
    margin-right: auto;
    margin-left: auto;
    margin-left: auto;
  }

  .ingbtn {
    border-radius: 50%;
    border: 1px solid black;
    height: 32px;
    width: 32px;
    padding: 0;
    transition: 0.25s all;
    margin-left: 5px;
    font-weight: 600;
  }

  .add {
    background-color: green;
  }
  .add:hover {
    background-color: darkgreen;
  }

  .sub {
    background-color: rgb(200, 0, 0);
  }
  .sub:hover {
    background-color: darkred;
  }
</style>
