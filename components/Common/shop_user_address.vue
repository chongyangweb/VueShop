<template>
	<div class="user_right_content">
		<div class="user_buy_car_list">
			<div class="user_buy_car_list_title">
				我的收貨地址
			</div>
			<div class="user_buy_car_content">
			<a-tabs defaultActiveKey="1" v-model="defaultActiveKey" @change="callback">
			    <a-tab-pane tab="收貨地址" key="1">

					<a-list
					    class="demo-loadmore-list"
					    itemLayout="horizontal"
					    :dataSource="data"
					  >
					    
					    <a-list-item slot="renderItem" slot-scope="item, index">
					      <!-- <a slot="actions"></a> -->
					      <a slot="actions" @click="defaultAddress(item.id)" v-if="item.is_default==0">设置默认地址</a>
					      <a slot="actions" @click="defaultAddress(item.id)" v-if="item.is_default==1"><font color="#ca151e"><i class="icon iconfont">&#xeb96;</i> &nbsp;默认地址</font></a>
					      <!-- <a slot="actions">修改</a> -->
					      <a slot="actions" @click="delAddress(item.id)">刪除</a>
					      <a-list-item-meta
					        :description="item.province == item.city?item.city+item.region+item.address+'  '+item.phone:item.province+item.city+item.region+item.address+'  '+item.phone"
					      >
					        <a slot="title" href="#">{{item.name}}</a>
					        <a-avatar slot="avatar" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2652273206,2738659478&fm=26&gp=0.jpg" />
					      </a-list-item-meta>
					      <!-- <div>{{item.address}}</div> -->
					      <!-- <div>电话：{{item.phone}}</div> -->
					    </a-list-item>
					  </a-list>

			    </a-tab-pane>
			    <a-tab-pane tab="添加地址" key="2" forceRender>
					<a-form
					    @submit="handleSubmit">

						<a-form-item
					      label="姓名"
					      :label-col="{ span: 3 }"
					      :wrapper-col="{ span: 12 }">
					      <a-input v-model="name"/>
					    </a-form-item>
					    <a-form-item
					      label="电话"
					      :label-col="{ span: 3 }"
					      :wrapper-col="{ span: 12 }">
					      <a-input v-model="phone" />
					    </a-form-item>
					    <a-form-item
					      label="邮编"
					      :label-col="{ span: 3 }"
					      :wrapper-col="{ span: 12 }">
					      <a-input v-model="zip_code" />
					    </a-form-item>
					    <a-form-item
					      label="详细地址"
					      :label-col="{ span: 3 }"
					      :wrapper-col="{ span: 12 }">
					      <a-cascader style="width: 70%;" :options="options" v-model="address_city" placeholder="选择您的城市" />
					    </a-form-item>
					    <a-form-item
					      label="详细地址"
					      :label-col="{ span: 3 }"
					      :wrapper-col="{ span: 12 }">
					      <a-input v-model="address_detail" />
					    </a-form-item>
					    <a-form-item :wrapper-col="{ span: 12, offset: 3 }" >
					      <a-button type="primary" @click="addAddress()" >
					        添加地址
					      </a-button>
					    </a-form-item>
					</a-form>
			    </a-tab-pane>
			 </a-tabs>
			</div>
		</div>
	</div>
</template>

