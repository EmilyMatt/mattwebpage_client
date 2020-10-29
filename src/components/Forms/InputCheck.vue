<template>
    <div class="input-check">

        <label>{{labelText}}</label>
        <input type="checkbox" v-model="model">

    </div>
</template>

<script>
    export default {
        name: 'input-check',
        data() {
            return {
                model: this.modelProp
            }
        },
        props: ["labelText", "modelProp"],
        watch: {
            //on value change, emit the change to parent
            model: function(val) {
                this.$emit('model-change', val)
            }
        }
    }
</script>

<style scoped>
    input {
        position: relative;
        float: right;
        right: 10px;
        top: 5px;
    }
</style>>

</style>