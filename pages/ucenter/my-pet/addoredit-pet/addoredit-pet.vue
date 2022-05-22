<template>
	<view>
		<!-- 绑定宠物表单 -->
		<view class="form">
			<form @submit="formSubmit" >
				<view class="form-item">
					<view>
						<label>宠物名</label> 
					</view>
					<view><input v-model="petModel.petName"  type="text" placeholder="请输入宠物名" /></view>
				</view>
				<view class="form-item" @click="()=> show=true">
					<view >
						<label>宠物状态</label>
					</view>
					<!-- @click="()=> show=true" -->
					<view>
						<!-- <picker :range="petStatusList" :value="index" mode="selector"  range-key="'dictValue'"  >
								<view style="padding: 20rpx;background-color: white;">{{ petStatusList[index].dictValue }}</view>
						</picker> -->
						<!-- <u-picker :show="show" keyName="dictValue" :columns="petStatusList" @confirm="confirm" :closeOnClickOverlay="true"></u-picker>
						<u-button @click="show = true">打开</u-button> -->
						<u-button  :text="petModel.petStatusName?petModel.petStatusName:'请选择'"></u-button>
						<u-picker 
							:show="show" 
							:columns="petStatusList" 
							keyName="dictValue"
							
							
							@cancel="petStatusCancel" 
							@confirm="petStatusConfirm" 
							@change="petStatusChange" 
							@close="petStatusClose">
							
						</u-picker>
					</view>
					
				</view>
				<view class="form-item">
					<view class="title">性别</view>
					<view>
						<u-radio-group
						    v-model="petModel.petSex"
						    placement="row"
							@change="sexChange"
						>
							<u-radio label="雄" :name="66" shape="circle" />
							<u-radio label="雌" :name="67" shape="circle"/>
						</u-radio-group>
					</view>
				</view>
				<view class="form-item">
					<view class="title">绝育状况</view>
					<view>
						<u-radio-group
						    v-model="petModel.petNeutered"
						    placement="row"
							@change="neuteredChange"
						>
							<u-radio label="已绝育" :name="31" shape="circle" />
							<u-radio label="未绝育" :name="32" shape="circle"/>
						</u-radio-group>
				
					</view>	
				</view>
				<view class="form-item" @click="()=> dateShow=true">
					<view class="title">出生日期</view>
					<view>
						<picker 
						mode="date" 
						:value="petModel.petBirthday" 
						:start="startDate" 
						:end="endDate" 
						@change="bindDateChange">
						<u-button  :text="petModel.petBirthday?petModel.petBirthday:endDate"></u-button>
						</picker>		
					</view>
				</view>
				<view class="form-item"  @click="()=> linkageVisible=true">
					<view class="title">宠物分类</view>
					<view>
						<u-button  :text="petModel.petVarietyName?petModel.petVarietyName:'请选择'"></u-button>
						<!-- 使用这个插件需要有数据，children不能为null不然报错 -->
						<w-picker
							:visible.sync="linkageVisible"
							mode="linkage"
							:options="varietyList"
							:level="2"
							default-type="dictId"
							:default-props="petVarietyProps"
							@confirm="petVarietyConfirm($event,'linkage')"
							@cancel="petVarietyCancel"
							ref="linkage" 
						></w-picker>
					</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">保存</button>
				</view>
			</form>
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
				petVarietyProps:{
					label:"dictValue",
					value:"dictId",
					children:"children"
				},
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
				startDate: ``,
				endDate: ``,
				
			}
		},
		// 页面生命周期
		onLoad(options) {
			this.findAllVarietyList()
			// 初始化宠物状态的选择
			this.findAllStatusList()
			// 初始化日期选择范围
			this.initDate()
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
			 * 查询宠物所有状态列表
			 */
			async findAllStatusList() {
				const res = await this.$myRequest({
					url: "/api/search/findAllPetStatusList"
				})
				console.log('查询了')
				console.log(res)
				this.petStatusList = res.data.data
				console.log(this.petStatusList)
			},
			/**
			 * 查询宠物所有分类列表
			 */
			async findAllVarietyList() {
			    const res = await this.$myRequest({
					url: "/api/search/findAllVarietyList"
			    })
				console.log('宠物分类')
			    console.log(res)
				this.varietyList = res.data.data
				console.log(this.varietyList )
			      
			},
			/**
			 * 获取宠物参数
			 */
			async getPetDetailInfo() {
				const res = await this.$myRequest({
					url: "/api/select/getPetById/" + this.petModel.petId
				})
				console.log(res)
				this.petModel = res.data.data
				var date = new Date(res.data.data.petBirthday)
				this.petModel.petBirthday = `${date.getFullYear()}-${date.getMonth() + 1 >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}-${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()}`
				console.log(this.petModel)
			},
			// bindPickerChange: function(e) {
			// 	console.log('picker发送选择改变，携带值为', e.target.value)
			// 	this.index = e.target.value
			// },
			/**
			 * 宠物状态确定，进行赋值操作后关闭u-picker弹窗
			 * @param {Object} e
			 */
			petStatusConfirm(e) {
				console.log(e);
				// console.log(e.value[0].dictId)
				// console.log(e.value[0].dictValue)
				this.petModel.petStatusId = e.value[0].dictId
				this.petModel.petStatusName = e.value[0].dictValue
				// this.show = !this.show
				this.show = false;
			},
			petStatusChange(e) {
				// console.log('change', e);
			},
			/**
			 * 取消选择宠物状态，关闭u-picker弹窗
			 * @param {Object} e
			 */
			petStatusCancel(e) {
				// this.show = !this.show;
				this.show = false;
				// console.log(e);
			},
			/**
			 * 关闭宠物状态选择器时触发
			 */
			petStatusClose(){
				// this.show = !this.show;
				this.show = false;
			},
			/**
			 * 选择宠物性别
			 * @param {Object} value
			 */
			sexChange: function(value) {
				//console.log(value)
				this.petModel.petSex = value
				//console.log(this.petModel.petSex)
			},
			/**
			 * 选择宠物绝育状况
			 * @param {Object} value
			 */
			neuteredChange: function(value) {
				this.petModel.petNeutered = value
				//console.log(this.petModel.petNeutered)
			},
			/**
			 * 宠物出生日期绑定
			 * @param {Object} e
			 */
			bindDateChange: function(e) {
				this.petModel.petBirthday = e.target.value
			},
			/**
			 * 初始化日期选择
			 */
			initDate(){
				const currentDate = new Date()
				this.endDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1 >= 10 ? (currentDate.getMonth() + 1) : '0' + (currentDate.getMonth() + 1)}-${currentDate.getDate() >= 10 ? currentDate.getDate() : '0' + currentDate.getDate()}`
				// 默认宠物的出生日期为今天
				this.petModel.petBirthday = this.endDate
				// 只能选择15年内的
				this.startDate = `${currentDate.getFullYear() - 15}-${(currentDate.getMonth()+1)}-${currentDate.getDate()}`
			},
			/**
			 * 宠物分类确认
			 * @param {Object} res
			 */
			petVarietyConfirm(res){
				console.log(res)
				// 好像只能写死了= =
				console.log(res.obj.col2.dictValue)
				this.petModel.petVarietyId = res.obj.col2.dictId;
				this.petModel.petVarietyName = res.obj.col2.dictValue;
				
			},
			petVarietyCancel(){
				
			},
			/**
			 * 表单提交事件
			 * @param {Object} e
			 */
			async formSubmit(e) {
				console.log('要绑定宠物了');
				// console.log(e)
				console.log(this.petModel);
				var res = '';
				if(!this.petModel.petId){
					// 属于是新增
					console.log('新增')
					this.petModel.petOwnerId = uni.getStorageSync('userId')
					// var formdata = e.detail.value
					res = await this.$myRequest({
						url: "/api/insert/bindPersonalPet",
						method: "POST",
						data: this.petModel
					})
				}else{
					console.log('编辑')
					// 属于是编辑
					res = await this.$myRequest({
						url: "/api/update/editPersonalPet",
						method: "PUT",
						data: this.petModel
					})
				}
				console.log(res)
				if(res && res.data.code == 200){
					// 跳转到列表页
					uni.showToast({
						title: res.data.msg,
						duration: 2000,
						success:function(){
							// 跳转到列表页
							setTimeout(() => {
								uni.switchTab({
									url: "/pages/ucenter/ucenter"
								})
							},2000);
						}
					});
				}
				
			}
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
