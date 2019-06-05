<template>
	<div class="user_right_content">
		<div class="user_buy_car_list">
			<div class="user_buy_car_list_title">
				购物车
			</div>
			<div class="user_buy_car_content">
				
				<div class="user_shop_car_js">
					<a-checkbox @change="onChangeAll" :indeterminate="indeterminate" :checked="checkAll">
					</a-checkbox>
					<span style="width:50px">全选</span> 
					<span style="width:300px;margin-right:440px;margin-left:40px;">商品信息</span> <span style="margin-right:60px;">价格</span> <span  style="margin-right:85px;">数量</span> <span>操作</span>
				</div>
				
				<a-checkbox-group @change="onChange" v-model="checkedList" >
				<div v-for="(v,key) in goodsCarList">
				<div class="user_shop_name">
					<nuxt-link to="/"><i class="icon iconfont">&#xe675;</i>{{key}}</nuxt-link>
				</div>
				<ul v-for="vo in v">
					<li><a-checkbox :value="vo.id">
						<img :src="vo.get_goods_info.images.split(',')[0]" width="50px" height="50px">
					</a-checkbox>
					<div class="user_buy_car_content_title"><nuxt-link :to="'/goods/'+vo.goods_id">{{vo.get_goods_info.title}}</nuxt-link></div>
					<div class="user_buy_car_content_guige">{{vo.val.name}}</div>
					<div class="user_buy_car_content_price">￥ {{vo.price}}</div>
					<div class="user_buy_car_content_num"><a-input type="number" defaultValue="1" v-model="vo.buy_num" @change="inputChange($event,vo.id)" /></div>
					<div class="user_buy_car_content_do" @click="delCar(vo.id)">移除</div>

					</li>
				</ul>
				</div>
				</a-checkbox-group>
				<div class="user_buy_car_jiesuan">
					<!-- <div class="user_buy_car_jiesuan_btn"><button style="background:#ca151e;border:none;color:#fff;padding:0 20px;border-radius: 4px;height:30px;line-height:30px;outline: none">全部删除</button></div> -->
					<div class="user_buy_car_jiesuan_btn"><button style="background:#ca151e;border:none;color:#fff;padding:0 20px;border-radius: 4px;height:30px;line-height:30px;outline: none" @click="jiesuan()">结算</button></div>
					<div class="user_buy_car_jiesuan_price">合计 <font color="#ca151e">￥ {{countPrice}}</font></div>
					<div class="user_buy_car_jiesuan_num">已选商品<font color="#ca151e"> {{countGoods}} </font>件</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.user_buy_car_list{border:1px solid #efefef;}
.user_buy_car_list_title{line-height: 40px;padding-left: 20px;box-sizing:border-box;border-bottom: 1px solid #efefef;font-size: 14px;background: #f3f3f3;margin-bottom: 20px;}
.user_buy_car_content{padding: 0px 30px;}
.user_buy_car_content .user_shop_name{margin-bottom: 20px;font-size: 12px;}
.user_buy_car_content .user_shop_name a{color:#ca151e;}
.user_buy_car_content .user_shop_name i{margin-right: 6px;font-size: 12px;}
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
/*.user_buy_car_content .ant-checkbox{float: left;}*/
</style>

<script>
	export default {
	  
	  data(){
			return{
				checkedList:[],
				plainOptions:[],
				checkAll:false,
				indeterminate: true,
				goodsCarList:[],
				countPrice:0,
				countGoods:0,
				list:[],
				jiesuanData:[],
				jiesuanDelCar:[], // 结算删除指定购物车
			}
	  },
	  methods:{
	  	onChange:function(e){
	  		this.indeterminate = !!this.checkedList.length && (this.checkedList.length < this.plainOptions.length)
      		this.checkAll = this.checkedList.length === this.plainOptions.length
      		// console.log(this.checkedList);
	  		this.countGoods = this.checkedList.length;
	  		this.countPrice = 0;
	  		this.jiesuanData = [];
	  		this.jiesuanDelCar = [];
	  		for(var a=0;a<this.checkedList.length;a++){
	  			for(var i=0;i<this.list.length;i++){

		  			if(this.list[i].id == this.checkedList[a]){
		  				this.jiesuanDelCar[i] = this.list[i].id;
		  				this.countPrice = this.countPrice + this.list[i].price*this.list[i].buy_num;
		  				// var goods_infos = [];
		  				this.jiesuanData[i] = [];
		  				this.jiesuanData[i] = {sku:this.list[i].val,buy_num:this.list[i].buy_num,goods_id:this.list[i].get_goods_info.id,price:this.list[i].price,goods_info:this.list[i].get_goods_info};

		  			}
		  			// _this.countPrice = _this.countPrice+res.data.list[i].price*res.data.list[i].buy_num;
		  		}
	  		}

	  		
	  	},
	  	onChangeAll:function(e){
	  		var _this = this;
	  		Object.assign(this, {
	  			checkedList: e.target.checked ? _this.plainOptions : [],
		        indeterminate: false,
		        checkAll: e.target.checked,
		      })
	  		// console.log(this.checkedList);
	  		this.countGoods = this.checkedList.length;
	  		this.countPrice = 0;
	  		this.jiesuanData = [];
	  		this.jiesuanDelCar = [];
	  		for(var a=0;a<this.checkedList.length;a++){
	  			for(var i=0;i<this.list.length;i++){
		  			if(this.list[i].id == this.checkedList[a]){
		  				this.jiesuanDelCar[i] = this.list[i].id;
		  				this.countPrice = this.countPrice + this.list[i].price*this.list[i].buy_num;
		  				this.jiesuanData[i] = [];
		  				this.jiesuanData[i] = {sku:this.list[i].val,buy_num:this.list[i].buy_num,goods_id:this.list[i].get_goods_info.id,price:this.list[i].price,goods_info:this.list[i].get_goods_info};
		  			}
		  			// _this.countPrice = _this.countPrice+res.data.list[i].price*res.data.list[i].buy_num;
		  		}
	  		}
	  		// console.log(this.checkedList,this.jiesuanData,'============');

	  	},
	  	delCar:function(id){
	  		var _this = this;
		  	this.$post(this.ROOT_URL + "Shop/delGoodsCar",{id:id}).then(function(res){
		  		if(res.code == 200){
		  			_this.$message.success('删除成功！');
		  			_this.getData();
		  		}
		  	});
	  	},
	  	getData:function(){
	  		var _this = this;
		  	this.$get(this.ROOT_URL + "Shop/getGoodsCarList").then(function(res){
		  		_this.goodsCarList = res.data.data;
		  		// console.log(res.data.data);
		  		for(var i=0;i<res.data.list.length;i++){
		  			_this.plainOptions.push(res.data.list[i].id);
		  			_this.list = res.data.list;
		  			// _this.countPrice = _this.countPrice+res.data.list[i].price*res.data.list[i].buy_num;
		  		}
		  	});
	  	},
	  	inputChange:function(e,id){
	  		var num = e.target.valueAsNumber;
	  		var _this = this;
	  		console.log(e.target.valueAsNumber,id);
	  		if(num<=0){
	  			this.$message.error('数量非法！');
	  		}else{
	  			this.$post(this.ROOT_URL + "Shop/editGoodsCarNum",{id:id,num:num}).then(function(res){
	  				if(res.code == 500){
	  					_this.$message.error(res.message);
	  				}else{
	  					_this.$message.success(res.message);
	  				}
	  				_this.getData();
	  			});
	  		}

	  	},
	  	jiesuan:function(){
	  		var _this = this;
	  		if(this.jiesuanData.length<=0){
	  			_this.$message.error('购物车没有商品！');
	  			return;
	  		}
	  		this.$post(this.ROOT_URL + "Shop/delGoodsCarOrder",{id:this.jiesuanDelCar}).then(function(res){
		  		if(res.code == 200){
		  			_this.$router.push({name:'order',params:{goods_list:_this.jiesuanData}});
		  		}
		  	});
	  		
	  	},
	  },
	  mounted(){
	  	this.getData();
	  }
	}
</script>