<template>
	<view>
		<template>
			<view class="article">
				<article-item :list="articleList" @itemClick="goDetail"></article-item>
				
				<u-divider color="#909399" half-width="200" border-color="#dcdfe6" text="到底了"></u-divider>
			</view>
		</template>
		<template >
			<!-- 新增按钮 -->
		    <view>
		        <uni-fab
		            horizontal="right"
		            vertical="bottom"
		            :popMenu="false"
					@fabClick="addPensonalArticle"
		        ></uni-fab>
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
			if(options.articleStatus){
				this.articleStatus = options.articleStatus
				console.log(this.articleStatus)
			}
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
				if(this.articleStatus){
					// 草稿箱点击详情(可修改)
					uni.navigateTo({
						url: "/pages/ucenter/my-article/addoredit-article/addoredit-article?articleId=" + articleId 
					})
					
				}else{
					// 我的文章点击详情(不可修改)
					uni.navigateTo({
						url: "/pages/article/article-detail/article-detail?articleId=" + articleId
					})
				}
				
			},
			addPensonalArticle(){
				console.log('添加文章')
				uni.navigateTo({
					url: "/pages/ucenter/my-article/addoredit-article/addoredit-article" 
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
