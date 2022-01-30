<template>
	<view>
		<view class="pet_item"  v-for="item in petList" :key="item.petId">
			<!-- 左侧图片 -->
			<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp2.itc.cn%2Fimages01%2F20210725%2F93fcfa39eb294e42863ea89cca3b4fef.jpeg&refer=http%3A%2F%2Fp2.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641026583&t=1b2b2e79e7c74332cdf969c59cb9d3ab"></image>
			<!-- 右侧信息 -->
			<view class="right"  @click="petDetail(item.petId)">
				<!-- 主体信息 -->
				<view class="tit">
					{{item.petName}}
				</view>
				<view class="info">
					<text>宠物品种: {{item.petVarietyName}}</text>
				</view>
			</view> 
			<view class="info">
				<template>
					<button size="mini" :plain="true" @click="deletePet(item)">删除</button>
					<button size="mini" :plain="true" @click="stopFeedPet(item)">送养</button>
				</template>
				
			</view>
		</view>
		<template >
			<!-- 新增按钮 -->
		    <view>
		        <uni-fab
		            horizontal="right"
		            vertical="bottom"
		            :popMenu="false"
					@fabClick="addPet"
		        ></uni-fab>
		    </view>
		</template>
		<!-- 删除提示框   -->
		<!-- <uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog :title="popupTitle" :duration="2000" mode="base" type="info"  :before-close="true" @close="popupDialogClose" @confirm="popupDialogConfirm"></uni-popup-dialog>
		</uni-popup> -->
		<u-divider  v-show="flag" color="#909399" half-width="200" border-color="#dcdfe6" text="到底了"></u-divider>
		
	</view>
</template>

<script>
	
	export default {
		  
		data() {
			return {
				// popupTitle: '',
				// operationPetId: '',
				currentPage: 1,
				petList: [],
				flag: false,
				formModel: {}
			}
		},
		// 页面生命周期
		onLoad(options) {
			// console.log('页面加载')
			this.getPetListByOwnId()
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
			async getPetListByOwnId(){
				const res = await this.$myRequest({
					url: "/api/select/getPetListByOwnId",
					data: {
						currentPage: this.currentPage
					}
				})
				console.log(res)
				this.petList =  [...this.petList, ...res.data.data.records]
				// this.petList = res.data.data.records
			},
			petDetail(petId){
				console.log(petId)
				uni.navigateTo({
					url: `/pages/ucenter/my-pet/addoredit-pet/addoredit-pet?petId=${petId}`
				})
			},
			addPet(){
				console.log('新增宠物')
				uni.navigateTo({
					url: "/pages/ucenter/my-pet/addoredit-pet/addoredit-pet"
				})
			},
			deletePet(pet){
				// this.popupTitle = 
				// this.operationPetId = pet.petId
				// this.$refs.popup.open('center')
				uni.showModal({
					title:'确定要删除'+pet.petName+'吗?',
					// content: '这是一个模态弹窗',
					success: function (res) {
						if (res.confirm) {
							// 确认删除
							this.deleteConfirm(pet.petId);
							// console.log('用户点击确定');
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}.bind(this)
				})
			},
			stopFeedPet(pet){
				uni.showModal({
					title:'确定要送养'+pet.petName+'吗?',
					// content: '这是一个模态弹窗',
					success: function (res) {
						if (res.confirm) {
							// 确认送养
							this.formModel.formType = '108'
							this.formModel.targetId = '0'
							this.formModel.petId = pet.petId
							uni.navigateTo({
								url: "/pages/pet-rescue/pet-application-form/pet-application-form?formModel=" + encodeURIComponent(JSON.stringify(this.formModel))
							})
							// console.log('用户点击确定');
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}.bind(this)
				})
			},
			/**
			 * 关闭删除提示框
			 */
			// popupDialogClose(){
			// 	this.$refs.popup.close()
			// },
			async deleteConfirm(value){
				// 确认删除
				const res = await this.$myRequest({
					url: `/api/delete/deletePetById/${value}`,
					method: "DELETE"
				})
				if(res && res.data.code === 200){
					uni.showToast({
						title: res.data.msg,
						duration: 2000
					});
				}
				//this.getPetListByOwnId()
				//刷新列表
				setTimeout(()=>{
					// this.$forceUpdate()
					// uni.reLaunch({
					// 	url: `pages/ucenter/my-pet/my-pet`
					// })
					this.currentPage = 1
					this.petList = []
					this.getPetListByOwnId()
					//uni.reload()
					//  uni.redirectTo({
					// 	  url: `pages/ucenter/my-pet/my-pet`,
					// });
				},2000);
			}
			
		},
		// 上拉触底加载
		onReachBottom() {
			// 返回的数据不够10*页数条，即没了(有问题)
			console.log(this.petList.length)
			if(this.petList.length<this.currentPage*10){
				return this.flag = true
			} 
			console.log("触底")
			this.currentPage++
			this.getPetListByOwnId()
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log("下拉刷新")
			this.currentPage = 1
			this.petList = []
			// this.flag = false
			setTimeout(()=>{
				this.getPetListByOwnId()
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
