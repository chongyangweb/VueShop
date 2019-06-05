<template>
	<div class="shop">
		<shop_header />
	    <shop_othor_nav />

	    <!-- 面包屑 -->
	    <mbx />

	    <div class="product_detail">
	    	<div class="product_detail_left">
	    		<div class="product_detail_img">
	    			<div class="mouseimg">
	    				<img :src="nowPic" alt="" width="350px" height="350px" @mousemove="imgMouse($event,nowPic)" @mouseleave="imgLeave">
	    				<div class="product_detail_bigpic" :style="product_detail_bigpic"><!-- <img :src="nowPic"  alt="" width="350px" height="350px" > --></div>
	    				<div class="product_detail_smallbg" :style="product_detail_smallbg"></div>
	    			</div>
	    		</div>
	    		<div class="product_detail_img_list">
	    			<ul>
	    				<li v-for="(v,key) in images" v-if="key<=3" @click="changePic(key)"><img :src="v" alt=""></li>
	    			</ul>
	    		</div>
	    	</div>

	    	<div class="product_detail_right">
	    		<div class="product_detail_right_title">
	    			<h3>{{goods_info.title}}</h3>
	    			<p>{{goods_info.sub_title}}</p>
	    		</div>
	    		<div class="product_detail_right_product_info">
	    			<ul>
	    				<li>商城价格： <span>￥{{price}}</span></li>
	    				<li>优惠信息： 该商家暂无任何优惠信息</li>
	    		<!-- 		<li>快递运费： 10元</li>
	    				<li>商品编码： 10110010133901</li> -->
	    			</ul>
	    		</div>
	    		<!-- 规格 -->
	    		<div class="product_detail_right_attr">
	    			<ul>
	    				<li v-for="v in goods_info.get_all_attr">{{v.name}}：
							<a-radio-group @change="onChange" >
						        <a-radio-button v-for="(vo,key) in (v.val).split(',')" :key="key" :value="v.id+','+vo">{{vo}}</a-radio-button>
						    </a-radio-group>
	    				</li>

	    			</ul>
	    		</div>
	    		<!-- 购买数量 -->
	    		<div class="product_detail_right_buynum">
	    			购买数量：<span @click="buy_num<=0?0:buy_num = buy_num-1">-</span><input type="text" name="num"  v-model="buy_num"><span @click="buy_num = buy_num+1">+</span> 库存 {{num}} 件
	    		</div>
	    		<!-- 购买按钮 -->
	    		<div class="product_detail_buybtn">
	    			<span @click="add_car()"><i class="icon iconfont">&#xe61b;</i>加入购物车</span>
	    			<span @click="buy()"><i class="icon iconfont">&#xe675;</i>立即购买</span>
	    		</div>
	    	</div>
	    </div>

	    <!-- 关联产品 和 商品详情 -->
	    <div class="product_detail2">
	    	<div class="produc_detail_glcp">
	    		<div class="product_detail_hot">
	    			<h3>热销产品</h3>
	    				<dl><nuxt-link to="/">
	    					<dt><img src="http://hw.yocit.com/Public/Uploads/thumb/5814897325cb2_146x146.jpg" width="56px" height="56px" alt=""></dt>
	    					<dd>荣耀畅玩6X 全网通标配版（铂光金）</dd>
	    					<dd>￥999</dd>
	    					<dd></dd></nuxt-link>
	    				</dl>
	    				<dl><nuxt-link to="/">
	    					<dt><img src="http://hw.yocit.com/Public/Uploads/thumb/5814897325cb2_146x146.jpg" width="56px" height="56px" alt=""></dt>
	    					<dd>荣耀畅玩6X 全网通标配版（铂光金）</dd>
	    					<dd>￥999</dd>
	    					<dd></dd></nuxt-link>
	    				</dl>
	    				<dl><nuxt-link to="/">
	    					<dt><img src="http://hw.yocit.com/Public/Uploads/thumb/5814897325cb2_146x146.jpg" width="56px" height="56px" alt=""></dt>
	    					<dd>荣耀畅玩6X 全网通标配版（铂光金）</dd>
	    					<dd>￥999</dd>
	    					<dd></dd></nuxt-link>
	    				</dl>
	    				<dl><nuxt-link to="/">
	    					<dt><img src="http://hw.yocit.com/Public/Uploads/thumb/5814897325cb2_146x146.jpg" width="56px" height="56px" alt=""></dt>
	    					<dd>荣耀畅玩6X 全网通标配版（铂光金）</dd>
	    					<dd>￥999</dd>
	    					<dd></dd></nuxt-link>
	    				</dl>
	    				<dl><nuxt-link to="/">
	    					<dt><img src="http://hw.yocit.com/Public/Uploads/thumb/5814897325cb2_146x146.jpg" width="56px" height="56px" alt=""></dt>
	    					<dd>荣耀畅玩6X 全网通标配版（铂光金）</dd>
	    					<dd>￥999</dd>
	    					<dd></dd></nuxt-link>
	    				</dl>
	    				<dl><nuxt-link to="/">
	    					<dt><img src="http://hw.yocit.com/Public/Uploads/thumb/5814897325cb2_146x146.jpg" width="56px" height="56px" alt=""></dt>
	    					<dd>荣耀畅玩6X 全网通标配版（铂光金）</dd>
	    					<dd>￥999</dd>
	    					<dd></dd></nuxt-link>
	    				</dl>
	    		</div>

	    		<div class="product_detail_hot">
	    			<h3><span><i class="icon iconfont">&#xe603;</i></span>最近游览过的产品</h3>
	    				<dl><nuxt-link to="/">
	    					<dt><img src="http://hw.yocit.com/Public/Uploads/thumb/5814897325cb2_146x146.jpg" width="56px" height="56px" alt=""></dt>
	    					<dd>荣耀畅玩6X 全网通标配版（铂光金）</dd>
	    					<dd>￥999</dd>
	    					</nuxt-link>
	    				</dl>
	    				<dl><nuxt-link to="/">
	    					<dt><img src="http://hw.yocit.com/Public/Uploads/thumb/5814897325cb2_146x146.jpg" width="56px" height="56px" alt=""></dt>
	    					<dd>荣耀畅玩6X 全网通标配版（铂光金）</dd>
	    					<dd>￥999</dd>
	    					</nuxt-link>
	    				</dl>
	    				<dl><nuxt-link to="/">
	    					<dt><img src="http://hw.yocit.com/Public/Uploads/thumb/5814897325cb2_146x146.jpg" width="56px" height="56px" alt=""></dt>
	    					<dd>荣耀畅玩6X 全网通标配版（铂光金）</dd>
	    					<dd>￥999</dd>
	    					</nuxt-link>
	    				</dl>
	    				<dl><nuxt-link to="/">
	    					<dt><img src="http://hw.yocit.com/Public/Uploads/thumb/5814897325cb2_146x146.jpg" width="56px" height="56px" alt=""></dt>
	    					<dd>荣耀畅玩6X 全网通标配版（铂光金）</dd>
	    					<dd>￥999</dd>
	    					</nuxt-link>
	    				</dl>
	    				<dl><nuxt-link to="/">
	    					<dt><img src="http://hw.yocit.com/Public/Uploads/thumb/5814897325cb2_146x146.jpg" width="56px" height="56px" alt=""></dt>
	    					<dd>荣耀畅玩6X 全网通标配版（铂光金）</dd>
	    					<dd>￥999</dd>
	    					</nuxt-link>
	    				</dl>
	    				<dl><nuxt-link to="/">
	    					<dt><img src="http://hw.yocit.com/Public/Uploads/thumb/5814897325cb2_146x146.jpg" width="56px" height="56px" alt=""></dt>
	    					<dd>荣耀畅玩6X 全网通标配版（铂光金）</dd>
	    					<dd>￥999</dd>
	    					</nuxt-link>
	    				</dl>
	    		</div>
	    	</div>
	    	<div class="product_detail_info">
	    		<a-tabs defaultActiveKey="1" >
				    <a-tab-pane tab="商品详情" key="1" v-html="goods_info.content"></a-tab-pane>
				    <a-tab-pane tab="用户评价" key="2" forceRender>

					<a-list itemLayout="vertical" :split='true' >
						<a-list-item v-for="v in goods_comment">
							<a-comment>
								<a slot="author">{{v.get_user.nickname}}</a>
							    <a-avatar
							      :src="v.get_user.avatar"
							      :alt="v.get_user.nickname"
							      slot="avatar"
							    />
							    <p slot="content">{{v.content}}</p>
							    <a-tooltip slot="datetime" :title="v.star+'星好评'">
							      <span>{{v.add_time|formatDate}}</span>
							    </a-tooltip>

							    <!-- 客服回復 -->
							    <a-comment v-show="v.get_rec != null">
							    	<a slot="author">店家小二</a>
							    	<a-avatar
								      src="/images/xiaoer.jpg"
								      alt="店家小二"
								      slot="avatar"
								    />
								    <p slot="content">{{v.get_rec.content}}</p>
								    <a-tooltip slot="datetime" title="温馨回复！">
								      <span>温馨回复！</span>
								    </a-tooltip>
							    </a-comment>
							</a-comment>
						</a-list-item>
					</a-list>
					<div><a-pagination :defaultCurrent="1" @change="pageChange" :current="current" :defaultPageSize="30" :total="page.count" /></div>
				    </a-tab-pane>
				    <a-tab-pane tab="售后服务" key="3" v-html="goods_server"></a-tab-pane>
				</a-tabs>
	    	</div>
	    </div>

    	<!-- 底部 -->
    	<shop_foot />
	</div>
