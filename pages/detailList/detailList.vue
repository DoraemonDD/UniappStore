<template>
	<view class='details'>
		<!--商品图-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image class='swiper-img' :src="goodsContent.imgUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!--价格和名称-->
		<view class='details-goods'>
			<view class='goods-pprice'>¥{{goodsContent.pprice}}</view>
			<view class='goods-oprice'>¥{{goodsContent.oprice}}</view>
			<view class='goods-name'>{{goodsContent.name}}</view>
		</view>
		<!--商品详情图-->
		<view>
			<view>
				<image class='details-img' src="../../static/img/detail1.jpg" mode=""></image>
			</view>
			<view>
				<image class='details-img' src="../../static/img/detail2.jpg" mode=""></image>
			</view>
			<view>
				<image class='details-img' src="../../static/img/detail3.jpg" mode=""></image>
			</view>
			<view>
				<image class='details-img' src="../../static/img/detail4.jpg" mode=""></image>
			</view>
			<view>
				<image class='details-img' src="../../static/img/detail5.jpg" mode=""></image>
			</view>
		</view>
		<!--商品列表-->
		<Card cardTitle='看了又看'></Card>
		<CommodityList :dataList='dataList'></CommodityList>

		<!--底部-->
		<view class='details-foot'>
			<view class='iconfont icon-xiaoxi'></view>
			<view class='iconfont icon-gouwuche' @tap="goShopCart"></view>
			<view class='add-shopcart' @tap="showPop">加入购物车</view>
			<view class='purchase' @tap="showPop">立即购买</view>
		</view>

		<!-- 底部弹出图层 -->
		<view class="pop" v-show="isShow" @touchmove.stop.prevent=''>
			<view class="pop-mask" @tap="hidePop"></view>
			<view class="pop-box" :animation="animationData">
				<view>
					<image class="pop-img" :src="goodsContent.imgUrl" mode=""></image>
				</view>
				<view class="pop-num">
					<view>购买数量</view>
					<UniNumberBox :min=1 :value="num" @change="changeNumber"></UniNumberBox>
				</view>
				<view class='pop-sub' @tap='addCart'>
					确定
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import Card from '../../components/index/Card.vue'
	import CommodityList from '@/components/common/CommodityList.vue'
	import UniNumberBox from '@/components/uni/uni-number-box/uni-number-box.vue'
	import $http from '@/common/api/request.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				isShow: false,
				animationData: {},
				num: 1,
				goodsContent: {},
				swiperList: [{
						imgUrl: "../../static/img/details1.jpeg"
					},
					{
						imgUrl: "../../static/img/details2.jpeg"
					},
					{
						imgUrl: "../../static/img/details3.jpeg"
					}
				],
				dataList: [{
						id: 1,
						imgUrl: "../../static/img/commodity1.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/commodity2.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imgUrl: "../../static/img/commodity3.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imgUrl: "../../static/img/commodity4.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}
		},
		onLoad(e) {
			this.getData(e.id)
		},
		methods: {
			...mapMutations(['addShopCart']),
			showPop() {
				var animation = uni.createAnimation({
					duration: 200
				})
				animation.translateY(600).step()
				this.animationData = animation.export()
				this.isShow = true
				setTimeout(() => {
					animation.translateY(0).step()
					this.animationData = animation.export()
				}, 200)
			},
			hidePop() {
				var animation = uni.createAnimation({
					duration: 200
				})
				animation.translateY(600).step();
				this.animationData = animation.export();
				setTimeout(() => {
					animation.translateY(0).step();
					this.isShow = false;
				}, 200)
			},
			changeNumber(value) {
				this.num = value
			},
			getData(id) {
				$http.request({
					url: '/goods/id',
					data: {
						id: id
					}
				}).then((res) => {
					this.goodsContent = res.data[0]
				}).catch(() => {
					uni.showToast({
						title: "请求错误",
						icon: ''
					})
				})
			},
			// 跳转购物车
			goShopCart() {
				// 不是tabBar不能用uni.navigateTo
				uni.switchTab({
					url: '/pages/shopcart/shopcart'
				})
			},
			// 加入购物车
			addCart() {
				this.goodsContent['checked'] = false
				this.goodsContent['num'] = this.num
				let goods = this.goodsContent
				this.addShopCart(goods)
				this.hidePop()
				uni.showToast({
					title: "加入购物陈成功",
					icon: 'none'
				})
			},
		},
		components: {
			Card,
			CommodityList,
			UniNumberBox
		},
		// 修改返回的默认行为（防止底部弹窗出现还能返回）
		onBackPress() {
			if (this.isShow) {
				this.hidePop()
				return true
			}
		},
		// 点击分享
		onNavigationBarButtonTap(e) {
			if (e.type === 'share') {
				uni.share({
					provider: "weixin",
					type: 0,
					scene: "WXSceneSession",
					title: this.goodsContent.name,
					href: 'http://192.168.1.4/#/pages/detailList/detailList?id=' + this.goodsContent.id + "",
					imageUrl: this.goodsContent.imgUrl,
					success: function(res) {
						uni.showTabBar({
							title: '分享成功'
						})
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err))
					}
				})
			}
		}
	}
</script>

<style scoped>
	.details {
		padding-bottom: 90rpx;
	}

	swiper {
		width: 100%;
		height: 700rpx;
	}

	.swiper-img {
		width: 100%;
		height: 700rpx;
	}

	.details-goods {
		text-align: center;
		font-weight: bold;
		font-size: 36rpx;
		padding: 10rpx 0;
	}

	.details-img {
		width: 100%;
	}

	.details-foot {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
	}

	.details-foot .iconfont {
		width: 60rpx;
		height: 60rpx;
		border-radius: 100%;
		background-color: #000000;
		color: #FFFFFF;
		text-align: center;
		margin: 0 10rpx;
		padding-top: 20rpx;
	}

	.add-shopcart {
		margin: 0 40rpx;
		padding: 6rpx 30rpx;
		background-color: #000000;
		color: #FFFFFF;
		border-radius: 40rpx;
	}

	.purchase {
		margin: 0 40rpx;
		padding: 6rpx 30rpx;
		background-color: #49BDFB;
		color: #FFFFFF;
		border-radius: 40rpx;
	}

	.pop {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
	}

	.pop-mask {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.pop-box {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 500rpx;
		background-color: #FFFFFF;
		z-index: 999;
	}

	.pop-img {
		width: 260rpx;
		height: 260rpx;
	}

	.pop-num {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.pop-sub {
		line-height: 80rpx;
		background-color: #49BDFB;
		color: #FFFFFF;
		text-align: center;
	}
</style>