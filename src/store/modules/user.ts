import { defineStore } from 'pinia'
import { login } from '@/api/user'
import { da } from 'element-plus/es/locale'

interface UserInfo {
  route?: string | null
  label?: string | null
  subview?: string | null
  children?: object | null
}
export const useUserStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'userState',
  // state: 返回对象的函数
  state: () => ({
    // 登录token
    token: '',
    // 登录用户信息
    userInfo: {},
    // 角色
    roles: [],
  }),
  getters: {},
  // 可以同步 也可以异步
  actions: {
    // 登录
    login(userInfo) {
      const { username, password } = userInfo

      return new Promise(async (resolve, reject) => {
        this.token =
          'Bearer eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSiox099ANDXYNUtJRSq0oULIyNLE0NjCwsDQwNTY1MDbQUSotTi3yTFGyMq0FAH_cov00AAAA.hUvxfE4CSHKUwf1N_oHhOWmLOE_tEySM-7v7w_bP81BmK-JnFGBYhm7ycD1wZXVyU_HGPY0smxClq0Ih29Helg'
        login({ staffAccount: '13888888888', staffPwd: 'a123456' }).then((data) => {
          console.log(data)
        })
        this.userInfo = userInfo
        await this.getRoles()
        resolve(username)
      })
    },
    // 获取用户授权角色信息，实际应用中 可以通过token通过请求接口在这里获取用户信息
    getRoles() {
      return new Promise((resolve, reject) => {
        // 获取权限列表 默认就是超级管理员，因为没有进行接口请求 写死
        this.roles = ['admin']
        resolve(this.roles)
      })
    },
    // 获取用户信息 ，如实际应用中 可以通过token通过请求接口在这里获取用户信息
    getInfo(roles) {
      return new Promise((resolve, reject) => {
        this.roles = roles
        resolve(roles)
      })
    },
    // 退出
    logout() {
      return new Promise((resolve, reject) => {
        this.token = null
        this.userInfo = {}
        this.roles = []
        resolve(null)
      })
    },
  },
  // 进行持久化存储
  persist: {
    // 本地存储的名称
    key: 'userState',
    //保存的位置
    storage: window.localStorage, //localstorage
  },
})