</template>


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
  data () {
    return {
      value: [],
      goods_info:[],
      page:[],
      limit:'0',
      current:1,
      price:0,
      num:0,
      buy_num:1,
      spec_point:0,
      chose_attr:[],
      nowPic:'',
      images:[],
      product_detail_bigpic:'',
      product_detail_smallbg:'',
      goods_server:'',
      goods_comment:[],
    }
  },
  methods: {
    onChange (e) {
      var arr = e.target.value.split(',');
      if(this.value.length>0){
      	var is_push = false;
      	for(var i=0;i<this.value.length;i++){
	      	if(arr[0] == this.value[i][0]){
	      		this.value[i][1] = arr[1];
	      		is_push = true;
	      	}
	    }

	    if(!is_push){
	    	this.value.push(arr);
	    }
      }else{
      	this.value.push(arr);
      }


      var skuCurr = [];
      if(this.goods_info.get_all_attr.length == this.value.length){
      	var skuDo = false;
      	for(var i=0;i<this.goods_info.get_all_sku.length;i++){
      		var skuArr = this.goods_info.get_all_sku[i].name.split(',');
      		for(var a=0;a<this.value.length;a++){
      			if(skuArr.indexOf(this.value[a][1])== -1){
      				skuDo = false;
      				break;
      			}else{
      				skuDo = true;
      			}
      		}
      		// console.log(skuDo);
      		if(skuDo){
      			skuCurr = this.goods_info.get_all_sku[i];
      			this.spec_point = i;
      		}

      	}
      	// console.log(skuCurr);
      	this.price = skuCurr.price;
      	this.num = skuCurr.num;
      	this.chose_attr = skuCurr;
      	this.getGoodsInfo();
      }
      // console.log(arr,this.value);
      // console.log(`checked = ${e.target.value}`)
    },
    add_car:function(){
    	var _this = this;
    	if(this.goods_info.get_all_attr.length != this.value.length){
    		this.$message.error('请选择规格属性！');
    		return;
    	}

    	this.$post(this.ROOT_URL + "Shop/addGoodsCar",{sku:this.chose_attr,buy_num:this.buy_num,goods_id:this.$route.params.id,price:this.price}).then(function(res){
    		if(res.code == 500){
    			_this.$router.push({path:'/user/login'});
    		}
    		if(res.code == 200){
    			_this.$message.success('购物车添加成功！');
    			_this.getGoodsInfo();
    		}

    		if(res.code == 401){
    			_this.$message.error(res.message);
    			_this.getGoodsInfo();
    		}
    	});
    },
    getGoodsInfo:function(){
    	var _this = this;
	  	var id = this.$route.params.id;
	  	this.$post(this.ROOT_URL + "Shop/getGoodsInfo",{id:id}).then(function(res){
	  		_this.goods_info = res.goods_info;
	  		_this.price = _this.goods_info.get_all_sku.length != 0?_this.goods_info.get_all_sku[_this.spec_point].price:_this.goods_info.price;
	  		_this.num = _this.goods_info.get_all_sku.length != 0?_this.goods_info.get_all_sku[_this.spec_point].num:_this.goods_info.num;
	  		_this.images = _this.goods_info.images.split(',');
	  		_this.nowPic = _this.images[0];
	  		// var images = _this.goods_info.images;
	  	});
    },
    changePic:function(key){
    	this.nowPic = this.images[key];
    },
    imgMouse:function(e,bigPic){
    	// this.product_detail_smallbg = 'display:block;top:'+e.offsetY+'px;left:'+e.offsetX+'px;';
    	// console.log(this.product_detail_smallbg);
    	this.product_detail_bigpic = 'background-repeat:no-repeat;display:block;background:url('+bigPic+');background-size:700px 700px;background-position:-'+(e.offsetX*2-100)+'px -'+(e.offsetY*2-100)+'px;';//background-position:'+e.offsetX;
    	// console.log(this.product_detail_bigpic)
    	// console.log(e);

    },
    imgLeave:function(){
    	this.product_detail_bigpic = 'display:none;';
    },
    buy:function(){
    	this.goods_info.get_all_sku = [];
    	this.goods_info.get_all_attr = [];
    	var goods_list = [{sku:this.chose_attr,buy_num:this.buy_num,goods_id:this.$route.params.id,price:this.price,goods_info:this.goods_info}];
    	// console.log(goods_list);
    	this.$router.push({name:'order',params:{goods_list:goods_list}});
    },
    getGoodsServer:function(){
    	var _this = this;
	  	this.$get(this.ROOT_URL + "Shop/getGoodsServer").then(function(res){
	  		_this.goods_server = res.goods_server.content;
	  	});
    },
    getGoodsComment:function(){
    	var _this = this;
	  	var id = this.$route.params.id;
	  	this.$post(this.ROOT_URL + "Shop/getGoodsComment",{id:id,limit:this.page.limit,page:this.current}).then(function(res){
	  		_this.goods_comment = res.goods_comment;
			_this.page = res.page;
	  	});
    },
    pageChange:function(current){
  		this.current = current;
  		this.getGoodsComment();
  		console.log(current);
  	},
  },
  created(){
  	this.getGoodsInfo();
  	this.getGoodsServer();
  	this.getGoodsComment();
  }

};
</script>

