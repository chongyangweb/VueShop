<template>
	<div class="shop">
		<shop_header />
	    <shop_othor_nav />

	    <mbx />

	    <div class="order" >
	    	<a-steps :current="current">
	    		<a-step  title="提交订单"></a-step>
	    		<a-step  title="确认支付"></a-step>
	    		<a-step  title="订单完成"></a-step>
	    	</a-steps>

	    	<div class="order_pay" >
	    		<div class="order_success_info">
	    			<div class="order_success_pic"><i class="icon iconfont">&#xe630;</i></div>
	    			<div class="order_success_title">您已经支付成功！</p></div>
	    		</div>

	    		<div class="order_success_return_link"><nuxt-link to="/">点击返回首页</nuxt-link> {{times}} s</div>

	    	</div>

	    </div>

	    <!-- 底部 -->
    	<shop_foot />
	</div>
</template>

<style>
.order{width: 1200px;margin: 0 auto;margin-top: 20px;padding-bottom: 50px;}
.order_success_info{background:#f1f6fe;border:1px solid #d7e0ee;margin-top: 40px;}
.order_success_info:after{display: block;content:'';clear: both;}
.order_success_pic{color:#7ac256;float: left;}
.order_success_pic i{font-size: 3.4rem;margin-left: 20px;margin-right: 25px;}
.order_success_title{font-size:20px; margin-top: 18px;color:#333;line-height:  3rem;}
.order_success_title p{font-size: 14px;}
.order_success_list{margin-top: 30px;}
.order_success_list_title{padding:20px 20px;background:#f5f5f5;border:1px solid #efefef;font-size: 14px;}
.order_success_list_order_no{border-bottom:1px solid #efefef;border-left:1px solid #efefef;border-right:1px solid #efefef;padding: 0 20px;line-height: 40px;font-weight: bold;}
.order_success_list_order ul li{padding:10px 20px;border-bottom:1px solid #efefef;border-left:1px solid #efefef;border-right:1px solid #efefef;}
.order_success_list .ant-radio-checked:after{border:1px solid #ca151e;}
.order_success_return_link{text-align: center;font-size:14px;margin-top: 30px;}
.order_success_return_link a{color:#333;}
</style>


<script>
import shop_header from '@/components/Common/shop_header.vue'
import shop_othor_nav from '@/components/Common/shop_other_nav.vue'
import shop_foot from '@/components/Common/shop_foot.vue'
import mbx from '@/components/Common/mbx.vue'

export default {
	components: {
    	shop_header,
    	shop_othor_nav,
    	shop_foot,
    	mbx,
    },
	data(){
		return{
			current:2,
			total_price:0,
			times:3,
			toms:null,
		}
	},
	methods:{
		start_return:function(){
			if(this.times<=0){
				this.$router.push({path:'/'});
			}else{
				this.times--;
				
			}
			console.log(this.times);
		}
	},
	mounted(){
		var _this = this;
		this.total_price = this.$route.params.total_price;
	  	this.toms = setInterval(function tom(){
	  		if(_this.times<=0){
				_this.$router.push({path:'/'});
			}else{
				_this.times--;
				
			}
			console.log(_this.times);
	  	},1000);
	},
	destroyed(){
		clearTimeout(this.toms);
	}

}
</script>