<template>
	<view class='my-order bg-active-color'>
		<Lines></Lines>
		<view class='order-header'>
			<view class='header-item' v-for='(item,index) in tabList' :key='index'
				:class=' tabIndex==index?"active":""  ' @tap='changeTab(index)'>{{item.name}}</view>
		</view>

		<block v-for='(tabItem,tabI) in tabList' :key='tabI'>
			<view v-show='tabI===tabIndex'>
				<view v-if='tabItem.list.length > 0' class='order-main' :style="'height:'+clientHeight+'px;'">
					<!--商品-->
					<view v-for='(k,i) in tabItem.list' :key='i'>
						<view class='order-goods'>
							<view class='goods-status f-active-color'>{{ k.status }}</view>
							<view class='goods-item' v-for='(item,index) in k.goods_item' :key="index">
								<OrderList :item='item' :index='index'></OrderList>
							</view>
						</view>
						<Lines></Lines>
						<!--总价-->
						<view class='total-price'>
							订单金额: <text class='f-active-color'>¥{{k.totalPrice}}</text> (包含运费¥0.00)
						</view>
						<Lines></Lines>
						<!--支付-->
						<view class='payment'>
							<view class='payment-text f-active-color'>支付</view>
						</view>
					</view>
				</view>

				<view v-else class='no-order' :style="'height:'+clientHeight+'px;'">
					<view>您还没有相关订单</view>
					<view class='no-order-home'>去首页逛逛</view>
				</view>

			</view>
		</block>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	import OrderList from '@/components/order/order-list.vue'
	export default {
		data() {
			return {
				//高度
				clientHeight: 0,
				//当前位置
				tabIndex: 0,
				//顶部选项卡的数据
				tabList: [{
						name: "全部",
						list: [{
							status: "待付款",
							totalPrice: '3999.00',
							goods_item: [{
									imgUrl: "../../static/img/Children3.jpg",
									name: "大姨绒毛大款2020年必须买,不买你就不行了必须买",
									attrs: "黑色",
									pprice: "299.00",
									num: "1"
								},
								{
									imgUrl: "../../static/img/Children3.jpg",
									name: "大姨绒毛大款2020年必须买,不买你就不行了必须买",
									attrs: "黑色",
									pprice: "299.00",
									num: "5"
								}
							]
						}]
					},
					{
						name: "待付款",
						list: []
					},
					{
						name: "待发货",
						list: []
					},
					{
						name: "待收货",
						list: []
					},
					{
						name: "待评价",
						list: []
					},
				]
			}
		},
		onReady() {
			uni.getSystemInfo({
				success(res) {
					this.clientHeight = res.windowHeight
				}
			})
		},
		components: {
			Lines,
			OrderList
		},
		methods: {
			//顶部切换
			changeTab(index) {
				this.tabIndex = index;
			},
		}
	}
</script>

<style scoped>
	.no-order {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}

	.no-order-home {
		padding: 6rpx 60rpx;
		border: 2rpx solid #49BDFB;
		color: #49BDFB;
		border-radius: 40rpx;
	}

	.order-header {
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 2rpx solid #F7F7F7;
	}

	.header-item {
		text-align: center;
		flex: 1;
		line-height: 120rpx;
	}

	.active {
		border-bottom: 4rpx solid #49BDFB;
	}


	.goods-status {
		display: flex;
		justify-content: flex-end;
		background-color: #FFFFFF;
		padding: 20rpx;
	}

	.total-price {
		display: flex;
		justify-content: flex-end;
		background-color: #FFFFFF;
		padding: 20rpx;
	}

	.payment {
		display: flex;
		justify-content: flex-end;
		background-color: #FFFFFF;
		padding: 20rpx;
	}

	.payment-text {
		border: 2rpx solid #49BDFB;
		padding: 6rpx 40rpx;
		border-radius: 30rpx;
	}
</style>