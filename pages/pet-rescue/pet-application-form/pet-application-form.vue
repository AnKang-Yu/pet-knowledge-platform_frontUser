<template>
	<view>
		<input v-model="formModel.formRemark"  type="text"  placeholder="请输入申请备注"  />
		<button @click="formSubmit">确认</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formModel:{}
			}
		},
		watch:{
		},
		// 页面生命周期
		onLoad(options) {
			// console.log('页面加载')
			this.formModel = JSON.parse(decodeURIComponent(options.formModel));
			console.log('传来了')
			console.log(this.formModel)
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
			/**
			 * 提交申请
			 * @param {Object} e
			 */
			async formSubmit(e) {
				console.log('提交宠物申请了');
				this.formModel.userId = uni.getStorageSync('userId')
				// var formdata = e.detail.value
				console.log(this.formModel)
				const res = await this.$myRequest({
					url: "/api/insert/petApplicationForm",
					method: "POST",
					data: this.formModel
				})
				console.log(res)
				
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
				
			
				
			}
		}
	}
</script>

<style>

</style>
