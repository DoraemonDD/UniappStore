<template>
	<view class='my'>
		<!--头部-->
		<view class='my-header'>
			<view class='header-main'>
				<view class='header-config' @tap="toMyConfig">
					<image class='config-img' src="../../static/img/config.png" mode=""></image>
				</view>
				<view class='header-logo'>
					<image class='logo-img' mode=""></image>
					<view class='logo-name'>
					</view>
				</view>
			</view>
		</view>
		<!--我的订单-->
		<view class='order'>
			<view class='order-title'>
				<view>我的订单</view>
				<view @tap="goOrder">全部订单 > </view>
			</view>
			<view class='order-list'>
				<view class='order-item'>
					<image class='order-img' src="../../static/img/order1.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class='order-item'>
					<image class='order-img' src="../../static/img/order2.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class='order-item'>
					<image class='order-img' src="../../static/img/order3.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class='order-item'>
					<image class='order-img' src="../../static/img/order4.png" mode=""></image>
					<view>待付款</view>
				</view>
				<view class='order-item'>
					<image class='order-img' src="../../static/img/order5.png" mode=""></image>
					<view>待付款</view>
				</view>
			</view>
		</view>
		<!--内容列表-->
		<view class='my-content'>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
			<view class="my-content-item">
				<view>我的收藏</view>
				<view>></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {

			}
		},
		methods: {
			toMyConfig() {
				uni.navigateTo({
					url: '/pages/my-config/my-config'
				})
			},
			goOrder() {
				uni.navigateTo({
					url: '/pages/my-order/my-order'
				})
			}
		}
	}
</script>

<style scoped>
	.my-header {
		background: url(../../static/img/mybg.png) no-repeat;
		width: 100%;
		height: 400rpx;
	}

	.header-main {
		position: relative;
		top: 120rpx;
	}

	.header-config {
		position: absolute;
		left: 20rpx;
	}

	.header-logo {
		position: absolute;
		left: 50%;
		margin-left: -60rpx;
		width: 120rpx;
	}

	.config-img {
		width: 40rpx;
		height: 40rpx;
	}

	.logo-img {
		width: 120rpx;
		height: 120rpx;
		border: 2rpx solid #CCCCCC;
		border-radius: 50%;
		background-color: #FFFFFF;
	}

	.logo-name {
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
	}

	.order-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
	}

	.order-list {
		padding: 20rpx;
		display: flex;
	}

	.order-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.order-img {
		width: 66rpx;
		height: 66rpx;
	}

	.my-content {
		margin: 20rpx 0;
		padding: 0 20rpx;
	}

	.my-content-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 2px solid #CCCCCC;
	}
</style>