<template>
	<view>
		<Lines></Lines>

		<view class="list">
			<!-- 左侧滑动 -->
			<scroll-view scroll-y="true" class="list-left" :style="'height:'+clientHeight+'px;'">
				<view v-for="(item,index) in leftData" :key="item.key" class="left-item"
					@tap="changeLeftTab(index,item.id)">
					<view class="left-name" :class="activeIndex===index?'left-name-active':'left-item'">{{item.name}}
					</view>
				</view>
			</scroll-view>

			<!-- 右侧滑动 -->
			<scroll-view scroll-y="true" class="list-right" :style="'height:'+clientHeight+'px;'">
				<view v-for="(item,index) in rightData" :key="index" class="right-item">
					<block v-for="(k,i) in item" :key="i">
						<view class="list-title">{{k.name}}</view>
						<view class="right-content">
							<view class="right-item" v-for="(j,idx) in k.list" :key="idx">
								<image class="right-img" :src="j.imgUrl" mode=""></image>
								<view class="right-name">{{j.name}}</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	import $http from '@/common/api/request.js'
	export default {
		data() {
			return {
				clientHeight: 0,
				activeIndex: 0,
				leftData: [],
				rightData: []
			}
		},
		methods: {
			getData(id) {
				if (id === (this.activeIndex + 1)) {
					return
				}

				$http.request({
					url: '/goods/list'
				}).then((res) => {
					let leftData = []
					let rightData = []
					res.data.forEach((v) => {
						leftData.push({
							id: v.id,
							name: v.name
						})
						if ((this.activeIndex + 1) === v.id) {
							rightData.push(v.data)
						}
					})
					this.leftData = leftData
					this.rightData = rightData

				}).catch((err) => {
					console.log(err)
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
			getClientHeight() {
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if (system === 'ios') {
					return 44 + res.statusBarHeight;
				} else if (system === 'android') {
					return 48 + res.statusBarHeight;
				} else {
					return 0;
				}
			},
			changeLeftTab(index, id) {
				this.getData(id) // 必须先获取数据再请求,getData方法里第一行注释掉就知道了
				this.activeIndex = index
			}
		},
		components: {
			Lines
		},
		onLoad() {
			this.getData()
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					// 现在uniapp好像直接通过windowHeight就可以直接获取可视区域的高度
					// 不需要减去手机状态栏的高度
					this.clientHeight = res.windowHeight
				}
			})
		},
		// 获取输入框的生命周期
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		}
	}
</script>

<style scoped>
	.list {
		display: flex;
	}

	.list-left {
		width: 200rpx;
	}

	.left-item {
		border-bottom: 2rpx solid #FFFFFF;
		font-size: 28rpx;
		font-weight: bold;
		background-color: #F7F7F7;
	}

	.left-name {
		padding: 30rpx 6rpx;
		text-align: center;
	}

	.left-name-active {
		border-left: 8rpx solid #49BDFB;
		background-color: #FFFFFF;
	}

	.list-right {
		flex: 1;
		padding-left: 30rpx;
	}

	.list-title {
		font-weight: bold;
		padding: 30rpx 0;
	}

	.right-content {
		display: flex;
		flex-wrap: wrap;
	}

	.right-item {
		width: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
	}

	.right-name {
		padding: 16rpx 0;
	}

	.right-img {
		width: 150rpx;
		height: 150rpx;
	}
</style>