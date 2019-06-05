<template>
	<div class="user_right_content">
		<div class="user_buy_car_list">
			<div class="user_buy_car_list_title">
				资料修改
			</div>

			<div class="user_info_block">
				
				<a-form>
				    <a-form-item
				      label="昵称"
				      :label-col="{ span: 5 }"
				      :wrapper-col="{ span: 12 }"
				    >
				      <a-input v-model="nickname" />
				    </a-form-item>

				    <a-form-item
				      label="邮箱"
				      :label-col="{ span: 5 }"
				      :wrapper-col="{ span: 12 }"
				    >
				      <a-input v-model="email" />
				    </a-form-item>

				    <a-form-item
				      label="电话"
				      :label-col="{ span: 5 }"
				      :wrapper-col="{ span: 12 }"
				    >
				      <a-input  v-model="phone" />
				    </a-form-item>

					<a-form-item
				      label="性别"
				      :label-col="{ span: 5 }"
				      :wrapper-col="{ span: 12 }"
				    >
				    <a-radio-group :defaultValue="1" v-model="gender">
				        <a-radio :value="1">
				          男
				        </a-radio>
				        <a-radio :value="0">
				          女
				        </a-radio>
				      </a-radio-group>
				    </a-form-item>
				    
				    <a-form-item
				      :wrapper-col="{ span: 12, offset: 5 }"
				    >
				      <a-button type="danger" html-type="submit" @click="editUserInfo()">保存</a-button>
				    </a-form-item>
				  </a-form>

			</div>


			</div>
		</div>
	</div>
</template>

<style>
.user_buy_car_list{border:1px solid #efefef;}
.user_buy_car_list_title{line-height: 40px;padding-left: 20px;box-sizing:border-box;border-bottom: 1px solid #efefef;font-size: 14px;background: #f3f3f3;margin-bottom: 20px;}
.user_buy_car_content{padding: 0px 30px;}
.user_buy_car_content_title{display: inline-block;width: 300px;height: 50px;overflow: hidden;float: left;font-size: 12px;}

</style>

<script>
	export default {
	  
	  data(){
			return{
				user_extend:[],
				user_info:[],
				nickname:'',
				email:'',
				phone:'',
				gender:1,
			}
	  },
	  methods:{
	  	callback:function(e){

	  	},
	  	getUserInfo:function(){
	  		var _this = this;
			this.$get(this.ROOT_URL + "Shop/editUserInfo",).then(function(res){
				_this.nickname = res.data.nickname;
				_this.email = res.data.email;
				_this.phone = res.data.phone;
				_this.gender = res.data.gender;
			});
	  	},
	  	editUserInfo:function(){
	  		var _this = this;
			this.$post(this.ROOT_URL + "Shop/editUserInfo",{nickname:this.nickname,email:this.email,phone:this.phone,gender:this.gender}).then(function(res){
				if(_this.nickname == '' || _this.email == '' || _this.phone == ''){
					_this.$message.error('请认真填写');
				}
				if(res.code == 200){
					_this.$message.success('信息资料修改成功！');
				}
			});
	  	},
	  },
	  mounted(){
	  	this.getUserInfo();
	  }
	}
</script>