<template>
	<div class="shops">
		<!-- top -->
		<div class="shop_header">
			<div class="head">
				<div class="head_top_left">
					<ul>
						<li><a href="http://www.qingwuit.com">青梧官网</a></li>
						<li>|</li>
						<li><nuxt-link to="/">商城官网</nuxt-link></li>
						<li>|</li>
						<li><nuxt-link to="/">联系方式</nuxt-link></li>
						<li>|</li>
						<li><nuxt-link to="/">关于我们</nuxt-link></li>
						<li>|</li>
						<li><nuxt-link to="/">QingWu It</nuxt-link></li>
					</ul>
				</div>
				<div class="head_top_right">
					<ul>
						<li v-if="!token"><nuxt-link to="/user/login">登录</nuxt-link></li>
						<li v-if="!token"><nuxt-link to="/">注册</nuxt-link></li>
						<li v-if="token"><nuxt-link to="/user">欢迎您！<font color="#ca151e">{{nickname}}</font></nuxt-link></li>

						<li>|</li>
						<li><nuxt-link to="/user/order">我的订单</nuxt-link></li>
						<li>|</li>
						<li><nuxt-link to="/">手机版</nuxt-link></li>
						<li>|</li>
						<li><nuxt-link to="/">其他</nuxt-link></li>
					</ul>
				</div>
			</div>
		</div>
		<!-- logo -->
		<div class="shop_head_other">
			<div class="shop_logo"><img src="@/assets/newLogo.png" alt="青梧商城"></div>
			<div class="shop_search">
				<input type="text" name="search" v-model="keywords" placeholder="搜索" value="">
				<button type="button" @click="search()"><i class="icon iconfont">&#xeba0;</i></button>
				<div class="shop_my_car">
					<ul>
						<li><nuxt-link to="/">我的商城<i class="icon iconfont">&#xe625;</i></nuxt-link> </li>
						<li><nuxt-link to="/user/buy_car">我的购物车<i class="icon iconfont">&#xe602;</i></nuxt-link> </li>
					</ul>
					<div class="shop_car_dot">{{goods_car}}</div>
				</div>
			</div>
			
		</div>
	</div>
	
</template>

<!-- script -->
<script>
	export default {
		data(){
			return{
				token:false,
				username:'',
				nickname:'',
				avatar:'',
				goods_car:0,
				keywords:'',
			}
		},
		mounted(){
			var _this = this;
			var token = localStorage.getItem('user_token');
			if(this.$route.params.keywords !== undefined){
				this.keywords = this.$route.params.keywords;
			}
			if(token !== '' && token!== null && token!== undefined){
				this.token = true;
				this.username = localStorage.getItem('user_username');
				this.nickname = localStorage.getItem('user_nickname');
				this.avatar = localStorage.getItem('user_avatar');
			}

			var _this = this;
			this.$post(this.ROOT_URL + "Shop/checkUser").then(function(res){
				// console.log(res.code);
				if(res.code == 500){
					localStorage. removeItem('user_token');
				}
			});
			this.$get(this.ROOT_URL + "Shop/getGoodsCar").then(function(res){
				if(res.code==200){
					_this.goods_car = res.data;
				}
			});

		},
		methods:{
			search:function(){
				if(this.keywords == ''){
					this.keywords = ' ';
				}
				this.$router.push({path:'/goods/search/'+this.keywords})
			}
		}

	}
</script>

<!-- css -->
<style>

.shop_header{height: 30px;border-bottom: 1px solid #efefef;}
.head{width: 1200px;margin:0 auto;}
.head_top_left{float: left;}
.head_top_left ul li{line-height: 29px;float: left;margin-right: 8px;}
.head_top_left ul li a{line-height: 30px;}
.head_top_right{float: right;}
.head_top_right ul li{line-height: 29px;float: left;margin-right: 8px;}
.head_top_right ul li a{line-height: 30px;}
.shop_head_other{width: 1200px;margin:40px auto;}
.shop_head_other:after{display: block;clear: both;content:'';}
.shop_logo{float:left;margin-right: 120px;}
.shop_search{float: left;}
.shop_search input[name=search]{border-left: 1px solid #efefef;border-top: 1px solid #efefef;border-bottom: 1px solid #efefef;width: 434px;height: 38px;padding:10px;outline:none;border-right: none;float: left;}
.shop_search input:focus{ outline:none;}
.shop_search button{border:1px solid #efefef;float: left;width:38px;height: 38px;background: #fff;outline:none;text-align: center}
.shop_search button:hover{background: #333;color:#fff;}
.shop_my_car{border:1px solid #efefef;padding:9px;margin-left:20px;position: relative;float: left;}
.shop_my_car ul li {float: left;margin-right: 10px;}
.shop_my_car ul li i{margin-left: 5px;font-size: 12px;}
.shop_car_dot{position: absolute;top: -10px;line-height: 16px;background: #ca151e;padding:0 4px;color:#fff;border-radius: 4px;right:3px;}
</style>