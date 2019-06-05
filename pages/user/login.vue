<template>
	<div class="shop">
		<shop_header />
		<div class="login" >
			<div class="login_right_bg">
				<h3>账号登陆</h3>
				<div class="login_input">
					<i class="icon iconfont">&#xe601;</i>
					<input type="text" name="" v-model="username" placeholder="输入账号">
				</div>
				<div class="login_input">
					<i class="icon iconfont">&#xe62e;</i>
					<input type="password" name="" v-model="password" placeholder="输入密码">
				</div>
				<a-button type="primary" block @click="login()">登 陆</a-button>

				<div class="login_reg">
					<nuxt-link to="/user/register">注册账号</nuxt-link> | <nuxt-link to="/">忘记密码</nuxt-link>
					<p><nuxt-link to="/"><i class="icon iconfont">&#xeba5;</i> 微信登陆</nuxt-link></p>
				</div>

				
			</div>
		</div>
		<shop_foot />
	</div>
</template>

<script>
import shop_header from '@/components/Common/shop_header.vue'
import shop_foot from '@/components/Common/shop_foot.vue'

export default {
  components: {
    shop_header,
    shop_foot,
  },
  data(){
		return{
			username:'',
			password:'',
		}
  },
  methods:{
  	login:function(){
  		var _this = this;
  		this.$post(this.ROOT_URL + "Shop/login",{username:this.username,password:this.password}).then(function(res){
  			if(res.code==500){
  				_this.$message.error(res.message);
  			}

  			if(res.code == 200){
  				_this.$message.success('登录成功');
          localStorage.setItem('user_token',res.token);
          localStorage.setItem('user_username',res.user_info.username);
          localStorage.setItem('user_nickname',res.user_info.nickname);
          localStorage.setItem('user_avatar',res.user_info.avatar);
  				_this.$router.push({path:'/user'});
  			}
  		});
  	}
  },
  created:function(){
    var vm = this;
    // 判断token是否失效
    this.$post(this.ROOT_URL + 'Shop/checkUser')
      .then(function (res) {
        if(res.code == 200){
          vm.$router.push({path:'/user'});
        }
      });
  }

}
</script>

<style>
.login{height:590px;background:url(~assets/login_default_bg.png);background-repeat:no-repeat;background-position:top center;background-color:#081638;}
.login_right_bg{height:300px;width:380px;background:#fff;float:right;margin-right:80px;margin-top:120px;padding:30px 30px;display:block;box-sizing:border-box;}
.login_right_bg h3{font-size:20px;color:#b40707;margin-bottom:30px;}
.login_input{border-bottom:1px solid #efefef;margin-top:20px;}
.login_input input{border:none;width:300px;outline:none;font-size:14px;line-height:30px;padding:0 10px;float:left;}
.login_input i{float:left;line-height:30px;}
.login_input:after{display:block;clear:both;content:''}
.login_right_bg .ant-btn-primary{background-color:#b40707;border-color:#b40707;margin-top:30px;}
.login_reg{color:#666;margin-top:10px;text-align:right;}
.login_right_bg h4{text-align:center;margin-top:50px;color:#999;}
.login_right_bg h5{border-bottom:1px solid #efefef;margin-top:10px;}
.login_other i{margin-right:5px;line-height:30px;}
.login_reg p{margin-top:-20px;}
</style>