<style>
.user_buy_car_list{border:1px solid #efefef;}
.user_buy_car_list_title{line-height: 40px;padding-left: 20px;box-sizing:border-box;border-bottom: 1px solid #efefef;font-size: 14px;background: #f3f3f3;margin-bottom: 20px;}
.user_buy_car_content{padding: 0px 30px;}
.user_buy_car_content .user_shop_name{margin-bottom: 20px;}
.user_buy_car_content .user_shop_name a{color:#ca151e;}
.user_buy_car_content .user_shop_name i{margin-right: 6px;font-size: 12px;}
.user_buy_car_content .ant-tabs-nav .ant-tabs-tab-active{color:#ca151e;}
.user_buy_car_content .ant-tabs-nav .ant-tabs-tab:hover{color:#ca151e;}
.user_buy_car_content .ant-tabs-ink-bar{background:#ca151e;}
.ant-cascader-menus{width:200px; }
.user_buy_car_content .ant-list-item-meta-content{width: 600px;}
/*.user_buy_car_content .ant-checkbox{float: left;}*/
</style>

<script>
	// let maps = require("./maps")
	const list = require('china-location/dist/location.json');
	const ChinaLocation = require('china-location');
	const location = new ChinaLocation(list);
	const defaultLocation = location.getCurrentAddress();
	
	const maps = [];
	var prov = {};
	var city= {};
	for(var i=0;i<location.currentProvinces.length;i++){
		prov = {id:location.currentProvinces[i].code,label:location.currentProvinces[i].name,value:location.currentProvinces[i].name};
		var cityChange = location.changeProvince(location.currentProvinces[i].code);
		prov.children = [];
		for(var a=0;a<location.currentCities.length;a++){
			city = {id:location.currentCities[a].code,label:location.currentCities[a].name,value:location.currentCities[a].name};
			city.children = [];

			for(var b=0;b<location.currentDistricts.length;b++){
				city.children.push({id:location.currentDistricts[b].code,label:location.currentDistricts[b].name,value:location.currentDistricts[b].name});
			}

			prov.children.push(city);
		}
		maps.push(prov);
	}
	// console.log(maps);
	// console.log(location,defaultLocation);

	export default {
	  
	  data(){
			return{
				checkedList:[],
				plainOptions:['a','b','c'],
				checkAll:false,
				indeterminate: true,
				data:[],
				options:maps, // 地区
				defaultActiveKey:'1',
				name:'',
				phone:'',
				zip_code:'',
				address_detail:'',
				address_city:[],
				address:'',
			}
	  },
	  methods:{
	  	onChange:function(e){
	  		this.indeterminate = !!this.checkedList.length && (this.checkedList.length < this.plainOptions.length)
      		this.checkAll = this.checkedList.length === this.plainOptions.length
      		console.log(this.checkedList);
	  	},
	  	onChangeAll:function(e){
	  		var _this = this;
	  		Object.assign(this, {
	  			checkedList: e.target.checked ? _this.plainOptions : [],
		        indeterminate: false,
		        checkAll: e.target.checked,
		      })
	  		console.log(this.checkedList);
	  	},
	  	callback:function(key){

	  	},
	  	handleSubmit:function(e){

	  	},
	  	addAddress:function(){
	  		var _this = this;
	  		if(this.name=='' || this.phone=='' || this.address_detail == ''){
	  			return this.$message.error('请认真填写！');
	  		}

	  		if(this.address_city.length<=0){
	  			return this.$message.error('请认真填写地址！');
	  		}

	  		this.address = this.address_detail;
	  		var province = this.address_city[0];
	  		var city = this.address_city[1];
	  		var region = this.address_city[2];
	  		this.$post(this.ROOT_URL + "Shop/addGoodsAddress",{name:this.name,phone:this.phone,zip_code:this.zip_code,address:this.address,province:province,city:city,region:region}).then(function(res){
	  			if(res.code == 200){
	  				_this.$message.success('添加地址成功！');
	  				_this.defaultActiveKey = '1';
	  				_this.getData();
	  			}else{
	  				_this.$message.error('添加失败！');
	  			}
	  		});
	  	},
	  	delAddress(id){
	  		var _this = this;
	  		this.$post(this.ROOT_URL + "Shop/delGoodsAddress",{id:id}).then(function(res){
	  			if(res.code == 200){
	  				_this.$message.success('删除地址成功！');
	  				_this.getData();
	  			}else{
	  				_this.$message.error('删除失败！');
	  			}
	  		});
	  	},
	  	defaultAddress(id){
	  		var _this = this;
	  		this.$post(this.ROOT_URL + "Shop/defaultGoodsAddress",{id:id}).then(function(res){
	  			if(res.code == 200){
	  				_this.$message.success('设置默认地址成功！');
	  				_this.getData();
	  			}else{
	  				_this.$message.error('设置默认地址失败！');
	  				_this.getData();
	  			}
	  		});
	  	},
	  	getData(){
	  		var _this = this;
		  	this.$get(this.ROOT_URL + "Shop/getGoodsAddress").then(function(res){
		  		_this.data = res.data;
		  		console.log(res);
		  	});
	  	},
	  },
	  mounted(){
	  	this.getData();
	  }
	}
</script>