import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let pagesList = []
const routes = [
  {
    path: '/',
    name: 'stats',
    component: () => import('../views/Stats.vue'),
    props: {
      pagesList
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    props: {
      pagesList
    }
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import('../views/Recipes.vue'),
    props: {
      pagesList
    }
  },
  {
    path: '/recipes/:id',
    name: 'recipe-id',
    component: () => import('../views/RecipeId.vue')
  },
  {
    path: '/weather',
    name: 'weather',
    component: () => import('../views/Weather.vue'),
    props: {
      pagesList
    }
  },
  {
    path: '/mewpew',
    name: 'mewpew',
    component: () => import('../views/MewPew.vue'),
    props: {
      pagesList
    }
  },
  {
    path: '/submarines',
    name: 'submarines',
    component: () => import('../views/Submarines.vue'),
    props: {
      pagesList
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    props: {
      pagesList
    }
  },
  {
    path: '/verify/:code',
    name: 'verify',
    component: () => import('../views/Verify.vue'),
    props: {
      pagesList
    }
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
  }
]

routes.forEach(element => {
  if (element.name == "recipe-id" || element.name == "not-found" || element.name == "verify")
    return
  pagesList.push(element.name)
})

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  if (process.env.NODE_ENV == "development")
    to.params.proxy = "http://localhost:5000"
  else
    to.params.proxy = ""
  next()
})

router.afterEach((to, from) => {
  if (document.documentElement.clientWidth < 1100) {
    document.querySelector(".sidebar-wrapper").classList.remove("collapsed")
    document.querySelector(".navbar").classList.remove("collapsed")
    document.querySelector(".wrapper").classList.remove("collapsed")
  }
})

export default router;
