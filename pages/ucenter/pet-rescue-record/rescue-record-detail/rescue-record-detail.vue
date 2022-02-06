<template>
	<view>
		<view>
			<u-steps :current="current"  v-if="form.formStatus > '104'">
					<u-steps-item title="发送审批" :desc="form.createTime | formatDay"></u-steps-item>
					<u-steps-item   error  :title="form.formStatusName" :desc="form.updateTime | formatDay"></u-steps-item>
					<u-steps-item  :title="form.formTypeName + '处理'" ></u-steps-item>
			</u-steps>
			<u-steps :current="current"  v-else>
				<u-steps-item title="发送审批" :desc="form.createTime | formatDay"></u-steps-item>
				<u-steps-item   :title="form.formStatusName" :desc="form.auditTime | formatDay"></u-steps-item>
				<u-steps-item  :title="form.formTypeName + '处理'" ></u-steps-item>
			</u-steps>
		</view>
		<!-- 绑定宠物表单 -->
		<view class="form">
			<form >
				<view class="form-item">
					<view>
						<label>表单编号</label> 
					</view>
					<view><u-button  :text="form.formId"></u-button></view>
				</view>
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
			</form>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 1,
				form: {},
				petModel: {}
			};
		},
		// 页面生命周期
		onLoad(options) {
			// console.log('页面加载')
			this.form = JSON.parse(options.form.replace(/""/g, ""));
			if(this.form.formStatus == '104'){
				this.current = 2;
			}
			
			console.log(this.form.formStatus)
			console.log(this.current)
			this.petModel.petId = this.form.petId
			this.getPetDetailInfo()
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
		methods:{
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
