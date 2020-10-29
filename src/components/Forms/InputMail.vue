<template>
		<div class="input-mail">

				<label>{{labelText}}  &nbsp;</label>
				<input type="email" v-model="model" :placeholder="placeholder">
				<transition name="fadeDown">
						<p><b class="err err-label" v-show="errorDisplay">Invalid Mail Address</b></p>
				</transition>

		</div>
</template>

<script>

		export default {
				name: 'input-mail',
				data() {
						return {
								model: this.modelProp,
								verimail: new Comfirm.AlphaMail.Verimail(),
								errorDisplay: false
						}
				},
				mounted() {
						this.$emit('valChange', this.modelProp || "false")
				},
				methods: {
						validateMail(mail) {
								//reset suggestions after every input
								if (mail == "") {
										return this.errorDisplay = false
								}

								this.verimail.verify(mail, status => {
										//if mail is not a valid email show error
										this.errorDisplay = status < 0 ? true : false
								})
						}
				},
				props: ['labelText', "modelProp", "placeholder"],
				watch: {
						//on value change
						model: function(val) {

								this.validateMail(val)                

								//emit the change to parent
								val = this.errorDisplay ? "false" : val
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
    margin-left: 1vw;
  }

		label {
						float: left;
		}
</style>
