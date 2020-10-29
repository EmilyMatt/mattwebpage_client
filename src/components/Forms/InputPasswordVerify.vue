<template>
		<div class="input-password-verify">

				<div class="inputs">
						<label>Password: </label>
						<input type="password" v-model="passwordModel" :placeholder="placeholder">
						<transition name="fadeDown">
								<p class="err err-label" v-show="passwordErrorDisplay"><b>Password is invalid</b></p>
						</transition>
				</div>
				<div class="inputs">
						<label>Confirm password: </label>
						<input type="password" v-model="verifyModel" :placeholder="placeholder">
						<transition name="fadeDown">
								<p class="err err-label" v-show="verifyErrorDisplay"><b>Passwords do not match.</b></p>
						</transition>
				</div>

		</div>
</template>

<script>

		export default {
				name: "input-password-verify",
				data() {
						return {
								passwordModel: '',
								passwordErrorDisplay: false,
								verifyModel: '',
								verifyErrorDisplay: false
						}
				},
				mounted() {
						this.$emit('valChange', this.modelProp || "false")
				},
				methods: {
						validatePasswords() {

								const checkErrors = () => {
										return this.passwordModel == '' || this.verifyModel == '' || this.passwordErrorDisplay || this.verifyErrorDisplay

								}   

								this.passwordErrorDisplay = false
								this.verifyErrorDisplay = false
								
								//if password is empty, show no errors but also emit false
								if (this.passwordModel.length == 0)
										return this.$emit('valChange', false)

								//password policy here: current - longer than 6, shorter than 18, only unicode, no spaces
								//if password is not within policy, show error
								if (this.passwordModel.length < 6 || this.passwordModel.length > 18)
										this.passwordErrorDisplay = true

								//if any character is not unicode, or is a space, show error
								const characters = this.passwordModel.split('')
								characters.forEach(element => {
										if (element.charCodeAt() > 255 || element == ' ')
												this.passwordErrorDisplay = true
								})

								//if passwords are not matching, show corresponding error, unless second password is still empty
								if (this.passwordModel != this.verifyModel && this.verifyModel != '')
										this.verifyErrorDisplay = true

								//if no errors emit value, else emit false
								const val = checkErrors()
										? "false"
										: this.passwordModel

								this.$emit('valChange', val)
						}
				},
				props: ["passwordLabelText", "passwordErrorText", "verifyErrorText", 'placeholder'],
				watch: {
						//whenever the password field changes
						passwordModel: function() {this.validatePasswords()},
						//whenever the second field changes
						verifyModel: function() {this.validatePasswords()},
						modelProp: function(val) {
								this.passwordModel = val
								this.verifyModel = val
						}
				}
		}
</script>

<style>

</style>

<style scoped>
  input {
    width: 100px;
    float: right;
    margin-left: 1vw;
  }
</style>
