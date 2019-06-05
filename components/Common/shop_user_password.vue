<template>
	<div class="user_right_content">
		<div class="user_buy_car_list">
			<div class="user_buy_car_list_title">
				密码修改
			</div>

			<div class="user_info_block">
				
				<a-form>
				    <a-form-item
				      label="旧密码"
				      :label-col="{ span: 5 }"
				      :wrapper-col="{ span: 12 }"
				    >
				      <a-input v-model="old_password" type="password" />
				    </a-form-item>

				    <a-form-item
				      label="新密码"
				      :label-col="{ span: 5 }"
				      :wrapper-col="{ span: 12 }"
				    >
				      <a-input v-model="new_password" type="password" />
				    </a-form-item>

				    <a-form-item
				      label="确认密码"
				      :label-col="{ span: 5 }"
				      :wrapper-col="{ span: 12 }"
				    >
				      <a-input v-model="qr_password" type="password" />
				    </a-form-item>

				    <a-form-item
				      :wrapper-col="{ span: 12, offset: 5 }"
				    >
				      <a-button type="danger" html-type="submit" @click="editPassword()">保存</a-button>
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
				old_password:'',
				new_password:'',
				qr_password:'',
			}
	  },
	  methods:{
	  	callback:function(e){

	  	},
	  	editPassword:function(){
	  		var _this = this;
	  		if(_this.new_password == '' || _this.old_password == ''){
				_this.$message.error('请认真填写！');
				return;
			}

			// console.log(res);
			if(_this.new_password != _this.qr_password){
				_this.$message.error('两次输入密码不一致！');
				return;
			}

			this.$post(this.ROOT_URL + "Shop/editPassword",{old_password:this.old_password,new_password:this.new_password}).then(function(res){

				if(res.code == 200){
					_this.logout();
					_this.$message.success(res.message);
				}else{
					_this.$message.error(res.message);
				}

			});
	  	},
	  	logout:function(){
	   		this.$post(this.ROOT_URL + "Shop/logout").then(function(res){
	   			localStorage.removeItem('user_token');
	   			localStorage.removeItem('user_nickname');
	   		});
	   	},
	  },
	  mounted(){
	  	// this.getUserInfo();
	  }
	}
</script>