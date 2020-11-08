<template>
  <div class="not-found">
    <h1>Oops, something went wrong...</h1>
    <br>
    <p>The page your are trying to reach does not exist</p>
    <br>
    <p>you can go back by clicking <a style="cursor: pointer; text-decoration: underline;" v-on:click="$router.go(-1)">here</a></p>
  </div>
</template>

<script>
  export default {
    name: 'not-found'
  }
</script>

<style scoped>
  p {
      color: white;
  }

  .not-found {
    width: 100%;
  }
</style>
