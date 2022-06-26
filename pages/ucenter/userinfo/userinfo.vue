<template>
	<view class="content">
		<view style="text-align: right;"><uni-icons type="compose" size="30" @click="openEditUserPermisson"></uni-icons></view>
		<view class="form">
			<view class="form-item">
				<view>
					<label>头像</label> 
				</view>
				<view>
					<u-avatar @click="uploadAvatarImg"  v-if="avatar_file" :src="avatar_file" shape="square" size="40" ></u-avatar>
					<u-avatar @click="uploadAvatarImg" v-else src="/static/uni-center/defaultAvatarUrl.png" shape="square" size="40"></u-avatar>
					
				</view>	
			</view>
			<view class="form-item">
				<view>
					<label>账户名</label> 
				</view>
				<view>
					<input v-if="!editPermission" :disabled="!editPermission" v-model="currentUserInfo.userMaskAccount"  type="text" placeholder=""/>
					<input v-else  v-model="currentUserInfo.userAccount"  type="text" placeholder="请输入账户名" /></view>
			</view>
			<view class="form-item">
				<view>
					<label>手机号</label> 
				</view>
				<view>
					<input v-if="!editPermission" :disabled="!editPermission" v-model="currentUserInfo.userMaskPhone"  type="text" placeholder=""/>
					<input v-else  v-model="currentUserInfo.userPhone"  type="text" placeholder="请输入手机号" />
				</view>
			</view>
			<view class="form-item">
				<view>
					<label>邮箱</label> 
				</view>
				<view>
					<input v-if="!editPermission" :disabled="!editPermission" v-model="currentUserInfo.userMaskEmail"  type="text" placeholder=""/>
					<input v-else  v-model="currentUserInfo.userEmail"  type="text" placeholder="请输入邮箱" />
				</view>
			</view>
			<view class="form-item">
				<view>
					<label>性别</label> 
				</view>
				<view>
					<u-radio-group
						    v-model="currentUserInfo.userSex"
						    placement="row"
							:disabled="!editPermission"
						>
						<u-radio  label="男" :name="66" shape="circle"  />
						<u-radio  label="女" :name="67" shape="circle"  />
					</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view>
					<label>角色</label> 
				</view>
				<view><text>{{currentUserInfo.userRoleName}}</text></view>
			</view>
			<view class="form-item">
				<view>
					<label>状态</label> 
				</view>
				<view><text>{{currentUserInfo.userStatusName}}</text></view>
			</view>
		</view>
		
		<!-- 退出/登录 按钮 -->
		<view v-if="!editPermission" class="bottom-back" @click="clickLogout">
			<text class="bottom-back-text" >退出</text>
		</view>
		<view v-else class="bottom-back" @click="updateUserInfo">
			<text class="bottom-back-text" >保存</text>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				editPermission: false,
				currentUserInfo:{
					
				},
				avatar_file:''
			}
		},
		// 页面生命周期
		onLoad(options) {
			// console.log('页面加载')
			this.getCurrentUserInfo()
		},
		onShow:function(){
			// console.log("index show")
		},
		onReady:function(){
			// console.log("index 渲染完成")
		},
		onHide:function(){
			// console.log("index hide")
		},
		onUnload:function(){
			// console.log("页面卸载/关闭")
		},
		methods: {
			async getCurrentUserInfo(){
				const res = await this.$myRequest({
					url: "/api/select/getCurrentUserInfo",
					method: "GET"
				})
				console.log(res)
				this.currentUserInfo = res.data.data
				console.log(this.currentUserInfo)
				this.avatar_file = uni.getStorageSync('avatar')
				console.log(this.avatar_file)
			},
			async clickLogout(){
				console.log('退出')
				const res = await this.$myRequest({
					url: "/logout",
					method: "POST"
				})
				
				uni.removeStorageSync('name')
				uni.removeStorageSync('token')
				uni.removeStorageSync('userId')
				uni.removeStorageSync('avatar')
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
			openEditUserPermisson(){
				this.editPermission = true
			},
			async updateUserInfo(){
				// this.currentUserInfo.userId = uni.getStorageSync('userId')
				console.log(this.currentUserInfo)
				const res = await this.$myRequest({
					url: "/api/update/editCurrentUserInfo",
					method: "PUT",
					data: this.currentUserInfo
				})
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
			uploadAvatarImg(res) {
				const crop = {
					quality: 100,
					width: 600,
					height: 600,
					resize: true
				};
				uni.chooseImage({
					count: 1,
					crop,
					success: async (res) => {
						console.log(res);
						this.avatar_file = res.tempFilePaths[0]
						uni.setStorageSync('avatar',this.avatar_file )
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped >
	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 750rpx;
		height: 100vh;
		/* #endif */
		flex-direction: column;
		flex: 1;
		background-color: #F9F9F9;
		.bottom-back {
			margin-top: 10px;
			width: 750rpx;
			height: 44px;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			justify-content: center;
			align-items: center;
			/* #ifndef APP-NVUE */
			border: none;
			/* #endif */
			border-width: 0;
			border-radius: 0;
			background-color: #FFFFFF;
			.bottom-back-text {
				font-size: 33rpx;
			}
		}
	}
	.form{
		// background-color: #ff0000;
		.form-item{
			align-items:center;
			font-size: 20px;
			// line-height: 100rpx;
			height: 100rpx;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			border-bottom: 2px solid gray;
			// view:nth-child(2){
			// 	margin-left: 30rpx;
			// }
		}
	}
</style>
