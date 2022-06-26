<template>
	<view class="content">
		<!-- 顶部文字 -->
		<text class="title">用户名密码登录</text>
		<input class="input-box" :inputBorder="false" v-model="username" placeholder="请输入用户名"/>
		<input type="password" class="input-box" :inputBorder="false" v-model="password" placeholder="请输入密码"/>
		<button class="send-btn" :disabled="!canLogin" :type="canLogin?'primary':'default'"
			@click="pwdLogin">登录</button>
		<!-- 忘记密码 -->
		<view class="auth-box">
			<text class="link" @click="toRetrievePwd">忘记密码</text>
			
			<text class="link" @click="toRegister">注册账户</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				"password": "",
				"username": ""
				
			};
		},
		computed:{
			canLogin() {
				return this.username.length && this.isPwd;
			},
			isPwd() {
				return /^.{6,20}$/.test(this.password);
			}
		},
		methods:{
			
			/**
			 * 密码登录
			 */
			async pwdLogin() {
				const res = await this.$myRequest({
					url: "/api/login",
					method: "POST",
					data: {
						username : this.username,
						password : this.password
					}
				})
				console.log(res)
				uni.setStorageSync('token', res.data.data.token)
				
				const userinfo = await this.$myRequest({
					url: "/api/getUserInfo",
				})
				console.log(userinfo)
				uni.setStorageSync('name', userinfo.data.data.useraccount)
				uni.setStorageSync('userId',userinfo.data.data.userId)
				uni.setStorageSync('avatar','/static/uni-center/userAvatar.png')
				uni.showToast({
					title: res.data.msg,
					duration: 2000,
					success:function(){
						// 跳转到列表页
						setTimeout(() => {
							uni.switchTab({
								url: "/pages/index/index"
							})
						},2000);
					}
				});
			},
			toRegister(){
				uni.navigateTo({
					url: `/pages/ucenter/login-page/register/register`
				})
			},
			toRetrievePwd(){
				uni.navigateTo({
					url: `/pages/ucenter/login-page/retrieve-pwd/retrieve-pwd`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../common/login-page.css");
	
	.auth-box {
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20px;
	}
	
	.auth-box .link {
		font-size: 26rpx;
	}
	
	.login-text-sub {
		color: #8a8f8b;
	}
	
	.toRegister {
		margin-top: 80px;
		width: 600rpx;
	}
	.captcha-box{
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}
	.captcha-img{
		margin:15px 15px 0 0;
		width: 250rpx;
	}
	.captcha{
		width: 350rpx;
	}
</style>
