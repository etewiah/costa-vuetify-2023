// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import HomePage from '../pages/HomePage.vue'

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomePage
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router

import Vue from 'vue'
import Router from 'vue-router'
// import UsersPage from '@jsroot/shared/pages/UsersPage'
// import HomePage from '../pages/HomePage'
import HomePage from '../pages/HomePage.vue'
// const BlogPostPage = () =>
//   import(
//     /* webpackChunkName: "route-blogpost" */ '../pages/BlogPostPage'
//   )
// const FavouritesIndex = () =>
//   import(
//     /* webpackChunkName: "route-favs" */ '@jsroot/theme-marbella/components-visitor/FavouritesIndex'
//   )
// // const ResalesCitySearch = () => import( /* webpackChunkName: "route-resalesCitySearch" */ '../pages/ResalesCitySearch')
// const ResalesRentalSearch = () =>
//   import(
//     /* webpackChunkName: "route-ResalesRentalSearch" */ '../pages/ResalesRentalSearch'
//   )
const ResalesSearch = () =>
  import(
    /* webpackChunkName: "route-resalesSearch" */ '../pages/ResalesSearch'
  )
const ResalesDetails = () =>
  import(
    /* webpackChunkName: "route-resalesDetails" */ '../pages/ResalesDetails'
  )
// const PromotionsSearch = () =>
//   import(
//     /* webpackChunkName: "route-promotionsSearch" */ '../pages/PromotionsSearch'
//   )
// const PromotionDetails = () =>
//   import(
//     /* webpackChunkName: "route-promotionsDetails" */ '../pages/PromotionDetails'
//   )
// // // const GenericContainer = () => import('@jsroot/theme-vienna/pages/GenericContainer')
// const BlogIndex = () =>
//   import(
//     /* webpackChunkName: "route-blogIndex" */ '../pages/BlogIndex'
//   )
const StdPageContainer = () =>
  import(
    /* webpackChunkName: "route-stdPage" */ '@/components/components-pages/StdPageContainer'
  )
// const AreaPage = () => import('@jsroot/shared/components-pages/AreaPage')
// const CollectionPage = () =>
//   import('@jsroot/shared/components-pages/CollectionPage')
// const SubAreaPage = () => import('@jsroot/shared/components-pages/SubAreaPage')


