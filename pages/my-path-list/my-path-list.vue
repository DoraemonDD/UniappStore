<template>
	<view class='my-path-list'>
		<view class='path-list'>
			<view v-for="(item,index) in list" :key="index" @tap="toAddPath(index)">
				<view class='path-item' @tap="goConformOrder(item)">
					<view class='item-main'>
						<view class='item-name'>{{item.name}}</view>
						<view>{{item.tel}}</view>
					</view>
					<view class='item-main'>
						<view class='active' v-if="item.isDefault===true">默认</view>
						<view>{{item.city}}{{item.details}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class='add-path'>
			<view class='add-path-btn' @tap="goAddPath">新增地址</view>
		</view>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				selectType: false
			}
		},
		methods: {
			onLoad(e) {
				if (e.type === 'selectPath') {
					this.selectType = true
				}
			},
			// 修改地址
			toAddPath(index) {
				let pathObj = JSON.stringify({
					index: index,
					item: this.list[index]
				})
				uni.navigateTo({
					url: '/pages/my-add-path/my-add-path?data=' + pathObj + ""
				})
			},
			goAddPath() {
				uni.navigateTo({
					url: '/pages/my-add-path/my-add-path'
				})
			},
			goConformOrder(path) {
				if (this.selectType === true) {
					// 页面通讯使用$emit on
					uni.$emit('selectPath', path)
					uni.navigateBack({
						delta: 1
					})
				}

			}
		},
		computed: {
			...mapState({
				list: state => state.path.list
			})
		}
	}
</script>

<style scoped>
	.path-list {
		padding-left: 20rpx;
	}

	.path-item {
		padding: 10rpx;
		border-bottom: 2rpx solid #CCCCCC;
	}

	.item-main {
		display: flex;
		align-items: center;
	}

	.item-name {
		padding-right: 10rpx;
	}

	.active {
		padding-right: 10rpx;
		background-color: #49BDFB;
		color: #FFFFFF;
		border-radius: 26rpx;
		font-size: 24rpx;
		text-align: center;
	}

	.add-path {
		padding: 20rpx;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.add-path-btn {
		border: 2rpx solid #49BDFB;
		color: #49BDFB;
		border-radius: 30rpx;
		padding: 6rpx 60rpx;
	}
</style>