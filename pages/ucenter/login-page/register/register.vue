<template>
	<view class="content">
		<!-- 顶部文字 -->
		<text class="title">用户注册</text>
		<view class="auth-box">
			<text class="link" @click="toPwdLogin">已有账户,前往登录</text>
		</view>
		<u--form
			labelPosition="top"
			:model="userModel"
			ref="userForm"
		>
			<u-form-item
				label="用户名"
				prop="userInfo.username"
				labelWidth="80"
				borderBottom
				ref="item1"
				required="true"
			>
				<u--input
					v-model="userModel.userInfo.username"
					border="none"
					placeholder="请输入用户名"
				></u--input>
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
			<u-form-item
				label="手机号"
				prop="userInfo.userPhone"
				labelWidth="80"
				borderBottom
				ref="item1"
			>
				<u--input
					v-model="userModel.userInfo.userPhone"
					border="none"
					placeholder="请输入手机号"
				></u--input>
			</u-form-item>
			<u-form-item
				label="邮箱"
				prop="userInfo.userEmail"
				borderBottom
				ref="item1"
				required="true"
			>
				<u--input
					v-model="userModel.userInfo.userEmail"
					border="none"
					placeholder="请输入邮箱"
				></u--input>
			</u-form-item>
			<u-form-item
				label="性别"
				prop="userInfo.userSex"
				borderBottom
				required="true"
				@click="showSex = true; hideKeyboard()"
				ref="item1"
			>
				<u--input
					v-model="userModel.displaySex"
					disabled
					disabledColor="#ffffff"
					placeholder="请选择性别"
					border="none"
				></u--input>
				<u-icon
					slot="right"
					name="arrow-right"
				></u-icon>
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
					@tap="getCode"
					:text="codeText"
					size="mini"
					:disabled="!canCode"
					:type="canCode?'primary':'default'"
				></u-button>
			</u-form-item>
			<u-form-item
				label="生日"
				prop="userInfo.userBirthday"
				borderBottom
				@click="showBirthday = true; hideKeyboard()"
				ref="item1"
			>
				<u--input
					v-model="userModel.userInfo.userBirthday"
					disabled
					disabledColor="#ffffff"
					placeholder="请选择生日"
					border="none"
				></u--input>
				<u-icon
					slot="right"
					name="arrow-right"
				></u-icon>
			</u-form-item>
		</u--form>
		<u-button
			:disabled="!canRegister" 
			:type="canRegister?'primary':'default'"
			text="注册"
			customStyle="margin-top: 50px"
			@click="submit"
		></u-button>
		<u-button
			type="error"
			text="重置"
			customStyle="margin-top: 10px"
			@click="reset"
		></u-button>
		<u-action-sheet
			:show="showSex"
			:actions="actions"
			title="请选择性别"
			@close="showSex = false"
			@select="sexSelect"
		>
		</u-action-sheet>
		<!-- <u-code
			ref="uCode"
			@change="codeChange"
			seconds="20"
			@start="disabled1 = true"
			@end="disabled1 = false"
		></u-code> -->
		<u-datetime-picker
			:show="showBirthday"
			:value="birthday"
			mode="date"
			closeOnClickOverlay
			:minDate="startDate"
			:maxDate="endDate"
			@confirm="birthdayConfirm"
			@cancel="birthdayClose"
			@close="birthdayClose"
		></u-datetime-picker>
		
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
			var validatePhone = (rule, value, callback) => {
			  // 可以为空
			      if (!value) {
			        callback()
			      }
			      const reg = /^1[3|4|5|7|8][0-9]{9}$/
			      if (!reg.test(value)) {
			        callback(new Error('手机格式错误'))
			      } else {
			        callback()
			      }
			}
			return {
				codeText: '获取验证码',
				showBirthday: false,
				showSex: false,
				startDate: ``,
				endDate: ``,
				birthday: Number(new Date()),
				actions: [{
						id: '66',
						name: '男',
					},
					{
						id: '67',
						name: '女',
					}
				],
				userModel: {
					displaySex: '',
					verificationCode: '',
					checkPass: '',
					userInfo:{
						username: '',
						userSex: '',
						userPassword: '',
						userEmail: '',
						userPhone: '',
						userBirthday: ''
					},
				},
				rules: {
					'userInfo.username': [{
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
					'userInfo.userPhone': [{
						type: 'string',
						validator: validatePhone,
						trigger: ['blur', 'change']
					}], 
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
					'userInfo.userSex': {
						type: 'string',
						max: 2,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
					// 'userInfo.userBirthday': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请选择生日',
					// 	trigger: ['change']
					// },
				},
			}
		},
		computed:{
			// 注册按钮
			canRegister() {
				return this.userModel.userInfo.username.length && this.isPwd;
			},
			isPwd() {
				return /^.{6,20}$/.test(this.userModel.userInfo.userPassword);
			},
			// 发送验证码的邮箱
			canCode(){
				return this.userModel.userInfo.userEmail.length && this.isEmail;
			},
			isEmail(){
				return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(this.userModel.userInfo.userEmail)
			}
		},
		// 页面生命周期
		onLoad(options) {
			this.initDate()
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.userForm.setRules(this.rules)
		},
		methods: {
			toPwdLogin(){
				uni.navigateTo({
					url: `/pages/ucenter/login-page/pwd-login/pwd-login`
				})
			},
			sexSelect(e) {
				this.userModel.displaySex = e.name
				this.userModel.userInfo.userSex = e.id
				console.log(this.userModel.userInfo.userSex)
				this.$refs.userForm.validateField('userInfo.userSex')
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			birthdayClose() {
				this.showBirthday = false
				this.$refs.userForm.validateField('userInfo.userBirthday')
			},
			birthdayConfirm(e) {
				this.showBirthday = false
				this.userModel.userInfo.userBirthday = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				console.log(this.userModel.userInfo.userBirthday)
				this.$refs.userForm.validateField('userInfo.userBirthday')
			},
			/**
			 * 初始化日期选择
			 */
			initDate(){
				const currentDate = new Date()
				this.endDate = currentDate.getTime()
				this.startDate = new Date("1970-01-01")
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.userForm.validate().then(res => {
					// uni.$u.toast('校验通过')
					this.registerUser()
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			reset() {
				const validateList = ['userInfo.username', 'userInfo.userSex',
				'userInfo.userBirthday']
				this.$refs.userForm.resetFields()
				this.$refs.userForm.clearValidate()
				setTimeout(()=>{
					this.$refs.userForm.clearValidate(validateList)
					// 或者使用 this.$refs.userForm.clearValidate()
				},10)
			},
			async registerUser(){
				console.log(this.userModel.userInfo);
				const result = await this.$myRequest({
					url: "/api/registerUser",
					method: "POST",
					data: {
						user: this.userModel.userInfo,
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
			},
			async getCode(){
				console.log( this.userModel.userInfo.userEmail)
				const result = await this.$myRequest({
					url: "/api/getRegisterCode",
					method: "GET",
					data: {
						userEmail: this.userModel.userInfo.userEmail
					}
				});
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
</style>