<style>
.product_detail{border:1px solid #efefef;width: 1200px;margin:0 auto;margin-bottom: 20px;}
.product_detail2{width: 1200px;margin:0 auto;margin-bottom: 20px;}
.product_detail:after{clear: both;display: block;content:'';}
.product_detail2:after{clear: both;display: block;content:'';}
.product_detail_left{width: 540px;border-right: 1px solid #efefef;height: 570px;float: left;}
.product_detail_img{padding-top: 45px;padding-bottom: 15px;}
.product_detail_bigpic{display:none;position:absolute;left:350px;width:200px;height:200px;top:0;z-index:998;}
.product_detail_smallbg{width:50px;height:50px;background:#000;display:none;position:absolute;}
.mouseimg{width:350px;height:350px;position:relative;display:block;margin:0 auto;}
.product_detail_img .mouseimg img{width: 350px;height: 350px;margin:0 auto;display: block;}
.product_detail_img_list ul{margin-top: 15px;margin-left: 70px;}
.product_detail_img_list ul li{width: 90px;height: 90px;border: 1px solid #efefef;padding-top: 12px;float: left;margin-right: 12px;}
.product_detail_img_list ul li img{width: 64px;height: 64px;margin:0 auto;display: block;}
.product_detail_img_list ul li img.borders{border:1px solid #e01d20;}
.product_detail_img_list ul li:hover{border:1px solid #e01d20;}
.product_detail_right{float: left;width: 658px;box-sizing: border-box;}
.product_detail_right_title{border-bottom: 1px solid #efefef;padding-bottom: 20px;}
.product_detail_right_title h3{height: 28px;font-size: 20px;line-height: 28px;color:#333;font-weight: bold;margin-top: 20px;overflow: hidden;padding-right: 20px;padding-left: 20px;}
.product_detail_right_title p{font-size: 16px;color:#e01d20;overflow: hidden;padding-right: 20px;padding-left: 20px;}
.product_detail_right_product_info{margin-top: 15px;border-bottom: 1px solid #efefef;padding-bottom: 25px;}
.product_detail_right_product_info ul li{font-size: 16px;padding-left: 20px;line-height: 30px;}
.product_detail_right_product_info ul li:nth-child(1) span{font-size: 24px;color:#e01d20;}
.product_detail_right_product_info ul li:nth-child(2){color:#e01d20;}
.product_detail_right_attr{margin-top: 20px;border-bottom: 1px solid #efefef;min-height: 80px;}
.product_detail_right_attr ul li{font-size: 16px;padding-left: 20px;margin-bottom: 20px;}
.product_detail_right_attr ul li .ant-radio-button-wrapper-checked{border-color: #e01d20;color:#e01d20;box-shadow:-1px 0 0 0 #e01d20;}
.product_detail_right_attr ul li  .ant-radio-button-wrapper:hover{color:#e01d20;}
.product_detail_right_buynum{margin-top: 20px;margin-left: 20px;font-size: 16px;}
.product_detail_right_buynum input{border:none;border:1px solid #efefef;height: 27px;margin:0 15px;width: 60px;text-align: center;}
.product_detail_right_buynum span{border:1px solid #efefef;padding: 4px 10px;}
.product_detail_buybtn{margin-top: 20px;margin-left: 20px;}
.product_detail_buybtn span{line-height: 40px;font-size: 16px;color:#fff;background: #e01d20;height: 40px;display: block;float: left;margin-right: 20px;padding: 0 10px;position: relative;border-radius: 4px;}
.product_detail_buybtn i{font-size: 16px;margin-right: 8px;line-height: 40px;}
.product_detail_buybtn span:nth-child(1) i{font-size: 20px;line-height: 40px;display: inline-block;position: absolute;left: 16px;}
.product_detail_buybtn span:nth-child(1){padding-left: 40px;padding-right: 20px;}
.product_detail_buybtn span:nth-child(2){padding-left: 30px;padding-right: 30px;background: #ff5c14;}
.produc_detail_glcp{width: 238px;float: left;margin-right: 20px;}
.product_detail_hot{border:1px solid #efefef;margin-bottom: 20px;}
.product_detail_hot h3{background: #f1f1f1;font-size: 14px;box-sizing: border-box;padding-left: 20px;line-height: 48px;color:#333;font-weight: bold;}
.product_detail_hot h3 span {float: right;line-height: 48px;margin-right: 20px;}
.product_detail_hot dl{padding:15px 10px 15px 15px;position: relative;border-top: 1px solid #efefef;display: block;}
.product_detail_hot dl:after{display: block;clear: both;content:'';}
.product_detail_hot dl dt{float: left;width:56px;height: 56px; margin-right: 10px;}
.product_detail_hot dl dd:nth-child(3){color:#e01d20;}
.product_detail_hot dl dd:nth-child(2){height: 36px;overflow: hidden;display: block;}
.product_detail_hot dl dd:nth-child(4){position: absolute;top: 0;left: 0;}
.product_detail_hot dl:nth-child(2) dd:nth-child(4){background: url('../../assets/hsj.png');width: 23px;height: 23px;color: #fff;padding-left: 3px;}
.product_detail_hot dl:nth-child(2) dd:nth-child(4):after{clear: both;display: block;content:'1';}
.product_detail_hot dl:nth-child(3) dd:nth-child(4){background: url('../../assets/hsj.png');width: 23px;height: 23px;color: #fff;padding-left: 3px;}
.product_detail_hot dl:nth-child(3) dd:nth-child(4):after{clear: both;display: block;content:'2';}
.product_detail_hot dl:nth-child(4) dd:nth-child(4){background: url('../../assets/hsj.png');width: 23px;height: 23px;color: #fff;padding-left: 3px;}
.product_detail_hot dl:nth-child(4) dd:nth-child(4):after{clear: both;display: block;content:'3';}
.product_detail_hot dl:nth-child(5) dd:nth-child(4){background: url('../../assets/huisj.png');width: 23px;height: 23px;color: #fff;padding-left: 3px;}
.product_detail_hot dl:nth-child(5) dd:nth-child(4):after{clear: both;display: block;content:'4';}
.product_detail_hot dl:nth-child(6) dd:nth-child(4){background: url('../../assets/huisj.png');width: 23px;height: 23px;color: #fff;padding-left: 3px;}
.product_detail_hot dl:nth-child(6) dd:nth-child(4):after{clear: both;display: block;content:'5';}
.product_detail_hot dl:nth-child(7) dd:nth-child(4){background: url('../../assets/huisj.png');width: 23px;height: 23px;color: #fff;padding-left: 3px;}
.product_detail_hot dl:nth-child(7) dd:nth-child(4):after{clear: both;display: block;content:'6';}
.product_detail_info{width: 940px;float: left;}
.product_detail_info .ant-tabs-nav .ant-tabs-tab-active{color:#ca151e;}
.product_detail_info .ant-tabs-tab:hover{color:#ca151e;}
.product_detail_info .ant-tabs-ink-bar{background-color:#ca151e;}
.product_detail_info .ant-tabs-nav .ant-tabs-tab-active{color:#ca151e;}
.product_detail_info .ant-tabs-nav .ant-tabs-tab:hover{color:#ca151e;}
.product_detail_info .ant-tabs-ink-bar{background:#ca151e;}
.product_detail_info .anticon{vertical-align: -0.7em;}
</style>