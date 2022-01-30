<template>
	<view class="article">
		<view class="article-title">{{ articleInfo.articleTitle }}</view>
		<template>
			<uni-list :border="false">
				<uni-list-item >
					<!-- 通过body插槽定义作者信息内容 -->
					<template v-slot:body>
						<view class="header-content">
							<view class="uni-title">{{articleInfo.articleAuthorname }}</view>
						</view>
					</template>
					<template v-slot:footer>
						<view class="footer">
							<view class="uni-note">更新于
								{{articleInfo.articleModified | formatDate}}
								<!-- <uni-dateformat :date="articleInfo.articleModified" format="yyyy-MM-dd hh:mm"
									:threshold="[60000, 2592000000]" /> -->
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</template>
		<template>
			<view class="banner">
				<!-- 文章开头，缩略图 -->
				<image class="banner-img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp2.itc.cn%2Fimages01%2F20210725%2F93fcfa39eb294e42863ea89cca3b4fef.jpeg&refer=http%3A%2F%2Fp2.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641026583&t=1b2b2e79e7c74332cdf969c59cb9d3ab" mode="widthFix"></image>
				<!-- 文章摘要 -->
				<view class="banner-title">
					<text class="uni-ellipsis">{{articleInfo.articleSummary}}</text>
				</view>
			</view>
			<view class="article-content">
				<rich-text :nodes="articleInfo.articleFormatContent"></rich-text>
			</view>
		</template>
	</view>
	
</template>

<script>
	export default {
		// filters: {
		// 	formatDate (inputDate) {
		// 		if (inputDate == null) {
		// 		    return ` `
		// 		}
		// 		const date = new Date(inputDate)
		// 		return `${date.getFullYear()}-${date.getMonth() + 1 >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}-${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()} ${date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()}:${date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()}`

		// 	}
		// },
		data() {
			return {
				articleInfo: {
					articleId: '',
					articleAuthorname: '',
					articleFormatContent: '',
					articleTitle: '',
					// url: '',
					articleSummary: '',
					articleOriginalContent: '',
					articleThumbnail: '',
					articleModified: '',
					articleCategoryid: '',
					articleTags: [],
					articleAllowComment: '',
					file: ''
				}
			};
		},
		// 页面生命周期
		onLoad(options) {
			// console.log('页面加载')
			this.articleInfo.articleId = options.articleId
			console.log('articleId='+this.articleInfo.articleId)
			this.getArticleDetailInfo()
		},
		onShow:function(){
			// this.name = uni.getStorageSync('name') || ''
			// console.log('name='+ this.name)
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
		methods:{
			// 文章详情参数
			async getArticleDetailInfo() {
				const res = await this.$myRequest({
					url: "/api/search/getArticleById/" + this.articleInfo.articleId
				})
				console.log(res)
				this.articleInfo = res.data.data.articleData
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		/* 标题 */
		.uni-title {
			display: flex;
			margin-bottom: 5px;
			font-size: 14px;
			font-weight: bold;
			color: #3b4144;
		}
	}
	
	.footer {
		display: flex;
		align-items: center;
		/* 描述 额外文本 */
		.uni-note {
			color: #999;
			font-size: 12px;
		
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: center;
		}
	}
	.article-title {
		padding: 20px 15px;
		padding-bottom: 0;
	}
	.banner {
		position: relative;
		margin: 0 15px;
		height: 180px;
		overflow: hidden;
		.banner-img {
			position: absolute;
			width: 100%;
		}
		
		.banner-title {
			display: flex;
			align-items: center;
			position: absolute;
			padding: 0 15px;
			width: 100%;
			bottom: 0;
			height: 30px;
			font-size: 14px;
			color: #fff;
			background: rgba(0, 0, 0, 0.4);
			overflow: hidden;
			box-sizing: border-box;
			.uni-ellipsis {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
	.article-content {
		padding: 15px;
		font-size: 15px;
		overflow: hidden;
	}
</style>
