import { getWechatInfo, getUserInfo } from '../../utils/service'

function wechatInfo() {
	return new Promise((resolve, reject) => {
		wx.login({
			success: function (res) {
				if (res.code) {
					getWechatInfo({ code: res.code })
						.then((respone) => {
							if (respone.resultCode === 200) {
								resolve(respone)
							} else {
								reject('wechatInfo请求失败')
							}
						})
				} else {
					reject('获取code失败')
				}
			}
		})
	})
}



const app = getApp()
Page({
	data: {
		islogin: false
	},
	login() {
		console.log('login')
		wx.showLoading()
		const self = this
		wechatInfo()
			.then((res) => {
				app.globalData.sessionKey = res.data.session_key
				app.globalData.openid = res.data.openid

				// 根据sessionKey获取用户信息
				wx.getSetting({
					withCredentials: true,
					success: function (res) {
						console.log(res)
						if (res.authSetting['scope.userInfo']) {
							wx.getUserInfo({
								success: function (respone) {
									const req = {
										sessionKey: app.globalData.sessionKey,
										encryptedData: respone.encryptedData,
										iv: respone.iv
									}

									getUserInfo(req)
										.then((r) => {
											wx.hideLoading()
											if (r.resultCode === 200) {
												const data = r.data
												app.globalData.userInfo = data.userInfo
												app.globalData.isLogin = true

												self.setData({ islogin: true })
												if (data.isNew) {
													wx.navigateTo({
														url: 'oldUserBind'
													})
												}
											}
										})
										.catch((err) => {
											wx.hideLoading()
											console.log('err', err)
										})
								}
							})
						}
					}
				})
			})
			.catch((err) => {
				console.log('err', err)
			})
	}
})