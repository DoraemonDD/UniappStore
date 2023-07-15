<template>
	<view class="recommand bg-color">
		<view class="recommand-item" v-for="(item,index) in dataList" :key="index">
			<image class="item-big" :src="item.bigUrl" mode=""></image>
			<view class="item-small">
				<block v-for="(k,i) in item.data" :key="i">
					<image class="item-img" :src="k.imgUrl" mode=""></image>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: Array
		}
	}
</script>

<style scoped>
	.recommand {
		padding: 20rpx;
	}

	.recommand-item {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		border: 2px solid #ccc;
		overflow: hidden;
		margin: 20rpx;
	}

	.item-big {
		width: 100%;
		height: 300rpx;
	}

	.item-small {
		width: 100%;
		height: 240rpx;
	}

	.item-img {
		width: 33.33%;
		height: 240rpx;
	}
</style>