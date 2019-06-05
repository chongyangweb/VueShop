<template>
	<div class="shop">
		<shop_header />
		<shop_other_nav />
		<div class="user" >
			<shop_user_cat />
			<shop_user_password />
		</div>

		<shop_foot />
	</div>
</template>

<script>
import shop_header from '@/components/Common/shop_header.vue'
import shop_foot from '@/components/Common/shop_foot.vue'
import shop_user_cat from '@/components/Common/shop_user_cat.vue'
import shop_other_nav from '@/components/Common/shop_other_nav.vue'
import shop_user_password from '@/components/Common/shop_user_password.vue'

export default {
  components: {
    shop_header,
    shop_user_cat,
    shop_foot,
    shop_other_nav,
    shop_user_password,
  },
  data(){
		return{
		}
	},

}
</script>

<style>
.user{width:1200px; margin:0 auto;}
.user:after{display:block;clear:both;content:''}
.user_right_content{float: right;width: 930px;margin-top:20px;}
</style>