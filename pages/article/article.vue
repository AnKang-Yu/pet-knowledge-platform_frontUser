<template>
	<view class="warp">
		<uni-section title="文章分类" type="line" padding>
			<uni-grid :column="3" :show-border="false" :square="false" @change="changeArticleCategory">
				<uni-grid-item v-for="(item ,index) in list" :index="index" :key="index">
					<view class="grid-item-box">
						<text class="text">{{item.text}}</text>
						<view v-if="item.badge" class="grid-dot">
							<uni-badge :text="item.badge" type="success" />
						</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</uni-section>
		
		<template>
			<uni-section title="文章列表" type="line" padding>
			<view class="article">
				<article-item :list="articleList" @itemClick="goDetail"></article-item>
				
				<u-divider color="#909399" half-width="200" border-color="#dcdfe6" text="到底了"></u-divider>
			</view>
			</uni-section>
		</template>
	</view>
	
	
	
</template>

<script>
	import articleItem from "../../components/article-item/article-item.vue"
	export default {
		data() {
			return {
				currentPage: 1,
				categoryId: '90',
				articleList: [],
				flag: true,
				list: [{
						categoryId: '90',
						text: '养宠记录',
						badge: '0'
					},
					{
						categoryId: '89',
						text: '饲养经验',
						badge: '1'
					},
					{
						categoryId: '91',
						text: '爱心救助',
						badge: '99'
					}
				]
			}
		},
		onLoad() {
			this.getArticleList()
		},
		methods: {
			changeArticleCategory(e){
				let {
					index
				} = e.detail
				this.categoryId =  this.list[index].categoryId
				this.currentPage = 1
				this.articleList = []
				this.getArticleList()
			},
			// 获取文章列表
			async getArticleList(){
				const res = await this.$myRequest({
					url: "/api/search/getArticleList",
					data: {
						currentPage: this.currentPage,
						articleCategoryid: this.categoryId 
					}
				})
				console.log(res)
				this.articleList =  [...this.articleList, ...res.data.data.records] 
			},
			// 子页面触发@itemClick即跳转详情页面
			goDetail(articleId){
				console.log(articleId)
				uni.navigateTo({
					url: "/pages/article/article-detail/article-detail?articleId=" + articleId
				})
			}
			
		},
		// 上拉触底加载
		onReachBottom() {
			// 返回的数据不够10*页数条，即没了(有问题)
			console.log(this.articleList.length)
			if(this.articleList.length<this.currentPage*10){
				return this.flag = true
			}
			console.log("触底")
			this.currentPage++
			this.getArticleList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log("下拉刷新")
			this.currentPage = 1
			this.articleList = []
			// this.flag = false
			setTimeout(()=>{
				this.getArticleList()
				uni.stopPullDownRefresh()
			},1000)
			
		},
		components:{
			"article-item" : articleItem
		}
	}
</script>

<style lang="scss">
	.article{
		
	}
	.image {
		width: 50rpx;
		height: 50rpx;
	}
	
	.text {
		font-size: 26rpx;
		margin-top: 10rpx;
	}
	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}
	
</style>
