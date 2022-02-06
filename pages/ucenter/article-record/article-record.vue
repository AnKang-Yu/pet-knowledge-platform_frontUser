<template>
	<view>
		<template>
			<view class="article">
				<article-item :list="articleList" @itemClick="goDetail"></article-item>
				
				<u-divider color="#909399" half-width="200" border-color="#dcdfe6" text="到底了"></u-divider>
			</view>
		</template>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleStatus: '',
				articleList: [],
			}
		},
		// 页面生命周期
		onLoad(options) {
			// console.log('页面加载')
			
			this.getPersonalArticleList()
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
			// 获取个人文章列表
			async getPersonalArticleList(){
				const res = await this.$myRequest({
					url: "/api/select/getPersonalArticleList",
					data: {
						articleStatus: this.articleStatus 
					}
				})
				console.log(res)
				this.articleList =  [...this.articleList, ...res.data.data] 
			},
			// 子页面触发@itemClick即跳转详情页面
			goDetail(articleId){
				console.log(articleId)
				uni.navigateTo({
					url: "/pages/ucenter/article-record/article-record-detail/article-record-detail?articleId=" + articleId 
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
