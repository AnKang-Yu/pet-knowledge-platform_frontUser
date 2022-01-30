<template>
	<view>
		<template>
			<view>
				<uni-section title="文章标题" type="line" padding>
					<input v-model="articleInfo.articleTitle"  type="text" placeholder="请输入文章标题" />
				</uni-section>
				<uni-section title="文章分类" type="line" padding>
					<u-button  :text="articleInfo.articleCategoryid?articleInfo.articleCategoryName:'请选择文章分类'" @click="()=> categoryShow=true"></u-button>
					<u-picker 
						:show="categoryShow" 
						:columns="articleCategoryList" 
						keyName="dictValue"
						
						@cancel="articleCategoryCancel" 
						@confirm="articleCategoryConfirm" 
						@change="articleCategoryChange" 
						@close="articleCategoryClose">
						
					</u-picker>
				</uni-section>
				<uni-section title="文章标签" type="line" padding>
					<u-button  v-if="articleInfo.articleTags.length>0" @tap="()=> this.$refs.tkitree._show()">已选择标签</u-button>
					<u-button v-else @tap="()=> this.$refs.tkitree._show()">请选择文章标签</u-button>
					<!-- :selectParent="true" -->
					<tki-tree ref="tkitree" :multiple="true" :range="tagList" :foldAll="true" 
					    rangeKey="dictValue" idKey="dictId" @confirm="treeConfirm" @cancel="treeCancel">
					</tki-tree>
				</uni-section>
				<uni-section title="文章摘要" type="line" padding>
					<!-- @blur: 输入框失去焦点时触发  @blur="bindTextAreaBlur"-->
					<textarea v-model="articleInfo.articleSummary"  placeholder="请输入文章摘要" auto-height />
				</uni-section>
			</view>
		</template>
		<template>
			<uni-section title="文章内容" type="line" padding>
			<view class="container">
				<view class="page-body">
					<view class='wrapper'>
						<view class='toolbar' @tap="format" style="height: 120px;overflow-y: auto;">
							<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
							<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
							<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
							<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view>
							<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align"
							 data-value="left"></view>
							<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi" data-name="align"
							 data-value="center"></view>
							<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align"
							 data-value="right"></view>
							<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi" data-name="align"
							 data-value="justify"></view>
							<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight"
							 data-value="2"></view>
							<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing" data-name="letterSpacing"
							 data-value="2em"></view>
							<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop"
							 data-value="20px"></view>
							<view :class="formats.previewarginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju" data-name="marginBottom"
							 data-value="20px"></view>
							<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
							<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
							<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize"
							 data-value="24px"></view>
			
							<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color" data-name="color"
							 data-value="#0000ff"></view>
							<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor"
							 data-name="backgroundColor" data-value="#00ff00"></view>
			
							<view class="iconfont icon-date" @tap="insertDate"></view>
							<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
							<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list"
							 data-value="ordered"></view>
							<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
							 data-value="bullet"></view>
							<view class="iconfont icon-undo" @tap="undo"></view>
							<view class="iconfont icon-redo" @tap="redo"></view>
			
							<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
							<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
							<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
							<view class="iconfont icon-charutupian" @tap="insertImage"></view>
							<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header"
							 :data-value="1"></view>
							<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao" data-name="script"
							 data-value="sub"></view>
							<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao" data-name="script"
							 data-value="super"></view>
							<view class="iconfont icon-shanchu" @tap="clear"></view>
							<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl" data-name="direction"
							 data-value="rtl"></view>
			
						</view>
						<view class="editor-wrapper">
							<editor id="editor" class="ql-container" placeholder="请开始输入..." showImgSize showImgToolbar showImgResize
								 @statuschange="onStatusChange"  @ready="onEditorReady" @input="bindTextAreaInput">
							</editor>
						</view>
					</view>
				</view>
			</view>
			</uni-section>
			<uni-section title="操作栏" type="line" padding>
			
				<view style="display: flex; justify-content: space-between;">
					<u-button type="error" text="保存" @click="saveDraft"></u-button>
					<u-button type="primary" text="发布" @click="pushArticle" ></u-button>
				</view>
				
			</uni-section>
		</template>
		
	</view>
</template>

