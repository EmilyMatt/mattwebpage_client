<template>

  <aside class="sidebar-wrapper">

    <router-link class="router-link" to="/">
      <img src="/img/logo.jpg" alt="Main Logo" class="brand-image" style="opacity: .8">
    </router-link>

    <div class="sidebar">
      <nav class="mt-2">

        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <br />
          <br />
          <br />
          <li class="nav-item">
            <router-link id="homeButton" to="/" class="nav-link">
              <i class="nav-icon fas fa-chess-queen" />
              <p>
                Home Page
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link id="recipesButton" to="/recipes" class="nav-link">
              <i class="nav-icon fas fa-bread-slice" />
              <p>
                Recipes
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link id="weatherButton" to="/weather" class="nav-link">
              <i class="nav-icon fas fa-cloud" />
              <p>
                Weather
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link id="mewpewButton" to="/mewpew" class="nav-link">
              <i class="nav-icon fas fa-rocket" />
              <p>
                Mew Pew
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link id="submarinesButton" to="/submarines" class="nav-link">
              <i class="nav-icon fas fa-compass" />
              <p>
                Submarines
              </p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link id="registerButton" to="/register" class="nav-link">
              <i class="nav-icon fas fa-globe" />
              <p>
                Register
              </p>
            </router-link>
          </li>

        </ul>

      </nav>
    </div>

    

  </aside>    

</template>

<script>
export default {
    name: 'side-bar'
}
</script>

<style scoped>

  .brand-image {
    position: relative;
    width: 100%;
    max-width: 250px;
    border-radius: 50%;
    box-shadow: 0 0 2px 2px var(--pallete2);
    left: 1vw;
    top: 1vh;
  }

  .nav-link {
    margin-top: 1px;
    margin-bottom: 1px;
    margin-left: 0.5vw;
    width: 90%;
    align-items: center;
    max-height: 40px;
    display: flex;
    transition: 0.2s;
    color: var(--pallete2);
    font-family: Wheaton;
    font-size: 1.5rem;
  }

    .nav-link.active {
      background-color: var(--pallete3);
      color: #111111;
    }

  .nav-link.active:hover {
    cursor: default;
  }

    .nav-link:not(.active):hover {
      padding-left: 25px;
      color: var(--pallete4);
    }

  p {
    position: relative;
    top: 10px;
    padding-left: 10px;
  }

  svg {
    margin-top: 3px;
  }

  .sidebar-wrapper {
    z-index: 1000;
    position: fixed;
    background-color: var(--pallete1);
    transition: 1s all;
  }

  @media(min-width: 1550px) {
    .sidebar-wrapper {
      width: 15vw;
      height: 100vh;
    }

    .sidebar-wrapper.collapsed {
      margin-left: -15vw;
    }
  }

  @media(max-width: 1550px) {

      .sidebar-wrapper {
          width: 20vw;
      }
      .sidebar-wrapper.collapsed {
        margin-left: -20vw;
      }
  }

  @media(max-width: 1100px) {
    .brand-image {
      position: relative;
      left: calc(50vw - 175px);
    }

    .sidebar-wrapper {
      height: 100vh;
      margin-left: -100vw;
      width: 100vw;
      transition: 1s all ease-out;
    }

    .sidebar-wrapper.collapsed {
      margin-left: 0;
      width: 100vw;
    }
  }

</style>
