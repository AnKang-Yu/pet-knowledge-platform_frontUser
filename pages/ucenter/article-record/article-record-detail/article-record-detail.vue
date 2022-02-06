<template>
	<view>
		<uni-section title="文章申请详情记录" type="line" padding></uni-section>
			<view v-for="(item,index) in formList" :key="index" style="display: flex;" >
				
				
				<u-steps :current="current" direction="column"  dot>
					<u-steps-item   :title="index > 0 ?'重新发起审批':'发起审批'" :desc="item.createTime | formatDate"></u-steps-item>
					<u-steps-item   :title="statusNameList[index]" :desc="item.updateTime | formatDate">
					</u-steps-item>
				</u-steps>
				<view class="right">
					<u--text :text="'申请单编号: '+item.formId" type="primary"></u--text>
					<u--text type="info" :text="item.formRemark?'申请备注:'+item.formRemark:'申请备注:无'"></u--text>
					<u--text type="error"  :text="item.auditOpinion?'审批意见:'+item.auditOpinion:'审批意见:无'"></u--text>
				</view>
			</view>
			
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: '',
				formList: [],
				statusNameList: []
			}
		},
		// 页面生命周期
		onLoad(options) {
			// console.log('页面加载')
			console.log(options.articleId)
			this.getArticleFormDetailInfo(options.articleId)
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
			async getArticleFormDetailInfo(articleId){
				const res = await this.$myRequest({
					url: "/api/select/getArticleFormDetailInfo",
					method: 'GET',
					data: {
						articleId: articleId
					}
				})
				console.log(res)
				this.current = res.data.data.formList.length 
				this.formList = res.data.data.formList
				this.statusNameList =  res.data.data.statusNameList
			}
		}
	}
</script>

<style lang="scss">
	.right{
		margin-left: 35rpx;
		display: flex;
		// 调整主轴方向 ： 垂直
		flex-direction: column;
		// 主轴上的对齐方式  俩端对齐
		// justify-content: space-between;
		font-size: 25rpx;
		// 第二个text作区别
		padding: 35rpx;
		padding-bottom: 30rpx;
	}

</style>
