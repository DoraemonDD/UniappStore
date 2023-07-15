export default {
	state: {
		list: [{
				name: '张三',
				tel: '18511773322',
				city: '北京市海淀区',
				details: '2号楼',
				isDefault: false
			},
			{
				name: '李四',
				tel: '18511773322',
				city: '北京市海淀区',
				details: '2号楼',
				isDefault: true
			}
		]
	},
	getters: {
		defaultPath(state) {
			return state.list.filter((e) => {
				return e.isDefault === true
			})
		}
	},
	mutations: {
		createPath(state, obj) {
			state.list.unshift(obj)
		},
		updatePath(state, {
			index,
			item
		}) {
			for (let key in item) {
				state.list[index][key] = item[key]
			}
		},
		// 移除默认状态
		removePath(state) {
			state.list.forEach((e) => {
				if (e.isDefault) {
					e.isDefault = false
				}
			})
		}
	},
	actions: {
		createPathFn({
			commit
		}, obj) {
			if (obj.isDefault) {
				commit('removePath')
			}
			commit('createPath', obj)
		},
		updatePathFn({
			commit
		}, obj) {
			if (obj.item.isDefault) {
				commit('removePath')
			}
			commit('updatePath', obj)
		}
	}
}