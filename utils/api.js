const BASE_URL = 'http://localhost:9876'
// 二次封装的请求api
export const myRequest = (options)=>{
	// Promise解决回调地狱
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				Authorization:uni.getStorageSync('token') 
			},
			success: (res)=>{
				if(res.data.code !== 200) {
					return uni.showToast({
						title: res.data.msg
					})
				}
				// 异步代码执行成功
				// 将现有对象转为Promise对象
				resolve(res)
			},
			fail: (err)=>{
				uni.showToast({
					title: '请求接口失败'
				})
				// 异步代码执行失败
				reject(err)
			}
		})
	})
}