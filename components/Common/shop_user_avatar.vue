<template>
	<div class="user_right_content">
		<div class="user_buy_car_list">
			<div class="user_buy_car_list_title">
				头像修改
			</div>

			<div class="user_info_block">
				
				<a-form>
				    <a-form-item
				      label="头像"
				      :label-col="{ span: 5 }"
				      :wrapper-col="{ span: 12 }"
				    >
				     <a-upload
					    name="file"
					    listType="picture-card"
					    class="avatar-uploader"
					    :showUploadList="false"
					    :beforeUpload="beforeUpload"
					    :headers= "{'X-Requested-With':null}"
					    :action="ROOT_URL+'Shop/avatar'"
					    @change="handleChange"
					  >
					    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
					    <div v-else>
					        <a-icon :type="loading ? 'loading' : 'plus'" />
					        <div class="ant-upload-text">上传头像</div>
					    </div>
					  </a-upload>
				    </a-form-item>
				    
				    <a-form-item
				      :wrapper-col="{ span: 12, offset: 5 }"
				    >
				      <a-button type="danger" html-type="submit" @click="updateAvatar()">保存</a-button>
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
.avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
    text-align: center;
    margin-left: 40px;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
    text-align: center;
  }

</style>

<script>
	function getBase64 (img, callback) {
	  const reader = new FileReader()
	  reader.addEventListener('load', () => callback(reader.result))
	  reader.readAsDataURL(img)
	}
	export default {
	  
	  data(){
			return{
				user_extend:[],
				user_info:[],
				loading:false,
				imageUrl:'',
				imagePath:'',
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
	  	handleChange:function(info){
	  		console.log(info);
	  		if (info.file.status === 'uploading') {
		        this.loading = true
		        return
		    }
		    if (info.file.status === 'error') {
		    	this.$message.error('上传失败！');
		    	this.loading = false
		    }
		    if (info.file.status === 'done') {
		        // Get this url from response in real world.
		        // console.log(info);
		        getBase64(info.file.originFileObj, (imageUrl) => {
		          this.imageUrl = imageUrl
		          this.loading = false
		        })
		        this.imagePath = info.file.response.thumb_path;
		    }
	  	},
	  	beforeUpload:function(file) {
	      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
	      if (!isJPG) {
	        this.$message.error('请上传PNG 或者 jpg图片!');
	        return;
	      }
	      const isLt2M = file.size / 1024 / 1024 < 1
	      if (!isLt2M) {
	        this.$message.error('图片不能超过 1MB!')
	        return;
	      }
	      return isJPG && isLt2M
	    },
	    updateAvatar:function(){
	    	var _this = this;
	    	if(this.imagePath == ''){
	    		this.$message.success('成功！');
	    	}else{
	    		this.$post(this.ROOT_URL + "Shop/editAvatar",{imagePath:this.imagePath}).then(function(res){
	    			if(res.code == 200){
	    				_this.$message.success('修改成功！');
	    				_this.loading = false;
	    				_this.imageUrl = '';
	    			}else{
	    				_this.$message.error('修改失败！');
	    			}
	    		});
	    	}
	    },
	  },
	  mounted(){
	  	this.getUserInfo();
	  }
	}
</script>