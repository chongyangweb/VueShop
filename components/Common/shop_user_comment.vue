<template>
	<div class="user_right_content">
		<div class="user_buy_car_list">
			<div class="user_buy_car_list_title">
				商品评价
			</div>

			<div class="user_info_block">
				
				<a-form>
				    <a-form-item
				      label="评星"
				      :label-col="{ span: 5 }"
				      :wrapper-col="{ span: 12 }"
				    >
				      <a-rate v-model='star'/>
				    </a-form-item>

				    <a-form-item
				      label="评价内容"
				      :label-col="{ span: 5 }"
				      :wrapper-col="{ span: 12 }"
				    >
				      <a-textarea placeholder="输入您的评价！" v-model="content" :autosize="{ minRows: 2, maxRows: 6 }" />
				    </a-form-item>

				    
				    <a-form-item
				      :wrapper-col="{ span: 12, offset: 5 }"
				    >
				      <a-button type="danger" html-type="submit" @click="comment()">保存</a-button>
				    </a-form-item>
				  </a-form>

			</div>


			</div>
		</div>
	</div>
</template>

<style>
.user_buy_car_list{border:1px solid #efefef;}
.user_buy_car_list_title{line-height: 40px;padding-left: 20px;box-sizing:border-box;border-bottom: 1px solid #efefef;font-size: 14px;background: #f3f3f3;margin-bottom: 20px;}
.user_buy_car_content{padding: 0px 30px;}
.user_buy_car_content_title{display: inline-block;width: 300px;height: 50px;overflow: hidden;float: left;font-size: 12px;}

</style>

<script>
	export default {
	  
	  data(){
			return{
				content:'',
				star:0,
				orderId:'',
			}
	  },
	  methods:{
	  	comment:function(){
	  		var _this = this;
			this.$post(this.ROOT_URL + "Shop/order/comment",{order_id:this.orderId,star:this.star,content:this.content}).then(function(res){
	  			console.log(res);
	  			if(res.code==500){
	  				_this.$message.error(res.message);
	  			}else{
	  				_this.$message.success('评论成功！');
	  				_this.$router.go(-1);
	  			}
	  		});
	  	},
	  },
	  mounted(){
	  	var orderId = this.$route.params.order_id;
	  	this.orderId = orderId;
	  	if(this.$isEmpty(orderId)){
	  		this.$message.error('非法访问');
	  		this.$router.go(-1);
	  	}

	  },

	};
</script>