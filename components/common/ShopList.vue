<template>
	<view class="shop-list">
		<view class="shop-title f-color">
			<view class="shop-item" v-for="(item,index) in shopList.data" :key="index" @tap="changeTap(index)">
				<view :class="shopList.currentIndex===index?'f-active-color':''">{{item.name}}</view>
				<view class="shop-icon">
					<view class="iconfont icon-shangjiantou up" :class="item.status===1?'f-active-color':''"></view>
					<view class="iconfont icon-xiajiantou down" :class="item.status===2?'f-active-color':''"></view>
				</view>
			</view>
		</view>
		<Lines></Lines>
		<CommodityList :dataList="dataList"></CommodityList>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	import CommodityList from '@/components/common/CommodityList.vue'
	import $http from '@/common/api/request.js'
	export default {
		props: {
			keywords: String
		},
		components: {
			Lines,
			CommodityList
		},
		data() {
			return {
				shopList: {
					currentIndex: 0,
					data: [{
							name: "价格",
							status: 1,
							key: "pprice"
						},
						{
							name: "折扣",
							status: 0,
							key: "discount"
						},
						{
							name: "品牌",
							status: 0
						}
					]
				},
				dataList: []
			}
		},
		computed: {
			orderBy() {
				//拿到当前对象
				let obj = this.shopList.data[this.shopList.currentIndex];
				let val = obj.status == '1' ? "desc" : "asc";
				return {
					[obj.key]: val
				}
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			changeTap(index) {
				// 点击排序后重新请求数据
				this.getData()
				// 获取旧的索引值
				let idx = this.shopList.currentIndex
				// 获取旧的每一个对象
				let item = this.shopList.data[idx]
				// 获取新的每一个对象
				let newItem = this.shopList.data[index]
				if (idx === index) {
					return item.status = item.status === 1 ? 2 : 1
				}
				item.status = 0
				this.shopList.currentIndex = index
				newItem.status = 1
			},
			getData() {
				$http.request({
					url: "/goods/search",
					data: {
						name: this.keywords,
						...this.orderBy
					}
				}).then((res) => {
					console.log(res)
					this.dataList = res.data
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			}
		},
	}
</script>

<style scoped>
	.shop-title {
		display: flex;
	}

	.shop-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
	}

	.shop-icon {
		position: relative;
		margin-left: 10rpx;
	}

	.icon-font {
		width: 16rpx;
		height: 8rpx;
		position: absolute;
		left: 0;
	}

	.up {
		top: -34rpx;
	}

	.down {
		top: -24rpx;
	}
</style>