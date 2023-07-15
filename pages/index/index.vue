<template>
	<view class="index">
		<scroll-view scroll-x="true" class="scroll-content" :scroll-into-view="scrollIntoIndex">
			<view class="scroll-item" v-for="(item,index) in topBar" :key="index" @tap="changeTab(index)"
				:id="'top'+index">
				<text :class="topBarIndex===index?'f-active-color':'f-color'">{{item.name}}</text>
			</view>
		</scroll-view>

		<swiper @change='onChangeTab' :current="topBarIndex" :style="'height:'+clientHeight+'px;'">
			<swiper-item v-for='(item,index) in newTopBar' :key='index'>
				<scroll-view scroll-y="true" :style="'height:'+clientHeight+'px;'" @scrolltolower="loadMore(index)">
					<block v-if='item.data.length > 0 '>
						<block v-for='(k,i) in item.data' :key='i'>
							<!--推荐-->
							<IndexSwiper v-if='k.type==="swiperList"' :dataList='k.data'></IndexSwiper>
							<template v-if='k.type==="recommendList"'>
								<Recommend :dataList='k.data'></Recommend>
								<Card cardTitle='猜你喜欢'></Card>
							</template>

							<!--运动户外....-->
							<Banner v-if='k.type==="bannerList"' :dataList='k.imgUrl'></Banner>

							<template v-if='k.type==="iconsList"'>
								<Icons :dataList='k.data'></Icons>
								<Card cardTitle='热销爆品'></Card>
							</template>

							<template v-if='k.type==="hotList"'>
								<Hot :dataList='k.data'></Hot>
								<Card cardTitle='推荐店铺'></Card>
							</template>

							<template v-if='k.type==="shopList"'>
								<Shop :dataList='k.data'></Shop>
								<Card cardTitle='为您推荐'></Card>
							</template>

							<CommodityList v-if='k.type==="commodityList"' :dataList='k.data'></CommodityList>

						</block>
					</block>
					<view v-else>
						暂无数据...
					</view>
					<!-- 上拉加载更多 -->
					<view class='load-text f-color'>
						{{item.loadText}}
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import IndexSwiper from '@/components/index/IndexSwiper.vue'
	import Recommend from '@/components/index/Recommend.vue'
	import Card from '@/components/index/Card.vue'
	import CommodityList from '@/components/common/CommodityList.vue'
	import Banner from '../../components/index/Banner.vue'
	import Icons from '../../components/index/Icons.vue'
	import Hot from '../../components/index/Hot.vue'
	import Shop from '../../components/index/Shop.vue'
	import $http from '@/common/api/request.js'
	export default {
		data() {
			return {
				topBarIndex: 0,
				// 顶栏跟随索引值
				scrollIntoIndex: 'top0',
				clientHeight: 0,
				topBar: [],
				newTopBar: []
			}
		},
		components: {
			IndexSwiper,
			Recommend,
			Card,
			CommodityList,
			Banner,
			Icons,
			Hot,
			Shop
		},
		onLoad() {
			this.__init()
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					// 内容可视的高度 = 可视窗的高度-swiper的高度-手机状态栏的高度 未解决
					this.clientHeight = res.windowHeight - uni.upx2px(80)
				}
			})
			// 监听可视区域的高度推荐下面的写法
			// const view = uni.createSelectorQuery().select('.home-data')
			// view.boundingClientRect(data => {
			// 	this.clientHeight = 1000
			// }).exec()
		},
		// 标题栏按钮点击
		onNavigationBarButtonTap(e) {
			if (e.float === 'left') {
				uni.navigateTo({
					url: "../search/search"
				})
			}
		},

		methods: {
			__init() {
				// uni.request({
				// 	url: "http://192.168.1.4:3000/api/index_list/data",
				// 	success: (res) => {
				// 		const data = res.data.data;
				// 		this.topBar = data.topBar;
				// 		this.newTopBar = this.initData(data)
				// 	}
				// }) 
				$http.request({
					url: "/index_list/data"
				}).then((res) => {
					this.topBar = res.data.topBar;
					this.newTopBar = this.initData(res.data)
				}).catch((err) => {
					uni.showToast({
						title: err
					})
				})
			},
			changeTab(index) {
				if (index === this.topBarIndex) {
					return
				}
				this.topBarIndex = index
				this.scrollIntoIndex = 'top' + index
				// 每次点击新的tabBar赋值
				if (this.newTopBar[index].load === 'first') {
					this.addData()
				}
			},
			onChangeTab(e) { // 为了和tab栏联动
				this.changeTab(e.detail.current)
			},
			initData(res) {
				let arr = []
				for (let i = 0; i < this.topBar.length; i++) {
					let obj = {
						data: [],
						load: "first",
						loadText: '上拉加载更多...'
					}
					// 获取首次数据
					if (i === 0) {
						obj.data = res.data
					}
					arr.push(obj)
				}
				return arr
			},
			getClientHeight() {
				const res = uni.getSystemInfoSync()
				const system = res.platform
				if (system === 'ios') {
					return 44 + res.statusBarHeight
				} else if (system === 'android') {
					return 48 + res.statusBarHeight
				} else {
					return 0
				}
			},
			// 对应显示不同数据
			addData(callback) {
				// 拿到索引
				let index = this.topBarIndex
				// 拿到id
				let id = this.topBar[index].id

				// 模拟分页（比较捞看看就好）
				let page = Math.ceil(this.newTopBar[index].data.length / 5) + 1

				// 请求不同的数据
				// uni.request({
				// 	url: 'http://192.168.1.4:3000/api/index_list/' + id + '/data/' + page,
				// 	success: (res) => {
				// 		if (res.statusCode !== 200) {
				// 			return;
				// 		} else {
				// 			let data = res.data.data
				// 			this.newTopBar[index].data = [...this.newTopBar[index].data, ...data]
				// 		}
				// 	}
				// })
				$http.request({
					url: '/index_list/' + id + '/data/' + page
				}).then((res) => {
					let data = res.data
					this.newTopBar[index].data = [...this.newTopBar[index].data, ...data]
				}).catch((err) => {
					uni.showToast({
						title: err
					})
				})
				this.newTopBar[index].load = "last"
				if (typeof callback === 'function') {
					callback()
				}
			},
			// 上拉加载更多
			loadMore(index) {
				this.newTopBar[index].loadText = '加载中...'
				this.addData(() => {
					this.newTopBar[index].loadText = '上拉加载更多...'
				})
			}
		},
	}
</script>

<style scoped>
	.scroll-content {
		width: 100%;
		height: 80rpx;
		white-space: nowrap;
	}

	.scroll-item {
		display: inline-block;
		padding: 10rpx 30rpx;
	}

	.f-active-color {
		border-bottom: 4rpx solid #49BDFB;
	}

	.load-text {
		border-top: 2rpx solid #636263;
		line-height: 60rpx;
		text-align: center;
	}
</style>