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

			<!-- 确认订单模块 -->
	    	<div class="order_comp" v-show="current==0">
	    		<div class="order_address">
	    			<div class="order_address_title">
	    				选择送货地址
	    			</div>
	    			<div class="order_address_list">
	    				<ul>
	    					<li v-for="v in address" :class="v.is_default==1?'address_red':''" @click="default_address(v.id)">
	    						<div class="order_address_list_name"><b>{{v.name}}</b> ({{v.phone}})</div>
	    						<div class="order_address_list_address">{{v.province==v.city?(v.province+v.region+v.address):(v.province+v.city+v.region+v.address)}} </div>
	    						<i class="icon iconfont">&#xe611;</i>
	    					</li>
	    				</ul>
	    			</div>
	    		</div>

	    		<div class="order_comp_goods">
	    			<div class="order_address_title">
	    				订单商品信息
	    			</div>
	    			<div class="order_comp_goods_info">
	    				<a-row>
					      <a-col :span="4">商品信息</a-col>
					      <a-col :span="4">属性信息</a-col>
					      <a-col :span="4">单价</a-col>
					      <a-col :span="4">数量</a-col>
					      <a-col :span="4">优惠信息</a-col>
					      <a-col :span="4">小计</a-col>
					    </a-row>
					    <ul>
					    	<li  v-for="v in goods_list">
					    		<!-- <div class="order_comp_dianp">
					    			<i class="icon iconfont">&#xe675;</i> 店铺信息
					    		</div> -->
					    		<div class="order_comp_goods_list">
					    			<a-row>
								      <a-col :span="4">
										<div class="order_comp_goods_avatar">
											<img :src="v.goods_info.images.split(',')[0]" width="40px" height="40px">
										</div>
										<div class="order_comp_goods_title" :title="v.goods_info.title">
											{{v.goods_info.title}}
										</div>
								      </a-col>
								      <a-col :span="4">
								      	<div class="order_comp_goods_attr">
								      		{{v.sku.name}}
								      	</div>
								      </a-col>
								      <a-col :span="4">
								      	<div class="order_comp_goods_price">
								      		￥ {{v.price}}
								      	</div>
								      </a-col>
								      <a-col :span="4">{{v.buy_num}}</a-col>
								      <a-col :span="4">-</a-col>
								      <a-col :span="4">
										<div class="order_comp_goods_price">
								      		￥ {{v.price*v.buy_num}}
								      	</div>
								      </a-col>
								    </a-row>
					    		</div>
					    		
					    	</li>
					    </ul>
	    			</div>

	    			<div class="order_comp_btn">
	    				<div class="order_comp_count_price">总计价：<font style="color:#ca151e;font-size: 20px;">￥ {{total_price}}</font></div>
	    				<button @click="submitOrder()">提交订单</button>
	    			</div>
	    		</div>
	    	</div>

	    	<div class="order_pay" v-show="current==1">
	    		<div class="order_success_info">
	    			<div class="order_success_pic"><i class="icon iconfont">&#xe630;</i></div>
	    			<div class="order_success_title">您已经提交该订单，请尽快支付！<p>共计： <font color="#f0506e">{{total_price}}</font> 元</p></div>
	    		</div>

	    		<div class="order_success_list">
	    			<div class="order_success_list_title">订单详情</div>
	    			<div class="order_success_list_order" v-for="v in order_list">
	    				<div class="order_success_list_order_no">订单号：{{v.order_no}} <span style="color:#999;font-weight: normal;margin-left:20px;">TIME：{{v.add_time | formatDate}}</span></div>
	    				<ul>
	    					<li v-for="vo in v.order_goods_list">
	    						<div class="order_success_list_order_list">
					    			<a-row>
								      <a-col :span="4">
										<div class="order_comp_goods_avatar">
											<img :src="vo.image" width="40px" height="40px">
										</div>
										<div class="order_comp_goods_title" :title="vo.title">
											<span style="line-height:40px;font-size:14px;">{{vo.title}}</span>
										</div>
								      </a-col>
								      <a-col :span="4">
								      	<div class="order_comp_goods_attr">
								      		<span style="color:#333">规格属性</span><p>
								      		{{vo.spec_name}}
								      		</p>
								      	</div>
								      </a-col>
								      <a-col :span="4">
								      	<div class="order_comp_goods_price">
								      		<span style="color:#333">单价</span><p>
								      			{{vo.price}}
								      		</p>
								      	</div>
								      </a-col>
								      <a-col :span="4">
								      	<span style="color:#333">购买数量</span><p>
								      			{{vo.num}}
								      		</p>
								      </a-col>
								      <a-col :span="4">-</a-col>
								      <a-col :span="4">
										<div class="order_comp_goods_price">
											<span style="color:#333">小计价格</span><p>
								      			￥ {{vo.price*vo.num}}
								      		</p>
								      	</div>
								      </a-col>
								    </a-row>
					    		</div>
	    					</li>
	    				</ul>
	    			</div>

	    			<div class="order_comp_btn">
	    				<div class="order_comp_count_price">总计价：<font style="color:#ca151e;font-size: 20px;">￥ {{total_price}}</font></div>
	    				<!-- <div class="order_balance">账号余额：￥ 200.00</div> -->
	    				<a-drawer
					      title="选择支付"
					      :placement="placement"
					      :closable="false"
					      @close="onClose"
					      :visible="visible"
					    >
					      <p>
							<a-radio-group @change="onChange" v-model="value" defaultChecked="true">
							    <a-radio :style="radioStyle" :value="1">微信支付</a-radio>
							    <a-radio :style="radioStyle" :value="2">支付宝支付</a-radio>
							  </a-radio-group>
					      </p>
					  
					      <p style="margin:20px 0;">余额剩余：￥ <font color="#ca151e">{{user_extend.balance}}</font></p>
					      <p><a-input v-model="pay_balance" placeholder="输入支付余额"/></p>
					      <div
					        :style="{
					          position: 'absolute',
					          left: 0,
					          bottom: 0,
					          width: '100%',
					          borderTop: '1px solid #e9e9e9',
					          padding: '10px 16px',
					          background: '#fff',
					          textAlign: 'right',
					        }"
					      >
					        <a-button type="danger"
					          :style="{marginRight: '8px',border:'1px solid #f5222d'}"
					          @click="onClose"
					        >
					          取消
					        </a-button>
					        <a-button @click="start_pay" :style="{border:'1px solid #f5222d'}" type="danger" >确定</a-button>
					      </div>
					    </a-drawer>
	    				<button @click="payOrder()">选择支付</button>
	    			</div>
	    		</div>
	    	</div>

	    </div>

	    <!-- 底部 -->
    	<shop_foot />
	</div>
