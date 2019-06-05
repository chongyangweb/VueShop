<template>
	<div class="user_right_content">
		<div class="user_buy_car_list">
			<div class="user_buy_car_list_title">
				我的订单
			</div>
			<div class="user_buy_car_content">
				<a-tabs defaultActiveKey="1" @change="callback">
				    <a-tab-pane tab="全部" key="1">
						<div class="user_shop_car_js">
							<a-checkbox @change="onChangeAll" :indeterminate="indeterminate" :checked="checkAll">
							</a-checkbox>
							<span style="width:50px">全选</span> 
							<span style="width:300px;margin-right:440px;margin-left:40px;">商品信息</span> <span style="margin-right:60px;">价格</span> <span  style="margin-right:85px;">数量</span> <span>操作</span>
						</div>
						<a-checkbox-group @change="onChange" v-model="checkedList" v-for="(v,k) in orderList" :key='v.order_no'>
						<div class="user_shop_name">
							<nuxt-link to="#"><!-- <span style="color:#999;float:right;">时间：{{v.add_time | formatDate}}</span> --><i class="icon iconfont">&#xe675;</i>订单号：{{v.order_no}}</nuxt-link>
						</div>
						<ul>
							<li v-for="(vo,key) in (v.get_order_goods)"><a-checkbox value="a"  :key='key'>
								<img :src="vo.image" width="50px" height="50px">
							</a-checkbox>
							<div class="user_buy_car_content_title">{{vo.title}}</div>
							<div class="user_buy_car_content_guige">{{vo.spec_name}}</div>
							<div class="user_buy_car_content_price">$ {{vo.price}}</div>
							<div class="user_buy_car_content_num">{{vo.num}}</div>
							<div class="user_buy_car_content_do">
								<div v-if='key== 0'>
									<div v-if="v.pay_status == 0 && v.order_status == 0">
										<button style="background:#ca151e;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="pay(v.id)">立即支付</button>
										<p style="text-align:center;" @click="cancelPay(v.id)">取消订单</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==0">
										<p style="text-align:center;"><a-tag color="orange">等待发货</a-tag></p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==0">
										<button style="background:#1890ff;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="confirm(v.id)">确认收货</button>
										<p style="text-align:center;" @click="logistics(v.delivery_no)">查看物流</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==0">
										<button style="background:#FF6347;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="comment(v.id)">前往评论</button>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==1">
										<p style="text-align:center;"> <a-tag color="green">订单完成</a-tag></p>
									</div>

									<div v-if="v.order_status == 99">
										<p style="text-align:center;color:#ca151e"><a-tag color="red">订单取消</a-tag></p>
									</div>
								</div>
							</div>

							</li>
						</ul>

						
						</a-checkbox-group>
						<div><a-pagination :defaultCurrent="1" @change="pageChange" :current="current" :defaultPageSize="30" :total="page.count" /></div>
						
				    </a-tab-pane>
				    <a-tab-pane tab="待付款" key="2">
				    	<div class="user_shop_car_js">
							<a-checkbox @change="onChangeAll" :indeterminate="indeterminate" :checked="checkAll">
							</a-checkbox>
							<span style="width:50px">全选</span> 
							<span style="width:300px;margin-right:440px;margin-left:40px;">商品信息</span> <span style="margin-right:60px;">价格</span> <span  style="margin-right:85px;">数量</span> <span>操作</span>
						</div>
						<a-checkbox-group @change="onChange" v-model="checkedList" v-for="(v,k) in orderList" :key='v.order_no'>
						<div class="user_shop_name">
							<nuxt-link to="#"><!-- <span style="color:#999;float:right;">时间：{{v.add_time | formatDate}}</span> --><i class="icon iconfont">&#xe675;</i>订单号：{{v.order_no}}</nuxt-link>
						</div>
						<ul>
							<li v-for="(vo,key) in (v.get_order_goods)"><a-checkbox value="a"  :key='key'>
								<img :src="vo.image" width="50px" height="50px">
							</a-checkbox>
							<div class="user_buy_car_content_title">{{vo.title}}</div>
							<div class="user_buy_car_content_guige">{{vo.spec_name}}</div>
							<div class="user_buy_car_content_price">$ {{vo.price}}</div>
							<div class="user_buy_car_content_num">{{vo.num}}</div>
							<div class="user_buy_car_content_do">
								<div v-if='key== 0'>
									<div v-if="v.pay_status == 0 && v.order_status == 0">
										<button style="background:#ca151e;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="pay(v.id)">立即支付</button>
										<p style="text-align:center;" @click="cancelPay(v.id)">取消订单</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==0">
										<p style="text-align:center;"><a-tag color="orange">等待发货</a-tag></p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==0">
										<button style="background:#1890ff;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="confirm(v.id)">确认收货</button>
										<p style="text-align:center;" @click="logistics(v.delivery_no)">查看物流</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==0">
										<button style="background:#FF6347;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="comment(v.id)">前往评论</button>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==1">
										<p style="text-align:center;"> <a-tag color="green">订单完成</a-tag></p>
									</div>

									<div v-if="v.order_status == 99">
										<p style="text-align:center;color:#ca151e"><a-tag color="red">订单取消</a-tag></p>
									</div>
								</div>
							</div>

							</li>
						</ul>

						
						</a-checkbox-group>
						<div><a-pagination :defaultCurrent="1" @change="pageChange" :current="current" :defaultPageSize="30" :total="page.count" /></div>

				    </a-tab-pane>
				    <a-tab-pane tab="待发货" key="3">
						<div class="user_shop_car_js">
							<a-checkbox @change="onChangeAll" :indeterminate="indeterminate" :checked="checkAll">
							</a-checkbox>
							<span style="width:50px">全选</span> 
							<span style="width:300px;margin-right:440px;margin-left:40px;">商品信息</span> <span style="margin-right:60px;">价格</span> <span  style="margin-right:85px;">数量</span> <span>操作</span>
						</div>
						<a-checkbox-group @change="onChange" v-model="checkedList" v-for="(v,k) in orderList" :key='v.order_no'>
						<div class="user_shop_name">
							<nuxt-link to="#"><!-- <span style="color:#999;float:right;">时间：{{v.add_time | formatDate}}</span> --><i class="icon iconfont">&#xe675;</i>订单号：{{v.order_no}}</nuxt-link>
						</div>
						<ul>
							<li v-for="(vo,key) in (v.get_order_goods)"><a-checkbox value="a"  :key='key'>
								<img :src="vo.image" width="50px" height="50px">
							</a-checkbox>
							<div class="user_buy_car_content_title">{{vo.title}}</div>
							<div class="user_buy_car_content_guige">{{vo.spec_name}}</div>
							<div class="user_buy_car_content_price">$ {{vo.price}}</div>
							<div class="user_buy_car_content_num">{{vo.num}}</div>
							<div class="user_buy_car_content_do">
								<div v-if='key== 0'>
									<div v-if="v.pay_status == 0 && v.order_status == 0">
										<button style="background:#ca151e;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="pay(v.id)">立即支付</button>
										<p style="text-align:center;" @click="cancelPay(v.id)">取消订单</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==0">
										<p style="text-align:center;"><a-tag color="orange">等待发货</a-tag></p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==0">
										<button style="background:#1890ff;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="confirm(v.id)">确认收货</button>
										<p style="text-align:center;" @click="logistics(v.delivery_no)">查看物流</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==0">
										<button style="background:#FF6347;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="comment(v.id)">前往评论</button>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==1">
										<p style="text-align:center;"> <a-tag color="green">订单完成</a-tag></p>
									</div>

									<div v-if="v.order_status == 99">
										<p style="text-align:center;color:#ca151e"><a-tag color="red">订单取消</a-tag></p>
									</div>
								</div>
							</div>

							</li>
						</ul>

						
						</a-checkbox-group>
						<div><a-pagination :defaultCurrent="1" @change="pageChange" :current="current" :defaultPageSize="30" :total="page.count" /></div>

				    </a-tab-pane>
				    <a-tab-pane tab="待收货" key="4">
				    	<div class="user_shop_car_js">
							<a-checkbox @change="onChangeAll" :indeterminate="indeterminate" :checked="checkAll">
							</a-checkbox>
							<span style="width:50px">全选</span> 
							<span style="width:300px;margin-right:440px;margin-left:40px;">商品信息</span> <span style="margin-right:60px;">价格</span> <span  style="margin-right:85px;">数量</span> <span>操作</span>
						</div>
						<a-checkbox-group @change="onChange" v-model="checkedList" v-for="(v,k) in orderList" :key='v.order_no'>
						<div class="user_shop_name">
							<nuxt-link to="#"><!-- <span style="color:#999;float:right;">时间：{{v.add_time | formatDate}}</span> --><i class="icon iconfont">&#xe675;</i>订单号：{{v.order_no}}</nuxt-link>
						</div>
						<ul>
							<li v-for="(vo,key) in (v.get_order_goods)"><a-checkbox value="a"  :key='key'>
								<img :src="vo.image" width="50px" height="50px">
							</a-checkbox>
							<div class="user_buy_car_content_title">{{vo.title}}</div>
							<div class="user_buy_car_content_guige">{{vo.spec_name}}</div>
							<div class="user_buy_car_content_price">$ {{vo.price}}</div>
							<div class="user_buy_car_content_num">{{vo.num}}</div>
							<div class="user_buy_car_content_do">
								<div v-if='key== 0'>
									<div v-if="v.pay_status == 0 && v.order_status == 0">
										<button style="background:#ca151e;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="pay(v.id)">立即支付</button>
										<p style="text-align:center;" @click="cancelPay(v.id)">取消订单</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==0">
										<p style="text-align:center;"><a-tag color="orange">等待发货</a-tag></p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==0">
										<button style="background:#1890ff;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="confirm(v.id)">确认收货</button>
										<p style="text-align:center;" @click="logistics(v.delivery_no)">查看物流</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==0">
										<button style="background:#FF6347;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="comment(v.id)">前往评论</button>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==1">
										<p style="text-align:center;"> <a-tag color="green">订单完成</a-tag></p>
									</div>

									<div v-if="v.order_status == 99">
										<p style="text-align:center;color:#ca151e"><a-tag color="red">订单取消</a-tag></p>
									</div>
								</div>
							</div>

							</li>
						</ul>

						
						</a-checkbox-group>
						<div><a-pagination :defaultCurrent="1" @change="pageChange" :current="current" :defaultPageSize="30" :total="page.count" /></div>
				    </a-tab-pane>
				    <a-tab-pane tab="待评价" key="5">
				    	<div class="user_shop_car_js">
							<a-checkbox @change="onChangeAll" :indeterminate="indeterminate" :checked="checkAll">
							</a-checkbox>
							<span style="width:50px">全选</span> 
							<span style="width:300px;margin-right:440px;margin-left:40px;">商品信息</span> <span style="margin-right:60px;">价格</span> <span  style="margin-right:85px;">数量</span> <span>操作</span>
						</div>
						<a-checkbox-group @change="onChange" v-model="checkedList" v-for="(v,k) in orderList" :key='v.order_no'>
						<div class="user_shop_name">
							<nuxt-link to="#"><!-- <span style="color:#999;float:right;">时间：{{v.add_time | formatDate}}</span> --><i class="icon iconfont">&#xe675;</i>订单号：{{v.order_no}}</nuxt-link>
						</div>
						<ul>
							<li v-for="(vo,key) in (v.get_order_goods)"><a-checkbox value="a"  :key='key'>
								<img :src="vo.image" width="50px" height="50px">
							</a-checkbox>
							<div class="user_buy_car_content_title">{{vo.title}}</div>
							<div class="user_buy_car_content_guige">{{vo.spec_name}}</div>
							<div class="user_buy_car_content_price">$ {{vo.price}}</div>
							<div class="user_buy_car_content_num">{{vo.num}}</div>
							<div class="user_buy_car_content_do">
								<div v-if='key== 0'>
									<div v-if="v.pay_status == 0 && v.order_status == 0">
										<button style="background:#ca151e;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="pay(v.id)">立即支付</button>
										<p style="text-align:center;" @click="cancelPay(v.id)">取消订单</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==0">
										<p style="text-align:center;"><a-tag color="orange">等待发货</a-tag></p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==0">
										<button style="background:#1890ff;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="confirm(v.id)">确认收货</button>
										<p style="text-align:center;" @click="logistics(v.delivery_no)">查看物流</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==0">
										<button style="background:#FF6347;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="comment(v.id)">前往评论</button>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==1">
										<p style="text-align:center;"> <a-tag color="green">订单完成</a-tag></p>
									</div>

									<div v-if="v.order_status == 99">
										<p style="text-align:center;color:#ca151e"><a-tag color="red">订单取消</a-tag></p>
									</div>
								</div>
							</div>

							</li>
						</ul>

						
						</a-checkbox-group>
						<div><a-pagination :defaultCurrent="1" @change="pageChange" :current="current" :defaultPageSize="30" :total="page.count" /></div>
				    </a-tab-pane>
				    <a-tab-pane tab="已完成" key="6">
				    	<div class="user_shop_car_js">
							<a-checkbox @change="onChangeAll" :indeterminate="indeterminate" :checked="checkAll">
							</a-checkbox>
							<span style="width:50px">全选</span> 
							<span style="width:300px;margin-right:440px;margin-left:40px;">商品信息</span> <span style="margin-right:60px;">价格</span> <span  style="margin-right:85px;">数量</span> <span>操作</span>
						</div>
						<a-checkbox-group @change="onChange" v-model="checkedList" v-for="(v,k) in orderList" :key='v.order_no'>
						<div class="user_shop_name">
							<nuxt-link to="#"><!-- <span style="color:#999;float:right;">时间：{{v.add_time | formatDate}}</span> --><i class="icon iconfont">&#xe675;</i>订单号：{{v.order_no}}</nuxt-link>
						</div>
						<ul>
							<li v-for="(vo,key) in (v.get_order_goods)"><a-checkbox value="a"  :key='key'>
								<img :src="vo.image" width="50px" height="50px">
							</a-checkbox>
							<div class="user_buy_car_content_title">{{vo.title}}</div>
							<div class="user_buy_car_content_guige">{{vo.spec_name}}</div>
							<div class="user_buy_car_content_price">$ {{vo.price}}</div>
							<div class="user_buy_car_content_num">{{vo.num}}</div>
							<div class="user_buy_car_content_do">
								<div v-if='key== 0'>
									<div v-if="v.pay_status == 0 && v.order_status == 0">
										<button style="background:#ca151e;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="pay(v.id)">立即支付</button>
										<p style="text-align:center;" @click="cancelPay(v.id)">取消订单</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==0">
										<p style="text-align:center;"><a-tag color="orange">等待发货</a-tag></p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==0">
										<button style="background:#1890ff;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="confirm(v.id)">确认收货</button>
										<p style="text-align:center;" @click="logistics(v.delivery_no)">查看物流</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==0">
										<button style="background:#FF6347;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="comment(v.id)">前往评论</button>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==1">
										<p style="text-align:center;"> <a-tag color="green">订单完成</a-tag></p>
									</div>

									<div v-if="v.order_status == 99">
										<p style="text-align:center;color:#ca151e"><a-tag color="red">订单取消</a-tag></p>
									</div>
								</div>
							</div>

							</li>
						</ul>

						
						</a-checkbox-group>
						<div><a-pagination :defaultCurrent="1" @change="pageChange" :current="current" :defaultPageSize="30" :total="page.count" /></div>
				    </a-tab-pane>
				    <a-tab-pane tab="已取消" key="7">
				    	<div class="user_shop_car_js">
							<a-checkbox @change="onChangeAll" :indeterminate="indeterminate" :checked="checkAll">
							</a-checkbox>
							<span style="width:50px">全选</span> 
							<span style="width:300px;margin-right:440px;margin-left:40px;">商品信息</span> <span style="margin-right:60px;">价格</span> <span  style="margin-right:85px;">数量</span> <span>操作</span>
						</div>
						<a-checkbox-group @change="onChange" v-model="checkedList" v-for="(v,k) in orderList" :key='v.order_no'>
						<div class="user_shop_name">
							<nuxt-link to="#"><!-- <span style="color:#999;float:right;">时间：{{v.add_time | formatDate}}</span> --><i class="icon iconfont">&#xe675;</i>订单号：{{v.order_no}}</nuxt-link>
						</div>
						<ul>
							<li v-for="(vo,key) in (v.get_order_goods)"><a-checkbox value="a"  :key='key'>
								<img :src="vo.image" width="50px" height="50px">
							</a-checkbox>
							<div class="user_buy_car_content_title">{{vo.title}}</div>
							<div class="user_buy_car_content_guige">{{vo.spec_name}}</div>
							<div class="user_buy_car_content_price">$ {{vo.price}}</div>
							<div class="user_buy_car_content_num">{{vo.num}}</div>
							<div class="user_buy_car_content_do">
								<div v-if='key== 0'>
									<div v-if="v.pay_status == 0 && v.order_status == 0">
										<button style="background:#ca151e;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="pay(v.id)">立即支付</button>
										<p style="text-align:center;" @click="cancelPay(v.id)">取消订单</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==0">
										<p style="text-align:center;"><a-tag color="orange">等待发货</a-tag></p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==0">
										<button style="background:#1890ff;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="confirm(v.id)">确认收货</button>
										<p style="text-align:center;" @click="logistics(v.delivery_no)">查看物流</p>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==0">
										<button style="background:#FF6347;border:none;color:#fff;padding:5px 10px;border-radius: 4px;margin:0 auto;display:block;" @click="comment(v.id)">前往评论</button>
									</div>

									<div v-if="v.pay_status == 1 && v.delivery_status==1 && v.order_status==1 && v.comment_status==1">
										<p style="text-align:center;"> <a-tag color="green">订单完成</a-tag></p>
									</div>

									<div v-if="v.order_status == 99">
										<p style="text-align:center;color:#ca151e"><a-tag color="red">订单取消</a-tag></p>
									</div>
								</div>
							</div>

							</li>
						</ul>

						
						</a-checkbox-group>
						<div><a-pagination :defaultCurrent="1" @change="pageChange" :current="current" :defaultPageSize="30" :total="page.count" /></div>
				    </a-tab-pane>
				 </a-tabs>


			</div> 
		</div>

		<a-modal
	      title="Modal"
	      v-model="visible"
	      @ok="hideModal"
	      okText="确认"
	      cancelText="取消"
	    >
	      <p v-for="(v,k) in kdList" style="font-size:12px;line-height:30px;color:#333" ><span style="color:#f50">{{v.time}}</span>&nbsp;&nbsp;{{v.status}}</p>
	    </a-modal>
		

	    				
		<a-drawer
	      title="选择支付"
	      :placement="placement"
	      :closable="false"
	      @close="onClose"
	      :visible="visible2"
	    >
	      <p>
			<a-radio-group @change="onChange2" v-model="value" defaultChecked="true">
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

	</div>
