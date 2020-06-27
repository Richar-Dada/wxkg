/**
 * 此文件管理项目所有接口
 */
import { get, post, put, del } from './network';

const baseURL = 'http://localhost:7001'

/**
 * 服务器根域名
 * 试玩更多接口看这里
 * http://jsonplaceholder.typicode.com/
 * @type {string}
 */
export const API_ROOT = 'https://jsonplaceholder.typicode.com';
/**
 * 获取图片
 */
export const getPhoto = (id) => get(`${API_ROOT}/photos/${id}`);

/**
 * 查询微信用户信息
 * */
export const getWechatInfo = (params) => {
    // 获取当前帐号信息
    const url = `${baseURL}/wechat/getWechatInfo`
    return post(url, params)
}

/**
 * 查询微信用户信息
 * */
export const getUserInfo = (params) => {
    // 获取当前帐号信息
    const url = `${baseURL}/wechat/getUserInfo`
    return post(url, params)
}
