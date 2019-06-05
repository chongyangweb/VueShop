<template>
	<div class="shop">
		<shop_header />
		<div class="login" >
			<div class="login_right_bg" style="height:500px;margin-top:50px;">
				<h3>用户注册</h3>
        <div class="login_input" v-if="register=='1'">
          <i class="icon iconfont">&#xe6eb;</i>
          <input type="text" name="" v-model="email" placeholder="输入邮箱">
        </div>

        <div class="login_input" v-if="register=='2'">
          <i class="icon iconfont">&#xe652;</i>
          <input type="text" name="" v-model="phone" placeholder="输入手机号码">
        </div>

				<div class="login_input">
					<i class="icon iconfont">&#xe601;</i>
					<input type="text" name="" v-model="username" placeholder="输入账号">
				</div>

				<div class="login_input">
					<i class="icon iconfont">&#xe62e;</i>
					<input type="password" name="" v-model="password" placeholder="输入密码">
				</div>

        <div class="login_input" style="width:170px;float:left;">
          <!-- <i class="icon iconfont">&#xe601;</i> -->
          <input type="text" name="" style="text-align:center;width:170px;" v-model="code" placeholder="输入验证码">
        </div>

        <div class="login_input" style="width:130px;float:left;border:none;margin-left: 10px;">
          <button class="register_btn"  :disabled="count==0?disabled:'disabled'" :style="count==0?'':'background:#666;'" @click="sendSms()">{{count==0?'发送验证码':'重新发送('+count+')'}}</button>
        </div>

        <div class="clear"></div>

				<a-button type="primary" block @click="register()">注册</a-button>

<!-- 				<div class="login_reg">
					<nuxt-link to="/">注册账号</nuxt-link> | <nuxt-link to="/">忘记密码</nuxt-link>
					<p><nuxt-link to="/"><i class="icon iconfont">&#xeba5;</i> 微信登陆</nuxt-link></p>
				</div> -->

				
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
      register:'2',
      code:'',
      email:'',
      phone:'',
      count:0,
      disabled:false,
      setInter:null,
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
  	},
    sendSms:function(){
      var _this = this;
      if(this.phone=='' && this.email==''){
        this.$message.error('无法发送验证码！');
        return;
      }
      this.count = 60;
      this.setInter = setInterval(this.decNum,1000);
      this.$post(this.ROOT_URL + 'Shop/postRegister',{phone:this.phone,email:this.email}).then(function (res) {
        // console.log(res);
        if(res.code == 200){
          _this.$message.success('验证码发送成功！');
        }else{
          _this.$message.error('验证码发送失败！');
        }
      });
      // console.log(this.count);
    },
    decNum:function(){
      this.count = this.count-1;
      if(this.count<=0){
        clearInterval(this.setInter);
      }
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

    this.$get(this.ROOT_URL + 'Shop/getRegister').then(function (res) {
      vm.register = res.val;
      // console.log(vm);
    });
  }

};
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
.register_btn{background:#333;color:#fff;border:none;padding: 6px 30px;}
</style>