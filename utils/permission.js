// 页面白名单
const whiteList = [
	'/',
	'/pages/article/article',
	'/pages/ucenter/login-page/pwd-login/pwd-login',
	// new RegExp('/^\/pages\/article\/login-articleDetail\/articleDetail\?articleId=23'),
	{"pattern":/^\/pages\/article\/article-detail\/article-detail\?articleId=[0-9]*/},
	// '/pages/article/articleDetail/articleDetail/?articleId=[0-9]*',
	// '/pages/article/articleDetail/articleDetail?articleId=23',
	'/pages/index/index',
	'/pages/ucenter/ucenter',
	// 宠物救助
	'/pages/pet-rescue/pet-rescue',
	{"pattern":/^\/pages\/pet-rescue\/stray-pet-detail\/stray-pet-detail\?petId=[0-9]*/},
	'/pages/ucenter/login-page/register/register',
	'/pages/ucenter/login-page/retrieve-pwd/retrieve-pwd'
]

function hasPermission (url) {
	let token = uni.getStorageSync('token')
	
	//拦截强制登录页面, 不在白名单内
	let pass = false
	if (whiteList) {
		pass = whiteList.some((item) => {
			if (typeof(item) == 'object' && item.pattern) {
				console.log('正则')
				return item.pattern.test(url)
			}else {
				console.log('非正则')
				return url == item || token
			}
			
		})
	}
	if(pass){
		console.log('在白名单内,直接跳转')
	}else{
		console.log('没找到匹配的白名单路径,需要登录才能跳转')
	}
	
	// 在白名单中或有token，直接跳转
	// if(whiteList.indexOf(url) !== -1 ||whiteList.test(url)  || token) {
	// 	console.log('直接跳转')
	// 	return true
	// }
	return pass
}

uni.addInterceptor('navigateTo', {
	// 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
	invoke (e) {
		if(!hasPermission(e.url)){
			uni.reLaunch({
				url: '/pages/ucenter/login-page/pwd-login/pwd-login'
			})
			return false
		}
		return true
	},
	success (e) {
		// console.log(e)
	}
})

uni.addInterceptor('switchTab', {
	// tabbar页面跳转前进行拦截
	// switchTab仅在H5页面中有效，微信小程序端对tabBar的跳转由于不走switchTab故‘无效’
	invoke (e) {
		console.log(e)
		if(!hasPermission(e.url)){
			uni.reLaunch({
				url: '/pages/ucenter/login-page/pwd-login/pwd-login'
			})
			return false
		}
		return true
	},
	success (e) {
		// console.log(e)
	}
})