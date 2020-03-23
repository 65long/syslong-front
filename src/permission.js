import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style 页面进度条
import { getToken } from '@/utils/auth' // get token from cookie 从cookie中获取token
import getPageTitle from '@/utils/get-page-title'
import { getMenus } from '@/api/login' // 获取后台菜单
import { filterAsyncRouter } from './store/modules/permission' // 为生成添加动态路由做准备

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  console.log('from---', from.fullPath)
  console.log('to---', to.fullPath)
  console.log('--------华丽的分割线---------')
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // const hasGetUserInfo = store.getters.name
      // if (hasGetUserInfo) {
      //   next()
      // } else {
      //   try {
      //     // get user info
      //     await store.dispatch('user/getUserInfo')
      //
      //     next()
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
      // 判断是否已经成功获取用户角色信息
      if (store.getters.roles.length === 0) {
        // 若要获取用户信息可打开注释
        // store.dispatch('user/getUserInfo')
        store.dispatch('user/addRole')
          .then(
            getMenus()
              .then(res => {
                // 定义动态路由
                const asyncRouter = filterAsyncRouter(res.menu_list)
                // 添加任意匹配不到任意路由界面访问404
                asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
                store.dispatch('permission/GenRoutes', asyncRouter)
                // 存储路由到state.addRouters
                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                router.options.routes = store.getters.routers // 此处可以添加如果更改sidebar引用源则不必添加
                next({ ...to, replace: true })// hack方法 确保addRoutes已完成
              })
              .catch(err => {
                console.log('获取后台菜单失败', err)
              })
          )
        // 放行
        next()
      } else {
        // 成功获取过信息就直接放行
        next()
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
