<template>
	<view class="search">
		<Lines></Lines>

		<view class="search-item">
			<view class="search-title">
				<view class="f-color">最近搜索</view>
				<view class="iconfont icon-iconset0213" @tap="clearCache"></view>
			</view>
			<view v-if="searchData.length>0">
				<view v-for="(item,index) in searchData" :key="index" class="search-name f-color"
					@tap="toSearchList(item)">
					{{item}}
				</view>
			</view>
			<view v-else class="search-end">
				最近暂无搜索记录
			</view>
		</view>

		<view class="search-item">
			<view class="search-title">
				<view class="f-color">热门搜索</view>
			</view>
			<view>
				<view class="search-name f-color">四件套</view>
				<view class="search-name f-color">面膜</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	export default {
		data() {
			return {
				keywords: '',
				// 记录搜索过的搜索词
				searchData: []
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'searchData',
				success: ((res) => {
					this.searchData = JSON.parse(res.data)
				}),
			})
		},
		methods: {
			search(e) {
				if (this.keywords === '') {
					return uni.showToast({
						title: '关键词不能为空',
						icon: 'none'
					})
				} else {
					if (e.float === 'right') {
						this.toSearchList(this.keywords)
					}
				}
				// 隐藏软键盘
				uni.hideKeyboard()
				this.addSearch()
			},
			// 记录最近搜索词
			addSearch() {
				let idx = this.searchData.indexOf(this.keywords)
				if (idx === -1) {
					this.searchData.unshift(this.keywords)
				} else {
					this.searchData.unshift(this.searchData.splice(idx, 1)[0])
				}
				uni.setStorage({
					key: 'searchData',
					data: JSON.stringify(this.searchData)
				})
			},
			// 删除记录
			clearCache() {
				// 删除记录不仅要清空数组，还要清空本地缓存中的值
				uni.showModal({
					title: '重要提示',
					content: '是否要清楚搜索记录',
					cancelText: '取消',
					confirmText: '确定',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorage({
								key: 'searchData',
							})
							this.searchData = []
						}
					}
				})
			},
			// 点击搜索记录进入搜索页面
			toSearchList(name) {
				uni.navigateTo({
					url: '/pages/search-list/search-list?keywords=' + name
				})
			}
		},
		components: {
			Lines
		},
		onNavigationBarButtonTap(e) {
			this.search(e)
		},
		// 监听输入框
		onNavigationBarSearchInputChanged(e) {
			this.keywords = e.text
		},
		// 监听软件盘的搜索按钮点击
		onNavigationBarSearchInputConfirmed(e) {
			this.keywords = e.text
		}
	}
</script>

<style scoped>
	.search-item {
		padding: 20rpx;
	}

	.search-title {
		display: flex;
		justify-content: space-between;
	}

	.search-name {
		padding: 4rpx 24rpx;
		background-color: #e1e1e1;
		display: inline-block;
		border-radius: 26rpx;
		margin: 10rpx;
	}

	.search-end {
		text-align: center;
	}
</style>