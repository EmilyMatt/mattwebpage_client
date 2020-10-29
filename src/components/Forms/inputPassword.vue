<template>
		<div class="input-password">

				<label>{{labelText}}</label>
				<input type="password" v-model="model" :style="`direction: ltr;`" :placeholder="placeholder">
				<transition name="fadeDown">
						<b class="err err-label" v-show="errorDisplay">{{errorText}}</b>
				</transition>

		</div>
</template>

<script>
		export default {
				name: "input-password",
				data() {
						return {
								model: this.modelProp,
								errorDisplay: false
						}
				},
				mounted() {
						this.$emit('model-change', this.modelProp || "false")
				},
				props: ["labelText", "errorText", 'modelProp', 'placeholder'],
				watch: {
						model: function(val) {
								//on value change, emit the change to parent
								val = this.errorDisplay ? "false" : val
								this.$emit('model-change', val)
						},
						modelProp: function(val) {
								this.model = val
						}
				}
		}
</script>

<style>

</style>