<script>
	import tkiTree from "@/components/LinK9711-tree/LinK9711-tree.vue"
	// import "../../../common/editor.css"
	export default {
		components: {
			tkiTree
		},
		data() {
			return {
				// 分类显示标识
				categoryShow: false,
				
				articleId: '',
				articleInfo: {
					articleId: '',
					articleFormatContent: '',
					articleTitle: '',
					// url: '',
					articleSummary: '',
					articleOriginalContent: '',
					articleThumbnail: '',
					articleCategoryid: '',
					articleCategoryName: '',
					articleTags: [],
					articleAllowComment: '',
					file: ''
				},
				// 标签级联选择器
				tagList: [],
				articleCategoryList: [],
				readOnly: false,
				formats: {}
			}
		},
		// 页面生命周期
		onLoad(options) {
			this.findAllCategoryList()
			this.findAllTagsList()
			if(options.articleId){
				this.articleId = options.articleId
				console.log('articleId='+this.articleId)
				this.getArticleDetailInfo()
			}
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("https://sungd.github.io/Pacifico.ttf")'
			})
			
			// console.log('页面加载')
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
			// 文章详情参数
			async getArticleDetailInfo() {
				const res = await this.$myRequest({
					url: "/api/search/getArticleById/" + this.articleId
				})
				console.log('查询文章')
				console.log(res)
				this.articleInfo = res.data.data.articleData
				this.articleInfo.articleTags = res.data.data.articleTags
				// if(this.articleInfo.articleTags.length > 0){
				// 	console.log('test start')
				// 	console.log(this.$refs.tkitree.treeList[0].checked)
				// 	this.$refs.tkitree.treeList[0].checked = true
				// 	console.log(this.$refs.tkitree.treeList[0].checked)
				// }
				
				// 原先传数据的锅，用了二维数组
				var index = this.articleCategoryList[0].map(item=> item.dictId).indexOf(this.articleInfo.articleCategoryid)
				console.log(index)
				if(index> -1){
					this.articleInfo.articleCategoryName = this.articleCategoryList[0][index].dictValue
				}
			},
			/**
			 * 查询文章所有分类列表
			 */
			async findAllCategoryList() {
				const res = await this.$myRequest({
					url: "/api/search/findAllCategoryList"
				})
				console.log(res)
				this.articleCategoryList = res.data.data
			},
			articleCategoryConfirm(e) {
				console.log(e);
				// console.log(e.value[0].dictId)
				// console.log(e.value[0].dictValue)
				this.articleInfo.articleCategoryid = e.value[0].dictId
				this.articleInfo.articleCategoryName = e.value[0].dictValue
			
				this.categoryShow = false;
			},
			articleCategoryChange(e) {
				// console.log('change', e);
			},
			/**
			 * 取消选择宠物状态，关闭u-picker弹窗
			 * @param {Object} e
			 */
			articleCategoryCancel(e) {
				this.categoryShow = false;
				// console.log(e);
			},
			/**
			 * 关闭宠物状态选择器时触发
			 */
			articleCategoryClose(){
				
				this.categoryShow = false;
			},
			/**
			 * 编辑器内容改变时触发
			 * @param {Object} e
			 */
			bindTextAreaInput(e){
				console.log(e)
				this.articleInfo.articleFormatContent  = e.detail.html
				console.log(this.articleInfo.articleFormatContent)
				this.articleInfo.articleOriginalContent  = e.detail.text
				console.log(this.articleInfo.articleOriginalContent)
			},
			
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
					 this.editorCtx.setContents({    
								html:this.articleInfo.articleFormatContent    //this.articleInfo.articleFormatContent为赋值内容。    
						})   
				}).exec()
			},
			// 保存草稿
			async saveDraft() {
			  // 新增草稿的时候把当前用户的信息也加进去
			  this.articleInfo.articleAuthorid = uni.getStorageSync('userId')
			  this.articleInfo.articleAuthorname = uni.getStorageSync('name')
			  // this.articleInfo.articleStatus = '93'
			  // console.log(this.articleInfo)
			  const res = await this.$myRequest({
						url: "/api/insert/saveDraft",
						method: "POST",
						data: this.articleInfo
					})
			  if (res && res.data.code === 200) {
				// 请求成功 刷新列表
				console.log('保存草稿')
				console.log(res)
				uni.showToast({
					title: res.data.msg,
					duration: 2000,
					success:function(){
						// 跳转到列表页
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/ucenter/my-article/my-article?articleStatus=93"
							})
						},2000);
					}
				});
			  }
			},
			// 发布文章
			async pushArticle() {
			  // 以防万一把当前用户的信息也加进去
			  this.articleInfo.articleAuthorid = uni.getStorageSync('userId')
			  this.articleInfo.articleAuthorname = uni.getStorageSync('name')
			  
			  
			  const res = await this.$myRequest({
						url: "/api/insert/pushPersonArticle",
						method: "POST",
						data: this.articleInfo
					})
			  if (res && res.data.code === 200) {
				// 请求成功 刷新列表
				console.log('发布文章')
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
			},
			// 获取所有文章标签
			async findAllTagsList() {
			  const res = await this.$myRequest({
			  	url: "/api/search/findAllTagsList"
			  })
			  console.log('文章标签')
			  console.log(res)
			  this.tagList = res.data.data
			  console.log(this.tagList )
			},
			// 确定回调事件
			treeConfirm(e) {
				var result = []
				var currentSelectedTagList = e.filter(item=>item.parents.length >= 2)
				console.log(e)
				if(e.length % 3 != 0){
					currentSelectedTagList.push(e[e.length - 1])
				}
				console.log(currentSelectedTagList)
				let tag
				currentSelectedTagList.forEach(function(tag){
					var tempList = tag.parents.map(
					function(item){
						return item.dictId
					})
					tempList.push(tag.dictId)
					result.push(tempList)
				})
					
				this.articleInfo.articleTags = result 
				console.log(this.articleInfo.articleTags)
				console.log(this.articleInfo.articleTags.length)
				// console.log(e)
			},
			// 取消回调事件
			treeCancel(e) {
				console.log(e)
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../common/editor-icon.css";
	.page-body {
		height: calc(100vh - var(--window-top) - var(--status-bar-height));
	}
	.wrapper {
		height: 100%;
	}
	.editor-wrapper {
		height: calc(100vh - var(--window-top) - var(--status-bar-height) - 140px);
		background: #fdfff3;
	}
	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}
	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}
	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: 100%;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}
	.ql-active {
		color: #06c;
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
