<template>
  <div id="app">

    <side-bar/>
    <nav-bar/>
    <div class="wrapper">
      <transition name="fade"
                  mode="out-in"
                  + @beforeLeave="beforeLeave"
                  + @enter="enter"
                  + @afterEnter="afterEnter">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from './components/NavBar'
import Sidebar from './components/SideBar'

  export default {
    name: "app",
    data() {
      return {
        prevHeight: 0,
      };
    },
    methods: {
      beforeLeave(element) {
        this.prevHeight = getComputedStyle(element).height;
      },
      enter(element) {
        const { height } = getComputedStyle(element);

        element.style.height = this.prevHeight;

        setTimeout(() => {
          element.style.height = height;
        });
      },
      afterEnter(element) {
        element.style.height = 'auto';
      },
    },
  components: {
    'nav-bar': Navbar,
    'side-bar': Sidebar
  }
}
</script>

<style>
  :root {
    --pallete1: #111111;
    --pallete2: #c85417;
    --pallete3: #c87b17;
    --pallete4: #4a2b7a;
  }
  html, body {
    background-color: var(--pallete1);
  }

  label {
    color: var(--pallete1);
    font-family: OpenSans
  }

  .err-label {
      color: red;
  }

  .subheader {
      color: #9e9e9e;
      font-family: OpenSans
  }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f4f6f9;
}

.btn.site-btn {
  color: black;
  background-color: grey;
}

  .btn.site-btn:enabled {
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 2px;
    background-color: var(--pallete2);
    color: black;
    box-shadow: 0 0 5px 5px black;
    transition: all 0.5s;
  }

    .btn.site-btn:enabled:hover {
      background-color: var(--pallete4);
    }

.btn.site-btn:not(.noanimation):enabled {
  min-width: 120px;
}

.btn.site-btn:not(.noanimation):enabled:hover {
  padding-right: 25px;
}

.header {
  text-align: center;
}

.site-error {
  color: red;
  font-weight: 900;
}

.wrapper {
  position: fixed;
  left: 15vw;
  top: 6vh;
  padding-top: 2vh;
  transition: 1s;
  min-width: 85vw;
  height: 94vh;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
}

.wrapper.collapsed {
        left: 2vw;
    }

  @media (max-width: 1550px) {
    .wrapper {
      min-width: 80vw;
      left: 20vw;
    }
  }

    @media (max-width: 1100px) {
      .wrapper {
        min-width: 100vw;
        left: 0;
      }

      h1 {
        font-size: 42px!important;
      }

      .subheader {
          text-align: center;
          font-size: 24px;
      }
    }

    h1 {
      color: var(--pallete3);
      font-size: 72px;
      font-family: Wheaton;
    }

    h3 {
      font-family: OpenSans;
    }

    @font-face {
      font-family: Wheaton;
      src: url(../public/fonts/wheaton.ttf)
    }

    @font-face {
      font-family: OpenSans;
      src: url(../public/fonts/opensans.ttf);
    }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
