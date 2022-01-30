<template>
	<view>
		<view class="form_item"  v-for="form in petRescueFormList" :key="form.formId">
			<!-- 左侧图片 -->
			<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp2.itc.cn%2Fimages01%2F20210725%2F93fcfa39eb294e42863ea89cca3b4fef.jpeg&refer=http%3A%2F%2Fp2.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641026583&t=1b2b2e79e7c74332cdf969c59cb9d3ab"></image>
			<!-- 右侧信息 -->
			<view class="right" @click="formDetail(form)" >
				<!-- 主体信息 -->
				<view class="tit">
					{{form.formTypeName}}
				</view>
				<view class="info">
					<text>修改时间: {{form.updateTime | formatDate}}</text>
					<br/>
					<text>当前状态: {{form.formStatusName}}</text>
				</view>
			</view> 
			<view class="info">
					<button v-show="form.formStatus == '103'" size="mini" :plain="true" @click="backoutForm(form)">撤销</button>
			</view>
		</view>
		
		<u-divider v-show="flag" color="#909399" half-width="200" border-color="#dcdfe6" text="到底了"></u-divider>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentPage: 1,
				petRescueFormList: [],
				flag: false
			}
		},
		// 页面生命周期
		onLoad(options) {
			// console.log('页面加载')
			this.getPetRescueFormList()
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
			async getPetRescueFormList(){
				const res = await this.$myRequest({
					url: "/api/select/getPetRescueFormList",
					data: {
						currentPage: this.currentPage
					}
				})
				console.log(res)
				this.petRescueFormList =  [...this.petRescueFormList, ...res.data.data.records]
			},
			backoutForm(form){
				uni.showModal({
					title:'确定要撤销此条'+form.formTypeName+'吗?',
					// content: '这是一个模态弹窗',
					success: function (res) {
						if (res.confirm) {
							// 确认删除
							this.backoutConfirm(form);
							// console.log('用户点击确定');
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}.bind(this)
				})
			},
			async backoutConfirm(form){
				// 确认删除
				const res = await this.$myRequest({
					url: `/api/update/backoutRescueFormById`,
					method: "PUT",
					data:{
						formId: form.formId,
						petId: form.petId
					}
				})
				uni.showToast({
					title: res.data.msg,
					duration: 1500,
					success:function(){
						// 刷新
						this.currentPage = 1
						this.petRescueFormList = []
						setTimeout(() => {
							
							this.getPetRescueFormList()
							// uni.switchTab({
							// 	url: "/pages/index/index"
							// })
						},1500);
					}
				});
			},
			formDetail(form){
				console.log('表单细节')
				uni.navigateTo({
					url: "/pages/ucenter/pet-rescue-record/rescue-record-detail/rescue-record-detail?form=" + JSON.stringify(form)
				})
			}
		},
		// 上拉触底加载
		onReachBottom() {
			// 返回的数据不够10*页数条，即没了(有问题)
			// console.log(this.petRescueFormList.length)
			if(this.petRescueFormList.length < this.currentPage*10){
				return this.flag = true
			} 
			// console.log("触底")
			this.currentPage++
			this.getPetRescueFormList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log("下拉刷新")
			this.currentPage = 1
			this.petRescueFormList = []
			// this.flag = false
			setTimeout(()=>{
				this.getPetRescueFormList()
				uni.stopPullDownRefresh()
			},1000)
			
		}
	}
</script>

<style lang="scss">
	.form_item{
		 /* 都在一行显示 */
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
			 /* 调整主轴方向 ： 垂直 */
			flex-direction: column;
			 /* 主轴上的对齐方式  俩端对齐 */
			justify-content: space-between;
			.tit{
				font-size: 30rpx;
			}
			.info{
				font-size: 26rpx;
				 /* 第二个text作区别 */
				// text:nth-child(2){
				// 	margin-left: 30rpx;
				// }
				padding-left: 30rpx;
			}
		}
		
	}
</style>
