export default {
	state: {
		list: [{
				checked: false,
				id: 1,
				name: "数据的垃圾是多久啊是大飒飒记得啦就是看到",
				color: "大街上看到路上看到",
				imgUrl: "../../static/img/Children2.jpg",
				pprice: "27",
				num: 1
			},
			{
				checked: false,
				id: 2,
				name: "数据的垃圾是多久啊是大飒飒记得啦就是看到",
				color: "大街上看到路上看到",
				imgUrl: "../../static/img/Children2.jpg",
				pprice: "23",
				num: 1
			}
		],
		selectedList: []
	},
	getters: {
		checkedAll(state) {
			return state.list.length === state.selectedList.length
		},
		totalCount(state) {
			const total = {
				pprice: 0,
				num: 0
			}

			state.list.forEach((e) => {
				// 判断是否选中
				if (state.selectedList.indexOf(e.id) > -1) {
					total.pprice += e.pprice * e.num
					total.num = state.selectedList.length
				}
			})

			return total
		}
	},
	mutations: {
		// 全选
		checkAll(state) {
			console.log('全选', state.list)
			state.selectedList = state.list.map((e) => {
				e.checked = true
				return e.id
			})
		},
		// 全不选
		unCheckAll(state) {
			console.log('取消全选', state.list)
			state.selectedList = state.list.forEach((e) => {
				e.checked = false
			})
			state.selectedList = []
		},
		// 单选
		selectItem(state, index) {
			let id = state.list[index].id
			let i = state.selectedList.indexOf(id)
			// 说明里面有即已经被勾选，所以下面的逻辑是要取消勾选
			if (i > -1) {
				state.list[index].checked = false
				return state.selectedList.splice(i, 1)
			}
			state.list[index].checked = true
			state.selectedList.push(id)
		},
		// 点击的时候id会存入selectedList
		delGoodsFn(state) {
			state.list = state.list.filter((e) => {
				return state.selectedList.indexOf(e.id) === -1
			})
		},
		// 加入购物车
		addShopCart(state, goods) {
			state.list.push(goods)
		}
	},
	actions: {
		checkedAllFn({
			commit,
			getters
		}) {
			// 这里的逻辑是反的，为true清空新的数组，为false往数组里添加id
			getters.checkedAll ? commit('unCheckAll') : commit('checkAll')
		},
		delGoodsFn({
			commit
		}) {
			commit('delGoodsFn');
			commit('unCheckAll')
			uni.showToast({
				title: '删除成功',
				icon: 'none'
			})
		}
	}
}