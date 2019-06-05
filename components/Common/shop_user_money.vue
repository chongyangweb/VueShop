<template>
	<div class="user_right_content">
		<div class="user_buy_car_list">
			<div class="user_buy_car_list_title">
				我的钱包
			</div>
			<div class="user_buy_car_content">
				<div class="user_show_money">
					<a-row>
				      <a-col :span="6">
				      	<div class="user_money_block">
				      		账户余额
				      		<p style="text-align: center;font-size:16px;margin-top:10px;"><font color="#ca151e">￥ {{user_extend.balance}}</font></p>
				      	</div>
				      </a-col>
				      <a-col :span="6">
				      	<div class="user_money_block">
				      		余额提现
				      		<p style="text-align: center;font-size:16px;margin-top:10px;"><button style="border:none;background:#ca151e;font-size:12px;padding:0 20px;border-radius: 3px;color:#fff;outline: none;">提现</button></p>
				      	</div>
				      </a-col>
				      <a-col :span="6">
				      	<div class="user_money_block">
				      		账户充值
				      		<p style="text-align: center;font-size:16px;margin-top:10px;"><button style="border:none;background:#32d291;font-size:12px;padding:0 20px;border-radius: 3px;color:#fff;outline: none;">充值</button></p>
				      	</div>
				      </a-col>
				      <a-col :span="6">
				      	<div class="user_money_block">
				      		账户统计
				      		<p style="text-align: center;font-size:16px;margin-top:10px;"><button style="border:none;background:#fff;font-size:12px;padding:0 20px;border-radius: 3px;color:#666;border:1px solid #efefef;outline: none;">查看</button></p>
				      	</div>
				      </a-col>
				    </a-row>
				</div>
				<a-tabs defaultActiveKey="1" @change="callback">
				    <a-tab-pane tab="全部" key="1">
						
						<div><a-pagination :defaultCurrent="6" :total="30" /></div>
						
				    </a-tab-pane>
				    <a-tab-pane tab="收入" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
				    <a-tab-pane tab="支出" key="3">Content of Tab Pane 3</a-tab-pane>
				 </a-tabs>


			</div>
		</div>
	</div>
</template>

<style>
.user_buy_car_list{border:1px solid #efefef;}
.user_buy_car_list_title{line-height: 40px;padding-left: 20px;box-sizing:border-box;border-bottom: 1px solid #efefef;font-size: 14px;background: #f3f3f3;margin-bottom: 20px;}
.user_buy_car_content{padding: 0px 30px;}
.user_buy_car_content_title{display: inline-block;width: 300px;height: 50px;overflow: hidden;float: left;font-size: 12px;}
.user_buy_car_content ul li img{float: left;margin-right: 10px;}
.user_buy_car_content ul li{margin-bottom: 20px;}
.user_buy_car_content ul li:after{display: block;clear: both;content:'';}
.user_buy_car_content .ant-checkbox-wrapper{float: left;}
.user_buy_car_content ul li label span:first-child{float: left;margin-top: 18px;margin-right: 15px;}
.user_buy_car_content_guige{float: left;font-size: 12px;display: inline-block;width: 100px;height: 50px;overflow: hidden;color:#999;margin-left: 20px;}
.user_shop_car_js{margin-bottom: 30px;font-size: 12px;}
.user_buy_car_content_price{width:150px;text-align: center;float: left;display: inline-block;color:#ca151e;line-height: 30px;}
.user_buy_car_content_num{float: left;display: inline-block;width: 70px;}
.user_buy_car_content_do{width:120px;text-align: center;float: left;display: inline-block;color:#666;line-height: 30px;font-size: 12px;}
.user_buy_car_content_do:hover{color:#ca151e;}
.user_buy_car_jiesuan{background:#f1f1f1;margin-bottom: 20px;}
.user_buy_car_jiesuan:after{clear: both;display: block;content:'';}
.user_buy_car_jiesuan_num{float: right;line-height: 40px;margin-right: 20px;}
.user_buy_car_jiesuan_price{float: right;line-height: 40px;margin-right: 20px;}
.user_buy_car_jiesuan_btn{float: right;line-height: 40px;margin-right: 20px;}
.user_buy_car_content .ant-tabs-nav .ant-tabs-tab-active{color:#ca151e;}
.user_buy_car_content .ant-tabs-nav .ant-tabs-tab:hover{color:#ca151e;}
.user_buy_car_content .ant-tabs-ink-bar{background:#ca151e;}
.user_buy_car_content .anticon{vertical-align: -0.7em;}

.user_money_block{width: 80%;height: 100px;display: block;background: #f3f3f3;margin:0 auto;margin-bottom: 40px;text-align: center;padding: 20px;box-sizing: border-box;font-size: 14px;}
/*.user_buy_car_content .ant-checkbox{float: left;}*/
</style>

<script>
	export default {
	  
	  data(){
			return{
				user_extend:[],
				user_info:[],
			}
	  },
	  methods:{
	  	callback:function(e){

	  	},
	  	getUserInfo:function(){
	  		var _this = this;
			this.$get(this.ROOT_URL + "Shop/getUserInfos",).then(function(res){
				console.log(res);
				_this.user_extend = res.user_extend;
				_this.user_info = res.user_info;
			});
	  	},
	  },
	  mounted(){
	  	this.getUserInfo();
	  }
	}
</script>