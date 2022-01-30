<template>
	<view>
		<view class="pet_item"  v-for="item in strayPetList" :key="item.petId">
			<!-- 左侧图片 -->
			<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp2.itc.cn%2Fimages01%2F20210725%2F93fcfa39eb294e42863ea89cca3b4fef.jpeg&refer=http%3A%2F%2Fp2.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641026583&t=1b2b2e79e7c74332cdf969c59cb9d3ab"></image>
			<!-- 右侧信息 -->
			<view class="right"  @click="strayPetDetail(item.petId)">
				<!-- 主体信息 -->
				<view class="tit">
					{{item.petName}}
				</view>
				<view class="info">
					<text>宠物品种: {{item.petVarietyName}}</text>
				</view>
			</view> 
		</view>
		
		<!-- 删除提示框   -->
		<!-- <uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog :title="popupTitle" :duration="2000" mode="base" type="info"  :before-close="true" @close="popupDialogClose" @confirm="popupDialogConfirm"></uni-popup-dialog>
		</uni-popup> -->
		<u-divider v-show="flag" color="#909399" half-width="200" border-color="#dcdfe6" text="到底了"></u-divider>
		
	</view>
</template>

<script>
	
	export default {
		  
		data() {
			return {
				currentPage: 1,
				strayPetList: [],
				flag: false
			}
		},
		// 页面生命周期
		onLoad(options) {
			// console.log('页面加载')
			this.getStrayPetList()
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
			async getStrayPetList(){
				const res = await this.$myRequest({
					url: "/api/search/getStrayPetList",
					data: {
						currentPage: this.currentPage
					}
				})
				console.log(res)
				this.strayPetList =  [...this.strayPetList, ...res.data.data.records]
				// this.strayPetList = res.data.data.records
			},
			strayPetDetail(petId){
				console.log(petId)
				uni.navigateTo({
					url: `/pages/pet-rescue/stray-pet-detail/stray-pet-detail?petId=${petId}`
				})
			},
		},
		// 上拉触底加载
		onReachBottom() {
			// 返回的数据不够10*页数条，即没了(有问题)
			// console.log(this.strayPetList.length)
			if(this.strayPetList.length < this.currentPage*10){
				return this.flag = true
			} 
			// console.log("触底")
			this.currentPage++
			this.getStrayPetList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log("下拉刷新")
			this.currentPage = 1
			this.strayPetList = []
			// this.flag = false
			setTimeout(()=>{
				this.getStrayPetList()
				uni.stopPullDownRefresh()
			},1000)
			
		}
	}
</script>

<style lang="scss">
	
	.pet_item{
		// 都在一行显示
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid $shop-color;
		image{
			width: 200rpx;
			min-width: 200rpx;
			height: 150rpx;
		}
		.right{
			margin-left: 15rpx;
			display: flex;
			// 调整主轴方向 ： 垂直
			flex-direction: column;
			// 主轴上的对齐方式  俩端对齐
			justify-content: space-between;
			.tit{
				font-size: 30rpx;
			}
			.info{
				font-size: 26rpx;
				// 第二个text作区别
				text:nth-child(2){
					margin-left: 30rpx;
				}
				padding-left: 30rpx;
			}
		}
		
	}
</style>
