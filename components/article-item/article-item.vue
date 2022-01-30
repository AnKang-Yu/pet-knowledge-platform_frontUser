<template>
	<!-- 资讯组件 -->
	<view>
		
		<view class="article_item" @click="navigator(item.articleId)"  v-for="item in list" :key="item.articleId">
			<!-- 左侧图片 -->
			<image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F53%2F0a%2Fda%2F530adad966630fce548cd408237ff200.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640941005&t=a951a2202cb2fb1590b6eec1fb7452f6"></image>
			<!-- 右侧信息 -->
			<view class="right">
				<!-- 主体信息 -->
				<view class="tit">
					{{item.articleTitle}}
				</view>
				<!-- 发表时间 + 文章标签 -->
				<view class="info">
					<!-- | 作用 类似linux的管道  -->
					<text>发表时间 : {{item.articleModified | formatDate}}</text>
				</view>
				<view class="info">
					<text>文章类型: </text>
					<text>{{item.articleCategoryName}}</text>
				</view>
				<view class="info">
					<text>文章标签: </text>
					<text >
						<block v-for="tag in item.articleTags" :key="tag.tagId" >{{tag.tagName}}</block>
					</text>
				</view>
				<view class="info">
					<text>文章状态: </text>
					<text>{{item.articleStatusName}}</text>
				</view>
			</view> 
		</view>
	</view>
</template>

<script>
	export default{
		// 接受父页面传递的数据
		props: ["list"],
		// 组件过滤器
		filters: {
			formatDate (date) {
				const newDate = new Date(date)
				const year = newDate.getFullYear()
				const mouth = (newDate.getMonth()+1).toString().padStart(2,0)
				const day = newDate.getDate().toString().padStart(2,0)
				return year+'-'+mouth+'-'+day
			}
		},
		methods:{
			navigator(articleId){
				// 调用父页面new的goDetail()
				// 触发父页面事件
				this.$emit("itemClick",articleId)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.article_item{
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
