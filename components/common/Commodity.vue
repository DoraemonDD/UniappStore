<template>
	<view class="commodity" :style="'flex-wrap:'+wrap+';'">
		<view class="commodity-item" v-for="(item,index) in dataList" :key="index" :style="'width:'+itemW+';'"
			@tap="goDetail(item.id)">
			<image class="commodity-img" :src="item.imgUrl" :style="'height:'+itemH+';'"></image>
			<view class="commodity-content">
				<text class="commodity-name">
					{{item.name}}
				</text>
				<view>
					<text class="pprice">{{item.pprice}}</text>
					<text class="oprice">{{item.oprice}}</text>
				</view>
				<text class="discount">{{item.discount}}折</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: Array,
			itemW: {
				type: String,
				default: '375rpx'
			},
			itemH: {
				type: String,
				default: '375rpx'
			},
			wrap: {
				type: String,
				default: 'wrap'
			}
		},
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: '../../pages/detailList/detailList?id=' + id
				})
			}
		}
	}
</script>

<style scoped>
	.commodity {
		display: flex;
	}

	.commodity-item {
		padding-bottom: 20rpx;
	}

	.commodity-img {
		width: 100%;
	}

	.commodity-content {
		text-align: center;
	}

	.commodity-name {
		overflow: hidden;
		text-overflow: ellipsis;
		/*等价于display:flex*/
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #333;
		word-break: break-all;
		padding: 6rpx 20rpx;
	}

	.oprice {
		text-decoration: line-through;
		font-size: 24rpx;
		color: #999;
	}

	.discount {
		border-radius: 4rpx;
		border: 1rpx solid #ff3333;
		padding: 2rpx 10rpx;
		font-size: 20rpx;
		color: #ff3333;
	}
</style>