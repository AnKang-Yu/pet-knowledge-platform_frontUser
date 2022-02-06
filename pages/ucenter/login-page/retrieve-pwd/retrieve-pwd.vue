<template>
	<view>
		<text class="title">通过用户名找回密码</text>
		<u--form
			labelPosition="top"
			:model="userModel"
			ref="userForm"
		>
			<u-form-item
				label="用户名"
				prop="userInfo.userName"
				labelWidth="80"
				borderBottom
				ref="item1"
				
				required="true"
			>
				<u--input
					v-model="userModel.userInfo.userName"
					border="none"
					:disabled = "!canInputUserName"
					placeholder="请输入要找回的用户名"
				></u--input>
			</u-form-item>
			<!--  -->
			<u-form-item
				label="验证码"
				prop="verificationCode"
				labelWidth="80"
				required="true"
				borderBottom
			>
				<u--input
					v-model="userModel.verificationCode"
					border="none"
					placeholder="请填写验证码"
				></u--input>
				<u-button
					slot="right"
					@tap="estimateUserByUserName"
					:text="codeText"
					size="mini"
					:disabled="!canCode"
					:type="canCode?'primary':'default'"
				></u-button>
			</u-form-item>
			<u-form-item
				label="密码(6-20位)"
				labelWidth="100"
				prop="userInfo.userPassword"
				borderBottom
				ref="item1"
				required="true"
			>
				<u--input
					v-model="userModel.userInfo.userPassword"
					border="none"
					type="password"
					placeholder="请输入密码"
				></u--input>
			</u-form-item>
			<!--  -->
			<u-form-item
				label="确认密码"
				prop="checkPass"
				labelWidth="100"
				borderBottom
				required="true"
				ref="item1"
			>
				<u--input
					v-model="userModel.checkPass"
					border="none"
					type="password"
					placeholder="请再次输入密码"
				></u--input>
			</u-form-item>
		</u--form>
		<u-button
			:disabled="!canRetrieve" 
			:type="canRetrieve?'primary':'default'"
			text="提交"
			customStyle="margin-top: 50px"
			@click="submit"
		></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
			  if (value === '') {
				callback(new Error('请输入密码'))
			  } else {
				if (this.userModel.checkPass !== '') {
				  this.$refs.userForm.validateField('checkPass')
				}
				callback()
			  }
			}
			var validatePass2 = (rule, value, callback) => {
			  if (value === '') {
				callback(new Error('密码不能为空'))
			  } else if (value !== this.userModel.userInfo.userPassword) {
				callback(new Error('两次输入密码不一致!'))
			  } else {
				callback()
			  }
			}
			return {
				codeText: '获取验证码',
				userModel: {
					verificationCode: '',
					checkPass: '',
					userInfo:{
						userName: '',
						userSex: '',
						userPassword: '',
						userEmail: '',
						userPhone: '',
						userBirthday: ''
					},
				},
				rules: {
					'userInfo.userName': [{
						type: 'string',
						required: true,
						message: '请填写用户名',
						trigger: ['blur', 'change']
					}, 
					// {
					// 	// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
					// 	validator: (rule, value, callback) => {
					// 		// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
					// 		return uni.$u.test.chinese(value);
					// 	},
					// 	message: "姓名必须为中文",
					// 	// 触发器可以同时用blur和change，二者之间用英文逗号隔开
					// 	trigger: ["change", "blur"],
					// },
					],
					
					'userInfo.userPassword': [{
					  required: true, validator: validatePass, trigger: 'blur'
					}],
					checkPass: [{
					  required: true, validator: validatePass2, trigger: 'blur'
					}],
					verificationCode: {
						type: 'string',
						required: true,
						len: 4,
						message: '请填写(邮箱)验证码',
						trigger: ['blur']
					},
				},
			}
		},
		computed:{
			// 是否提交按钮
			canInputUserName() {
				return !this.userModel.userInfo.userPassword.length && !this.userModel.checkPass.length && !this.userModel.verificationCode.length
			},
			canRetrieve(){
				return this.userModel.userInfo.userName.length && this.isPwd && this.isCheckPwd && this.userModel.verificationCode.length
			},
			isPwd() {
				return /^.{6,20}$/.test(this.userModel.userInfo.userPassword);
			},
			isCheckPwd() {
				return /^.{6,20}$/.test(this.userModel.checkPass);
			},
			// 发送验证码的用户名
			canCode(){
				return this.userModel.userInfo.userName.length 
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.userForm.setRules(this.rules)
		},
		methods:{
			async estimateUserByUserName(){
				const result = await this.$myRequest({
					url: "/api/search/estimateUserByUserName",
					method: "GET",
					data: {
						userName: this.userModel.userInfo.userName
					}  
				});
				console.log(result)
				uni.showToast({
					title: result.data.msg,
					duration: 2000
					// success:function(){
					// 	// 跳转到列表页
					// 	setTimeout(() => {
					// 		uni.switchTab({
					// 			url: "/pages/index/index"
					// 		})
					// 	},2000);
					// }
				})
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.userForm.validate().then(res => {
					// uni.$u.toast('校验通过')
					this.retrieveUserPwd()
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			async retrieveUserPwd(){
				console.log(this.userModel.userInfo);
				const result = await this.$myRequest({
					url: "/api/resetUserPwd",
					method: "PUT",
					data: {
						userName: this.userModel.userInfo.userName,
						newPwd: this.userModel.userInfo.userPassword,
						verificationCode : this.userModel.verificationCode
					}  
				});
				uni.showToast({
					title: result.data.msg,
					duration: 2000,
					success:function(){
						// 跳转到登录页
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/ucenter/login-page/pwd-login/pwd-login'
							})
						},2000);
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../common/login-page.css");
</style>
