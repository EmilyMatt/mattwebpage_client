<template>
		<div class="recipes">

				<h1 class="header ">The Recipes Book</h1>
				<br>
				<transition name="fade">
					<form-modal v-if="modalShow" @closeModal="modalShow=false" @submitted="modalShow=false; getRecipes()" />
				</transition>
				<div class="container">
						<div class="table-responsive">
								<table class="table table-responsive recipes">
										<thead>
												<tr>
														<th>#</th>
														<th>Recipe Name</th>
														<th>Added By</th>
														<th>Date Added</th>
														<th style="text-align: center;">Preview</th>
														<th>Views</th>
														<th>To Recipe</th>
												</tr>
										</thead>
										<tbody>
														<table-row v-for="recipe in recipes" 
																:prop_index="recipe.number" 
																:prop_recipeName="recipe.name" 
																:prop_addedBy="recipe.addedBy" 
																:prop_dateAdded="recipe.dateAdded" 
																:prop_thumb="recipe.thumb" 
																:prop_views="recipe.views"
																:prop_link="recipe.link"
																:key="recipe.index"
														/>
										</tbody>
								</table>
						</div>
				</div>
				<br>
				<div><p class="site-error" v-show="err_max">Too many recipes!</p></div>
				<div><p class="site-error" v-show="err_axios">An error has occured while loading recipes</p></div>
				<button id="add-recipe" class="btn site-btn" :disabled="addDisabled" @click="modalAnimation">Add Recipe</button>
				<br><br>
				<pre class="subheader">This information is provided as a public service for all of Tel Aviv's citizens
who are completely dependant on 10bis and are helpless around the kitchen</pre>
</div>
</template>

<script>
		import RecipesTableRow from '../components/Recipes/RecipesTableRow'
		import RecipesFormModal from '../components/Recipes/RecipesFormModal'
		import viewsFunctions from '../controllers/views'
		import axios from 'axios'

		export default {
				name: 'recipes',
				props: ["pagesList"],
				//"global" variables for component
				data() {
						return {
								recipes: [],
								modalShow: false,
								addDisabled: false,
								err_axios: false,
								err_max: false,
						}
				},
				mounted() {
						//add event listener for screen resizes
						window.addEventListener('resize', this.screenResize)

						//update sidebar buttons
					viewsFunctions.updateButtons(this.pagesList, this.$options.name)
					this.getRecipes()
				},
		methods: {
			getRecipes() {
        //get weather data from server and save it to component variable
        axios({
          method: "GET",
          url: this.$route.params.proxy+"/server/recipes/getRecipes"
        })
          .then(response => {
            this.err_axios = false
            this.recipes = response.data.data
          })
          .catch(() => {
            //handle error if no data exists
            this.err_axios = true
          })
      },
						modalAnimation()
						{
						this.modalShow = !this.modalShow
						},
						screenResize() {

						}
				},
				components: {
						'table-row': RecipesTableRow,
						'form-modal': RecipesFormModal
				}
		}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

<style scoped>
  .container {
    box-shadow: 0 0 5px 5px black;
    max-height: 65vh;
    overflow-y: auto;
    background-color: darkgrey;
    border-radius: 0.5rem;
  }

		pre {
						color:white;
		}

		@media(max-width: 620px) {
				h1 {
						text-align: left!important;
				}
				.container {
					position: relative;
					margin-left: 0;
					margin-right: 0;
					max-width: 100vw;
				}
				.subheader {
					max-width: 90vw;
					font-size: 20px;
				
				}
		}
</style>