// import store from '@jsroot/theme-marbella/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: '/admin-vue/',
  // https://router.vuejs.org/en/advanced/scroll-behavior.html
  scrollBehavior(to, from, savedPosition) {
    if (from.path !== to.path) {
      // always scroll to top when route (not query params) changes
      return { x: 0, y: 0 }
    }
  },
  // https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js
  // above explains the pattern matching I can do in router
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage
    },
    {
      path: '/:locale(en|es|nl|fr|it)',
      name: 'landing',
      component: HomePage
    },
    // // Oct 2020 - collections for costa
    // {
    //   path: '/:locale(en|es|nl|fr|it)/collections/:pageSlug',
    //   name: 'collectionPage',
    //   component: CollectionPage
    // },
    // {
    //   path: '/:locale(en|es|nl|fr|it)/:preamble(areas|areás)/:areaSlug',
    //   name: 'provincePage',
    //   component: AreaPage
    // },
    // {
    //   path:
    //     '/:locale(en|es|nl|fr|it)/:preamble(areas|areás)/:areaSlug/:subAreaSlug',
    //   name: 'subProvincePage',
    //   component: SubAreaPage
    // },
    // {
    //   // login can redirect to route without locale:
    //   path: '/:locale?/users',
    //   component: UsersPage,
    //   name: 'users',
    //   redirect: {
    //     name: 'userSignIn'
    //   },
    //   children: [
    //     {
    //       path: 'sign_in',
    //       component: UsersPage,
    //       name: 'userSignIn',
    //     }
    //   ]
    // },
    // {
    //   path: '/:locale(en|es|nl|fr|it)/favourites',
    //   name: 'favouritesIndexPage',
    //   component: FavouritesIndex
    // },
    {
      path: '/:locale(en|es|nl|fr|it)/p/:pageName',
      name: 'standardPageDetails',
      // component: StandardPage
      component: StdPageContainer
    },
    // {
    //   path: '/:locale(en|es|nl|fr|it)/blog-posts/s/:pageName',
    //   name: 'blogPage',
    //   component: BlogPostPage
    // },
    // // {
    // //   path: '/:locale(en|es|nl|fr|it)/blog-posts/c/:categoryName',
    // //   name: 'blogsCategoryPage',
    // //   component: BlogsCategoryPage
    // // },
    // {
    //   path: '/:locale(en|es|nl|fr|it)/blog-posts',
    //   name: 'blogsIndexPage',
    //   component: BlogIndex
    // },
    // // {
    // //   path: '/:locale(en|es|nl|fr|it)/blog',
    // //   name: 'allBlogsPage',
    // //   // TODO - redirect this page
    // //   component: BlogIndex
    // // },

    // // {
    // //   path: '/:locale(en|es|nl|fr|it)/s/:preamble',
    // //   name: 'saleListingsSearch',
    // //   component: SaleListingsSearch,
    // // },
    // // {
    // //   path: '/:locale(en|es|nl|fr|it)/s/:preamble/:slugOrId',
    // //   name: 'saleListingDetails',
    // //   component: SaleListingDetails,
    // // },

    {
      path: '/:locale(en|es|nl|fr|it)/s/:preamble',
      name: 'resalesSearch',
      component: ResalesSearch
    },
    // {
    //   path: '/:locale(en|es|nl|fr|it)/aaa123/:preamble',
    //   name: 'resalesRentalSearch',
    //   component: ResalesRentalSearch
    // },
    // {
    //   path: '/:locale(en|es|nl|fr|it)/pr/:preamble',
    //   name: 'promotionsSearch',
    //   component: PromotionsSearch
    // },
    // {
    //   path: '/:locale(en|es|nl|fr|it)/pr/:preamble/:slugOrId',
    //   name: 'promotionDetails',
    //   component: PromotionDetails
    // },
    // {
    //   // path: '/:locale(en|es|nl|fr|it)/:prefix(r|s)/:preamble/:slugOrId',
    //   path: '/:locale(en|es|nl|fr|it)/r/:preamble/:slugOrId',
    //   name: 'resalesDetails2',
    //   component: ResalesDetails,
    //   meta: {
    //     breadcrumbKeys: [
    //       'location'
    //       // ,'proptype'
    //     ]
    //   }
    // },
    {
      path: '/:locale(en|es|nl|fr|it)/s/:preamble/:slugOrId',
      name: 'resalesDetails',
      component: ResalesDetails,
      meta: {
        breadcrumbKeys: [
          'location'
          // ,'proptype'
        ]
      }
    },
    // {
    //   path: '/:locale(en|es|nl|fr|it)/a/:preamble/:slugOrId',
    //   name: 'resalesRentalDetails',
    //   component: ResalesDetails,
    //   meta: {
    //     breadcrumbKeys: [
    //       'location'
    //       // ,'proptype'
    //     ]
    //   }
    // }

    // {
    //   path: '/:locale(en|es|nl|fr|it)/a/:preamble',
    //   name: 'shortTermRentalSearch',
    //   component: ShortTermRentalSearch,
    // },
    // {
    //   path: '/:locale(en|es|nl|fr|it)/a/:preamble/:city',
    //   name: 'shortTermRentalByCity',
    //   // might separate below into 2 components:
    //   component: ShortTermRentalSearch,
    // },

    // {
    //   path: '/:locale(en|es|nl|fr|it)/a/:preamble/:city/:slug',
    //   name: 'propRentalDetails',
    //   component: PropRentalDetails,
    // },
    // {
    //   path: '/:locale(en|es|nl|fr|it)/*',
    //   name: 'catchall',
    //   component: CatchAll
    // }
  ]
})
// router.afterEach((to, from) => {
//   store.dispatch('refreshCsrf')
// })
// router.beforeEach((to, from, next) => {
//   let classBaseName = to.name || 'unKnown'
//   let className = classBaseName
//     .split(/(?=[A-Z])/)
//     .join('-')
//     .toLowerCase()
//   store.commit('setBaseCss', { className: className })
//   // // clear out 404 stat in case it has been set
//   store.commit('set404', { is404: false })
//   next()
// })
export default router
