<template>
	<view>
		<ShopList :keywords="keywords"></ShopList>
	</view>
</template>

<script>
	import ShopList from '@/components/common/ShopList.vue'
	export default {
		data() {
			return {
				keywords: ''
			}
		},
		methods: {

		},
		components: {
			ShopList
		},
		onLoad(e) {
			this.keywords = e.keywords

			// 二级页面input框内的值动态传递
			// #ifdef APP-PLUS
			var webview = this.$mp.page.$getAppWebview()
			webview.setTitleNViewSearchInputText(this.keywords)
			// #endif
		}
	}
</script>

<style>

</style>