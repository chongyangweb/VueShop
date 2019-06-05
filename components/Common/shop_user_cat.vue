<template>
<div class="user_menu">
	<div class="user_mbx">
		用户中心
	</div>
  <ul class="user_parent_list">
  	<li>
		<h3><i class="icon iconfont">&#xe640;</i>商品管理</h3>
		<ul class="user_child_list">
			<li><nuxt-link to="/user/buy_car">购物车</nuxt-link></li>
		</ul>
  	</li>
  	<li>
  		<h3><i class="icon iconfont">&#xe628;</i>订单管理</h3>
		<ul class="user_child_list">
			<li><nuxt-link to="/user/order">我的订单</nuxt-link></li>
			<li><nuxt-link to="/user/address">收货地址</nuxt-link></li>
		</ul>
  	</li>
  	<li>
  		<h3><i class="icon iconfont">&#xe601;</i>账户管理</h3>
		<ul class="user_child_list">
			<!-- <li><nuxt-link to="/">个人中心</nuxt-link></li> -->
			<li><nuxt-link to="/user/money">我的钱包</nuxt-link></li>
			<!-- <li><nuxt-link to="/">我的积分</nuxt-link></li> -->
		</ul>
  	</li>
  	<li> 
  		<h3><i class="icon iconfont">&#xeba3;</i>账号设置</h3>
		<ul class="user_child_list">
			<li><nuxt-link to="/">账号绑定</nuxt-link></li>
			<li><nuxt-link to="/user/user_info">资料修改</nuxt-link></li>
			<li><nuxt-link to="/user/avatar">修改头像</nuxt-link></li>
			<li><nuxt-link to="/user/password">修改密码</nuxt-link></li>
			<li @click="logout()"><nuxt-link to="/">退出账号</nuxt-link></li>
		</ul>
  	</li>
  </ul>
</div>
</template>


<style>
.user_menu{width:240px;float:left;min-height:40px;box-shadow: 0px 5px 10px #efefef;color:#009b8d;margin-bottom:30px;}
.user_parent_list{}
.user_parent_list li h3{line-height:40px;font-size:14px;font-weight:bold;background:#f1f1f1;padding:0 20px;}
.user_parent_list li h3 i{margin-right:5px;}
.user_child_list{background:#fff;}
.user_mbx{margin:20px 0;padding-left:70px;color:#ca151e;font-size:16px;font-weight:bold;}
.user_mbx .ant-breadcrumb a:hover{color:#ca151e;}
.user_child_list li a{line-height:35px;padding-left:45px;font-size:14px;}
.user_child_list{padding-top:10px;padding-bottom:10px;}
</style>

<script>
export default{
  data(){
    return {
    
    }
  },
  mounted(){
	var _this = this;
	this.$post(this.ROOT_URL + "Shop/checkUser").then(function(res){
		if(res.code == 500 ){
			localStorage.removeItem('user_token');
			_this.$message.error('密码失效！请重新登录！');
			_this.$router.push({path:'/user/login'});
		}else{
			console.log(res);
			localStorage.setItem('user_token',res.data.token);
		}
	});
   },
   methods:{
   	logout:function(){
   		this.$post(this.ROOT_URL + "Shop/logout").then(function(res){
   			localStorage.removeItem('user_token');
   			localStorage.removeItem('user_nickname');
   			_this.$message.success('成功退出账号！');
   		});
   	}
   }
}
</script>