</template>

<style>
.user_buy_car_list{border:1px solid #efefef;}
.user_buy_car_list_title{line-height: 40px;padding-left: 20px;box-sizing:border-box;border-bottom: 1px solid #efefef;font-size: 14px;background: #f3f3f3;margin-bottom: 20px;}
.user_buy_car_content{padding: 0px 30px;}
.user_buy_car_content .user_shop_name{margin-bottom: 20px;font-size: 12px;padding: 5px;background: #efefef;}
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
.user_buy_car_content_do:hover p{color:#666;}
.user_buy_car_jiesuan{background:#f1f1f1;margin-bottom: 20px;}
.user_buy_car_jiesuan:after{clear: both;display: block;content:'';}
.user_buy_car_jiesuan_num{float: right;line-height: 40px;margin-right: 20px;}
.user_buy_car_jiesuan_price{float: right;line-height: 40px;margin-right: 20px;}
.user_buy_car_jiesuan_btn{float: right;line-height: 40px;margin-right: 20px;}
.user_buy_car_content .ant-tabs-nav .ant-tabs-tab-active{color:#ca151e;}
.user_buy_car_content .ant-tabs-nav .ant-tabs-tab:hover{color:#ca151e;}
.user_buy_car_content .ant-tabs-ink-bar{background:#ca151e;}
.user_buy_car_content .anticon{vertical-align: -0.7em;}
/*.user_buy_car_content .ant-checkbox{float: left;}*/
</style>

<script>
	export default {
	  
	  data(){
			return{
				checkedList:[],
				plainOptions:['a','b','c'],
				checkAll:false,
				indeterminate: true,
				orderList:[],
				callback_index:1,
				limit:'0',
				current:1,
				page:[],
				kdList:[],
				visible:false,
				visible2:false,
				placement: 'left',
				radioStyle: {
			        display: 'block',
			        height: '30px',
			        lineHeight: '30px',
			      },
				user_extend:[],
				user_info:[],
				pay_balance:'',
				pay_type:'1',
				value:1,
				order_list:[],
				total_price:0,
				order_id:0,

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
	  		// console.log(this.checkedList);
	  	},
	  	callback:function(e){
	  		// console.log(e);
	  		this.callback_index = e;
	  		this.getOrderList();
	  	},
	  	getOrderList:function(){
	  		var _this = this;
			this.$post(this.ROOT_URL + "Shop/getOrderList",{type:this.callback_index,limit:this.page.limit,page:this.current}).then(function(res){
				// console.log(res.order_list[0].get_order_goods[0].title);
				_this.orderList = res.order_list;
				_this.page = res.page;
				_this.current = res.page.page;
			});
	  	},
	  	pageChange:function(current){
	  		this.current = current;
	  		this.getOrderList();
	  		console.log(current);
	  	},
	  	showModal() {
	      	this.visible = true
	    },
	    hideModal() {
	      	this.visible = false
	    },
	    onClose() {
	      this.visible = false
	    },
	    onChange2:function(e){
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
	  	// 付款
	  	pay:function(id){
	  		this.visible2 = true
			this.getUserInfo();
			this.order_id = id;
	  		// this.jiesuanData[i] = {sku:this.list[i].val,buy_num:this.list[i].buy_num,goods_id:this.list[i].get_goods_info.id,price:this.list[i].price,goods_info:this.list[i].get_goods_info};
	  		// _this.$router.push({name:'order',params:{goods_list:_this.jiesuanData}});
	  		var _this = this;
	  		this.$post(this.ROOT_URL + "Shop/order/pay",{order_id:id}).then(function(res){
	  			// for(var i=0;i<res.length;i++){
	  			// 	payData[i] = {sku:res[i].val,buy_num:res[i].val.num,goods_id:res[i].val.goods_id,price:res[i].val.price,goods_info:res[i]}
	  			// }
	  			// console.log(payData);
	  			// _this.$router.push({name:'order',params:{goods_list:_this.payData}});
	  			_this.order_list = res.list;
	  			_this.total_price = res.total_price;
	  		});
	  	},
	  	// 取消订单
	  	cancelPay:function(id){
	  		var _this = this;
	  		this.$post(this.ROOT_URL + "Shop/order/cancelPay",{id:id}).then(function(res){
	  			if(res.code == 200){
	  				_this.$message.success('取消订单成功！');
	  			}else{
	  				_this.$message.error('取消订单失败！');
	  			}
	  			_this.getOrderList();
	  		});
	  	},
	  	// 确认收货
	  	confirm:function(id){
	  		var _this = this;
	  		this.$post(this.ROOT_URL + "Shop/order/confirm",{id:id}).then(function(res){
	  			if(res.code == 200){
	  				_this.$message.success('确认收货成功！');
	  			}else{
	  				_this.$message.error('确认收货失败！');
	  			}
	  			_this.getOrderList();
	  		});
	  	},
	  	// 查看物流
	  	logistics:function(delivery){
	  		var _this = this;
	  		this.$post(this.ROOT_URL + "Shop/order/logistics",{delivery:delivery}).then(function(res){
	  			// console.log(res);
	  			_this.kdList = res.data.result.list;
	  			_this.showModal();
	  		});
	  	},
	  	// 评论
	  	comment:function(id){
	  		this.$router.push({name:'user-comment',params:{order_id:id}});
	  	}

	  },
	  mounted(){
	  	this.getOrderList();
	  },
	}
</script>