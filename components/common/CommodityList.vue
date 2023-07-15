<template>
	<view class="commodity-list">
		<Commodity :dataList="dataList"></Commodity>
	</view>
</template>

<script>
	import Commodity from './Commodity.vue'
	export default {
		data() {
			return {
				commodityList: []
			}
		},
		components: {
			Commodity
		},
		props: {
			dataList: Array
		},
	}
</script>

<style>
</style>