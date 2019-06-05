<template>
	<div class="user_right_content">
		<div class="user_buy_car_list">
			<div class="user_buy_car_list_title">
				我的收貨地址
			</div>
			<div class="user_buy_car_content">
			<a-tabs defaultActiveKey="1" @change="callback">
			    <a-tab-pane tab="收貨地址" key="1">

					<a-list
					    class="demo-loadmore-list"
					    itemLayout="horizontal"
					    :dataSource="data"
					  >
					    
					    <a-list-item slot="renderItem" slot-scope="item, index">
					      <a slot="actions">修改</a>
					      <a slot="actions">刪除</a>
					      <a-list-item-meta
					        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
					      >
					        <a slot="title" href="https://vue.ant.design/">{{item.name.last}}</a>
					        <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
					      </a-list-item-meta>
					      <div>电话：15073010917</div>
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
					      <a-input/>
					    </a-form-item>
					    <a-form-item
					      label="电话"
					      :label-col="{ span: 3 }"
					      :wrapper-col="{ span: 12 }">
					      <a-input/>
					    </a-form-item>
					    <a-form-item
					      label="邮编"
					      :label-col="{ span: 3 }"
					      :wrapper-col="{ span: 12 }">
					      <a-input/>
					    </a-form-item>
					    <a-form-item
					      label="详细地址"
					      :label-col="{ span: 3 }"
					      :wrapper-col="{ span: 12 }">
					      <a-cascader style="width: 70%;" :options="options" placeholder="选择您的城市" />
					    </a-form-item>
					    <a-form-item
					      label="详细地址"
					      :label-col="{ span: 3 }"
					      :wrapper-col="{ span: 12 }">
					      <a-input/>
					    </a-form-item>
					    <a-form-item :wrapper-col="{ span: 12, offset: 3 }" >
					      <a-button type="primary" >
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
	console.log(maps);
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
	  	callback:function(){

	  	},
	  	handleSubmit:function(e){

	  	},
	  },
	}
</script>