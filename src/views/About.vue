<template>
  <div class="about">
    <h1>About Me</h1>
    <h3 class="subheader">Emily Matheys, 24, from Tel-Aviv (for the time being)</h3>
    <h3 class="subheader">Self-taught software developer, and game designer.</h3>
    <br />
    <br />
    <br />
    <p class="aboutme">
      I was always fond of computers and loved the possibilities they offer,
      <br />but i'm hardly satisfied, so I had to do it myself:
      <br />starting with modding games, to developing games, to developing software,
      <br />network solutions, and now - web development.
      <br />I have yet to meet an obstacle I couldn't overcome, I'm a quick and witted autodidact,
      <br />and once I set my mind to something - I see it to the end.
      <br />If you think your workplace can offer me the right challanges, and stir up my passion,
      <br />you are welcome to have a look at <a href="/downloadcv" target="_blank">my CV</a> and contact me.
    </p>
  </div>
</template>

<script>
  import viewsFunctions from '../controllers/views'

export default {
  name: 'about',
    mounted() {
      viewsFunctions.updateButtons(this.pagesList, this.$options.name)
  },
  props:["pagesList"]
}
</script>

<style scoped>

  .about {
      display: flex;
      flex-direction: column;
      padding: 2%;
      width:100%;
  }

  .subheader {
    color: var(--pallete5);
  }

  p.aboutme {
    font-size: 1.3rem;
    color: antiquewhite;
    justify-self: flex-start;
    font-family: opensans;
    padding-bottom: 15%;
  }

  .aboutme a {
    color: var(--pallete3);
  }

  .home {
    min-width: 60vw;
  }
</style>