</template>

<style>
.order{width: 1200px;margin: 0 auto;margin-top: 20px;padding-bottom: 50px;}
.order_comp{margin-top: 40px;}
.order_address_title{line-height: 25px;font-size: 14px;color:#333;font-weight: bold;margin-bottom: 20px;}
.order_address_list ul li{width:282.5px;margin-right: 10px;border:2px solid #efefef;height: 105px;display: block;box-sizing: border-box;float: left;padding:10px 20px; border-radius: 5px;position: relative;}
.order_address_list ul li i{position: absolute;font-size: 20px;left:259px;top:81px;}
.order_address_list ul li:hover{border:2px solid #ca151e;}
.order_address_list ul li:hover i{color:#ca151e;}
.order_address_list ul li.address_red{border:2px solid #ca151e;}
.order_address_list ul li.address_red i{color:#ca151e;}
.order_address_list ul li:nth-child(4){margin-right: 0px;}
.order_comp_goods_info ul{margin-top: 20px;}
.order_address_list_address{margin-top: 20px;}
.order_comp_goods{margin-top: 40px;}
.order_comp_dianp{font-size: 14px;margin-top: 12px;color:#ca151e;margin-bottom: 20px;border-top: 1px solid #efefef;padding-top: 12px;}
.order_comp_dianp i{font-size: 12px;font-weight: bold;}
.order_comp_goods_list{margin-bottom: 10px;margin-top: 10px;padding-bottom: 10px; border-bottom:1px solid #efefef;}
.order_comp_goods_avatar{float: left;margin-right: 12px;}
.order_comp_goods_title{height: 40px;overflow: hidden;width:115px;display: block;float: left;line-height: 40px;}
.order_comp_goods_attr{color:#999;}
.order_comp_goods_price{color:#ca151e;}
.order_comp_btn{float: right;margin-right: 50px;margin-bottom: 40px;}
.order_comp_count_price{margin-top: 20px;margin-bottom: 20px;}
.order_comp_btn button{border:none;background: #ca151e;padding: 8px 10px;font-size: 14px;color:#fff;border-radius: 3px;float: right;outline: none;}
.order_success_info{background:#f1f6fe;border:1px solid #d7e0ee;margin-top: 40px;}
.order_success_info:after{display: block;content:'';clear: both;}
.order_success_pic{color:#7ac256;float: left;}
.order_success_pic i{font-size: 3.4rem;margin-left: 20px;margin-right: 25px;}
.order_success_title{font-size:20px; margin-top: 18px;color:#333;}
.order_success_title p{font-size: 14px;}
.order_success_list{margin-top: 30px;}
.order_success_list_title{padding:20px 20px;background:#f5f5f5;border:1px solid #efefef;font-size: 14px;}
.order_success_list_order_no{border-bottom:1px solid #efefef;border-left:1px solid #efefef;border-right:1px solid #efefef;padding: 0 20px;line-height: 40px;font-weight: bold;}
.order_success_list_order ul li{padding:10px 20px;border-bottom:1px solid #efefef;border-left:1px solid #efefef;border-right:1px solid #efefef;}
.order_success_list .ant-radio-checked:after{border:1px solid #ca151e;}
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
			current:0,
			address:[],
			defaultAddress:0,
			goods_list:[],
			total_price:0,
			province:'',
			city:'',
			region:'',
			address_val:'',
			receive_name:'',
			receive_tel:'',
			visible:false,
			placement: 'left',
			radioStyle: {
		        display: 'block',
		        height: '30px',
		        lineHeight: '30px',
		      },
		    value:1,
		    user_extend:[],
		    user_info:[],
		    pay_balance:'',
		    pay_type:'1',
		    order_list:[],
		}
	},
	methods:{
		default_address:function(id){
			var _this = this;
			var _id = id;
		  	this.$post(this.ROOT_URL + "Shop/defaultGoodsAddress",{id:id}).then(function(res){
	  			if(res.code == 200){
	  				_this.defaultAddress = _id;
	  				_this.$message.success('设置默认地址成功！');
	  				_this.getAddress();
	  			}else{
	  				_this.$message.error('设置默认地址失败！');
	  				_this.getAddress();
	  			}
	  		});
		},
		getAddress:function(){
			var _this = this;
		  	this.$get(this.ROOT_URL + "Shop/getGoodsAddress").then(function(res){
		  		_this.address = res.data;
		  		if(_this.address.length==0){
			  		_this.$message.error('请先设置收货地址！');
			  		_this.$router.push({path:'/user/address'});
			  		return;
			  	}

			  	for(var i=0;i<_this.address.length;i++){
			  		if(_this.address[i].is_default == 1){
			  			_this.province = _this.address[i].province;
			  			_this.city = _this.address[i].city;
			  			_this.region = _this.address[i].region;
			  			_this.address_val = _this.address[i].address;
			  			_this.receive_tel = _this.address[i].phone;
			  			_this.receive_name = _this.address[i].name;
			  			return;
			  		}
			  	}
		  	});
		},
		submitOrder:function(){
			var _this = this;
			this.$post(this.ROOT_URL + "Shop/addOrder",{goods_list:this.goods_list,address:this.address_val,province:this.province,city:this.city,region:this.region,receive_name:this.receive_name,receive_tel:this.receive_tel}).then(function(res){
				if(res.code == 200){
					_this.$message.success('订单提交成功！');
					_this.current += 1;
					_this.order_list = res.data;
				}else{
					_this.$message.error('订单提交异常！');
				}

			});
		},
		payOrder:function(){
			this.visible = true
			this.getUserInfo();
		},
	    onClose() {
	      this.visible = false
	    },
	    onChange:function(e){
	    	this.pay_type = e.target.value;
	    },
	    start_pay:function(){
	    	var _this = this;
	    	var pay_balance = 0;
	    	if(this.pay_balance != ''){
	    		pay_balance = Math.abs(this.pay_balance);
	    	}
	    	if(pay_balance>this.user_extend.balance){
	    		this.$message.error('余额不足！请用其他支付方式！');
	    	}else{
	    		var isMobile = this.$isMobile()?'1':'0';
	    		this.$post(this.ROOT_URL + "Shop/pay",{pay_type:this.pay_type,balance:pay_balance,total_price:this.total_price,order:this.order_list,is_mobile:isMobile}).then(function(res){

	    			if(res.code == 500){
	    				_this.$message.error(res.message);
	    			}else{
	    				// 如果是支付宝
	    				if(_this.pay_type == 2){
	    					const div = document.createElement('div') // 创建div
							div.innerHTML = res; // 将返回的form 放入div
							document.body.appendChild(div);
							console.log(document.forms);
							document.forms[0].submit();
	    				}
	    				// 如果是微信
	    				if(_this.pay_type == 1){
	    					console.log('暂时没有数据！');
	    				}
	    				
	    			}
	    			
	    		});
	    	}
	    },
	    getUserInfo:function(){
	  		var _this = this;
			this.$get(this.ROOT_URL + "Shop/getUserInfos",).then(function(res){
				// console.log(res);
				_this.user_extend = res.user_extend;
				_this.user_info = res.user_info;
			});
	  	},
	},
	mounted(){

		if(this.current == 0){
			this.getAddress();
			var goods_list = this.$route.params.goods_list;
	  		this.goods_list = goods_list;
	  		if(goods_list == undefined){
		  		this.$message.error('下单异常，请重新下单！');
		  		this.$router.go(-1);
		  		return;
		  	}

		  	for(var i=0;i<goods_list.length;i++){
		  		this.total_price = this.total_price + goods_list[i].price*goods_list[i].buy_num;
		  	}
		}
	  	
	  	// console.log( goods_list,'====');
	}

}
</script>