<template>
    <div class="input-list">

        <label style="float: right">{{labelText}}</label>
        <select v-model="model">
            <option v-for="(option, idx) in optionsList" :key="idx">{{option}}</option>
        </select>

    </div>
</template>

<script>
    export default {
        name: 'input-list',
        data() {
            return {
                model: this.modelProp
            }
        },
        mounted() {
            this.$emit('model-change', this.modelProp || "false")
        },
        props: ['labelText', 'optionsList', 'modelProp'],
        watch: {
            //on value change, emit the change to parent
            model: function(val) {
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
