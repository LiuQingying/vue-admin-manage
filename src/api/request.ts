import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { el } from 'element-plus/es/locale'
// 创建axios实例 进行基本参数配置
const service = axios.create({
  // 默认请求地址，根据环境的不同可在.env 文件中进行修改
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  // 设置接口访问超时时间
  timeout: 3000000, // request timeout，
  // 跨域时候允许携带凭证
  withCredentials: true,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

//  request interceptor 接口请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    /**
     * 用户登录之后获取服务端返回的token,后面每次请求都在请求头中带上token进行JWT校验
     * token 存储在本地储存中（storage）、vuex、pinia
     */
    const userStore = useUserStore()
    const token: string = userStore.token
    // config.headers['Authorization'] =
    //   'Bearer eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSiox099ANDXYNUtJRSq0oULIyNLE0NjCwsDQwNTY1MDbQUSotTi3yTFGyMq0FAH_cov00AAAA.hUvxfE4CSHKUwf1N_oHhOWmLOE_tEySM-7v7w_bP81BmK-JnFGBYhm7ycD1wZXVyU_HGPY0smxClq0Ih29Helg'
    // 自定义请求头
    if (token) {
      config.headers['Authorization'] = token
    }

    return config
  },
  (error: AxiosError) => {
    // 请求错误，这里可以用全局提示框进行提示
    return Promise.reject(error)
  },
)

//  response interceptor 接口响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 直接返回res，当然你也可以只返回res.data
    // 系统如果有自定义code也可以在这里处理
    if (response.data.status == 1) {
      return response.data.data
    } else {
      return Promise.reject(response.data.msg)
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

/**
 * @description 显示错误消息
 * opt 传入参数
 * err 错误信息
 * type 消息类型
 * duration 消息持续时间
 */
function showErrMessage(opt, err, type: any = 'error', duration: number = 5000) {
  ElMessage({
    message: err.msg,
    type: type,
    duration: duration,
  })
}

export default service
