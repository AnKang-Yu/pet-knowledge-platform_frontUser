<template>
	<view>
		<!-- 绑定宠物表单 -->
		<view class="form">
			<form >
				<view class="form-item">
					<view>
						<label>宠物名</label> 
					</view>
					<view><u-button  :text="petModel.petName"></u-button></view>
				</view>
				<view class="form-item"  >
					<view class="title">宠物分类</view>
					<view>
						<u-button  :text="petModel.petVarietyName"></u-button>
					</view>
				</view>
				<view class="form-item">
					<view >
						<label>宠物状态</label>
					</view>
					<view>
						<u-button  :text="petModel.petStatusName"></u-button>
					</view>
				</view>
				<view class="form-item">
					<view class="title">性别</view>
					<view>
						<u-radio-group
						    v-model="petModel.petSex"
						    placement="row"
							:disabled="true"
						>
							<!-- <u-button v-show="this.petModel.petSex === '66'?true:false" text='雄'></u-button>
							<u-button v-show="this.petModel.petSex === '67'?true:false" text="雌"></u-button> -->
							<u-radio  label="雄" :name="66" shape="circle"  />
							<u-radio  label="雌" :name="67" shape="circle"  />
						</u-radio-group>
					</view>
				</view>
				<view class="form-item">
					<view class="title">绝育状况</view>
					<view>
						
						<u-radio-group
							v-model="petModel.petNeutered"
						    placement="row"
							:disabled="true"
						>
							<!-- <u-button v-show="this.petModel.petNeutered === '31'" text='已绝育'></u-button>
							<u-button v-show="this.petModel.petNeutered === '32'" text="未绝育"></u-button> -->
							<u-radio  label="已绝育" :name="31" shape="circle"  />
							<u-radio  label="未绝育" :name="32" shape="circle"  />
						</u-radio-group>
				
					</view>	
				</view>
				<view class="form-item">
					<view class="title">出生日期</view>
					<view>
						<u-button  :text="petModel.petBirthday"></u-button>
					</view>
				</view>
				<view class="form-item">
					<view class="title">年龄大小</view>
					<view>
						<u-button  :text="petModel.petBirthday | friendlyDate"></u-button>
					</view>
				</view>
				
				<view class="uni-btn-v">
					<button @click="succourPet">领养</button>
				</view>
			</form>
			<!-- 抽屉 -->
			<!-- <view>
				<uni-drawer ref="showDrawer" mode="right" :mask-click="true">
					<scroll-view style="height: 100%;" scroll-y="true">
						<input v-model="formModel.formRemark"  type="text"  placeholder="请输入申请备注"  />
						<button @click="formSubmit"></button>
					</scroll-view>
				</uni-drawer>
			</view> -->
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 宠物状态单列选择
				show: false,
				// 日期选择
				dateShow: false,
				// 宠物分类设置
				linkageVisible: false,
				// petVarietyProps:{
				// 	label:"dictValue",
				// 	value:"dictId",
				// 	children:"list"
				// },
				varietyList: [],
				petStatusList: [],
				// 宠物详情
				petModel: {
					petId: '',
					petName: '',
					petVarietyId: '',
					petVarietyName: '',
					petSex: '',
					petNeutered: '',
					petBirthday: '',
					petStatusId: '',
					petStatusName: ''
				},
				formModel:{
					petId: '',
					targetId: '',
					formType: ''
				},
				startDate: ``,
				endDate: ``
			}
		},
		// 页面生命周期
		onLoad(options) {
			// this.findAllVarietyList()
			// // 初始化宠物状态的选择
			// this.findAllStatusList()
			// // 初始化日期选择范围
			// this.initDate()
			console.log('宠物petId='+ options.petId)
			// console.log('页面加载')
			if(options.petId){
				this.petModel.petId = options.petId
				console.log('petId=' + this.petModel.petId)
				this.getPetDetailInfo()
			}
			
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
		methods: {
			/**
			 * 获取遗弃宠物参数
			 */
			async getPetDetailInfo() {
				const res = await this.$myRequest({
					url: "/api/search/getStrayPetById/" + this.petModel.petId
				})
				console.log(res)
				this.petModel = res.data.data
				var date = new Date(res.data.data.petBirthday)
				this.petModel.petBirthday = `${date.getFullYear()}-${date.getMonth() + 1 >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}-${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()}`
				console.log(this.petModel)
				
				// 领养申请单的数据准备
				this.formModel.petId = res.data.data.petId
				this.formModel.targetId = res.data.data.petOwnerId
			},
			succourPet(){
				uni.showModal({
					title:'确定要领养'+this.petModel.petName+'吗?',
					// content: '这是一个模态弹窗',
					success: function (res) {
						if (res.confirm) {
							// 确认删除
							console.log('确认救助')
							this.formModel.formType = '107'
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
			
		}
	}
</script>

<style lang="scss">
	.form{
		// background-color: #ff0000;
		.form-item{
			align-items:center;
			font-size: 20px;
			// line-height: 100rpx;
			height: 100rpx;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			border-bottom: 2px solid gray;
			// view:nth-child(2){
			// 	margin-left: 30rpx;
			// }
		}
	}
</style>
