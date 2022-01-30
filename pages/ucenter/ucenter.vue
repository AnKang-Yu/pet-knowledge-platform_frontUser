<template>
	<view class="center">
		<view class="userInfo" @click.capture="toUserInfo">
			<image class="logo-img" src="@/static/uni-center/defaultAvatarUrl.png"></image>
			<view class="logo-title">
				<text class="uer-name" > {{name}}</text>
				
			</view>
		</view>
		<uni-list class="center-list" v-for="(sublist , index) in ucenterList" :key="index"> 
			<uni-list-item v-for="(item,i) in sublist" :title="item.title" link :rightText="item.rightText" :key="i"
				:clickable="true" :to="item.to" @click="ucenterListClick(item)" :show-extra-icon="true"
				:extraIcon="{type:item.icon,color:'#999'}">
				<template v-slot:footer>
					<view v-if="item.showBadge" class="item-footer">
						<text class="item-footer-text">{{item.rightText}}</text>
						<view class="item-footer-badge"></view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				name: '',
				ucenterList: [
					[	{
							"title":'我的宠物',
							"to": '/pages/ucenter/my-pet/my-pet',
							"icon": "flag"
						},
						{
							"title": '宠物领养',
							"to": '/pages/pet-rescue/pet-rescue',
							// "event": 'getScore',
							"icon": "paperplane"
						},
						{
							"title": '宠物申请记录',
							"to": '/pages/ucenter/pet-rescue-record/pet-rescue-record',
							// "event": 'getScore',
							"icon": "paperplane"
						}
						// #ifdef APP-PLUS
						// , {
						// 	"title": 'e',
						// 	"event": 'share',
						// 	"icon": "redo"
						// }
						// #endif
					],
					[{
						"title": '草稿箱',
						"to": '/pages/ucenter/my-article/my-article?articleStatus=93',
						"icon": "chat"
					},{
						"title": '我的文章',
						"to": '/pages/ucenter/my-article/my-article',
						"icon": "help"
					}, {
						"title": '文章收藏',
						"to": '/pages/ucenter/settings/settings',
						"icon": "gear"
					},{
						"title": '文章申请记录',
						"to": '/pages/ucenter/my-article-record/my-article-record',
						"icon": "info"
					}]
				],
			}
		},
		watch:{
			// "username": function(){
			// 	return uni.getStorageSync('name') 
			// }
		},
		// 页面生命周期
		onLoad(options) {
			// console.log('页面加载')
			//#ifdef APP-PLUS
			this.ucenterList[this.ucenterList.length - 2].unshift({
				title:this.$t('mine.checkUpdate'),// this.this.$t('mine.checkUpdate')"检查更新"
				rightText: this.appVersion.version + '-' + this.appVersion.versionCode,
				event: 'checkVersion',
				icon: 'loop',
				showBadge: this.appVersion.hasNew
			})
			//#endif 
		},
		onShow:function(){
			this.name = uni.getStorageSync('name') || '未登录'
			console.log('name='+ this.name)
			console.log("index show")
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
			toUserInfo() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/userinfo'
				})
			},
			/**
			 * 个人中心项目列表点击事件
			 */
			ucenterListClick(item) {
				if (!item.to && item.event) {
					this[item.event]();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}
	
	page {
		background-color: #f8f8f8;
	}
	/* #endif*/
	.center {
		flex: 1;
		flex-direction: column;
		background-color: #f8f8f8;
		.userInfo {
			width: 750rpx;
			padding: 20rpx;
			padding-top: 50px;
			background-image: url(../../static/uni-center/headers.png);
			flex-direction: column;
			align-items: center;
			.logo-img {
				width: 150rpx;
				height: 150rpx;
				border-radius: 150rpx;
			}
			.logo-title {
				flex: 1;
				align-items: center;
				justify-content: space-between;
				flex-direction: row;
				.uer-name {
					height: 100rpx;
					line-height: 100rpx;
					font-size: 38rpx;
					color: #FFFFFF;
				}
			}
		}
		.center-list {
			margin-bottom: 30rpx;
			background-color: #f9f9f9;
		}
		.item-footer {
			flex-direction: row;
			align-items: center;
			.item-footer-text {
				color: #999;
				font-size: 24rpx;
				padding-right: 10rpx;
			}
			
			.item-footer-badge {
				width: 20rpx;
				height: 20rpx;
				/* #ifndef APP-NVUE */
				border-radius: 50%;
				/* #endif */
				/* #ifdef APP-NVUE */
				border-radius: 10rpx;
				/* #endif */
				background-color: #DD524D;
			}
		}
	}
	
	
</style>
