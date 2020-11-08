<template>

    <nav class="navbar navbar-expand navbar-white navbar-light">

        <ul class="navbar-nav">
            <li class="nav-item">
                <a id="burger" class="nav-link" @click="toggleMenu" style="cursor: pointer;">
                    <i class="fas fa-bars"/>
                </a>
            </li>
        </ul>

    </nav>
</template>

<script>
export default {
    name: "nav-bar",
    methods: {
        toggleMenu() {
            document.querySelector(".sidebar-wrapper").classList.toggle("collapsed")
            document.querySelector(".navbar").classList.toggle("collapsed")
            document.querySelector(".wrapper").classList.toggle("collapsed")
        }
    }
}
</script>

<style scoped>
  .navbar {
    z-index: 1001;
    background-color: var(--pallete1);
    position: fixed;
    display: flex;
    transition: 1s all;
    width: 100%;
    left: 15vw;
    padding-top: 0;
    padding-bottom: 0;
    top: -0.5vh;
  }

  i {
      color: var(--pallete2)
  }

    .navbar.collapsed {
        left: 0;
    }
    
    .dropdown-divider {
        border: 1px solid black;
    }

    .nav-item {
        cursor: pointer;
    }

  @media(max-width: 1550px) {
    .navbar {
      left: 20vw;
    }
  }

    @media(max-width: 1100px) {
      .navbar {
        border-bottom: 0;
        width: 60px;
        left: 0;
        transition: 1s all ease-out;
        border-bottom-right-radius: 10px;
      }

        .navbar.collapsed {
            left: calc(100% - 60px);
        }
    }

</style>
