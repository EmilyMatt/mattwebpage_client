<template>

    <tr>
        <td style="padding-left: 12px">{{prop_index}}</td>
        <td>{{prop_recipeName}}</td>
        <td>{{prop_addedBy}}</td>
        <td>{{prop_dateAdded}}</td>
        <td>
          <img width="100" style="border-radius: 5%; box-shadow: 0 0 2px 2px black; object-fit: contain;" :src="$route.params.proxy+thumb" :onerror="thumb = '/img/noImg.jpg'">
        </td>
        <td style="text-align: center;">{{prop_views}}</td>
        <td style="text-align: center;"><button id="linker" class="btn site-btn noanimation" @click="$router.push(prop_link)">>></button></td>
    </tr>
</template>

<script>
    export default {
    name: "tableRecipe",
    data() {
      return {
        thumb: ""
      }
    },
    mounted() {
      if (this.prop_thumb == "")
        this.thumb = "/img/noImg.jpg"
      else
        this.thumb = this.prop_thumb
    },
        props: ["prop_index", "prop_recipeName", "prop_addedBy", "prop_dateAdded", "prop_thumb", "prop_views", "prop_link"],
  }
</script>

<style scoped>
  tr td {
    vertical-align: middle
  }
</style>
