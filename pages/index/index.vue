<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}   </text>
		</view>
		<view>
			<text class="title" >{{name}}</text>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				name: ''
			}
		},
		watch:{
			// "name": function(){
			//   if(!this.name){
			// 	return uni.getStorageSync('name')
			//   }
				
			// }
		},
		// 页面生命周期
		onLoad(options) {
			// console.log('页面加载')
		},
		onShow:function(){
			this.name = uni.getStorageSync('name') || ''
			console.log('name='+ this.name)
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

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
