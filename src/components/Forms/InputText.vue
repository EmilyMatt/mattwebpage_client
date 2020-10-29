<template>
		<div class="input-text">

				<label>{{labelText}}</label>
				<input type="text" v-model="model" :style="`direction: ${dir};`" :placeholder="placeholder">
				<transition name="fadeDown">
						<b class="err err-label" v-show="errorDisplay">{{errorText}}</b>
				</transition>

		</div>
</template>

<script>
		export default {
				name: "input-text",
				data() {
						return {
								model: this.modelProp,
								dir: "rtl",
								errorDisplay: false
						}
				},
				mounted() {
						this.$emit('valChange', this.modelProp || "false")
				},
				props: ["labelText", "errorText", 'modelProp', 'placeholder'],
				watch: {
						model: function(val) {

								//check the first letter for heb/eng, if heb, set direction to rtl, if heb and defined unicode, show error
								if (val == "")
										return this.dir = "rtl"
								const firstLetter = val.substring(0, 1)
								firstLetter.charCodeAt() > 255
										? unicode 
												? this.errorDisplay = true
												:this.dir = "rtl"
										: this.dir = "ltr"

								//on value change, emit the change to parent
								if (this.errorDisplay)
										val = "false"

								this.$emit('valChange', val)
						},
						modelProp: function(val) {
								this.model = val
						}
				}
		}
</script>

<style scoped>
		input {
				width: 200px;
				float: right;
				margin-left: 0.4vw;
		}
</style>
