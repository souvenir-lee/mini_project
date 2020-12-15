<template>
	<div class="sidenav" :style="closeNav">
		<a herf="#" class="closebtn" @click="handleEventClick">&times;</a>
		
		<NuxtLink to='/payment/add'>추가하기</NuxtLink>
		<NuxtLink to='/payment/copy'>복사하기</NuxtLink>
		<NuxtLink to='/payment/update/:id'>수정하기</NuxtLink>
		<!-- <NuxtLink to='/payment/add'>상세보기</NuxtLink> -->
		<!---모달 만들기-->
		<a @click="deleteContents">삭제하기</a>
	</div>
	
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  computed,
} from '@nuxtjs/composition-api'

export default defineComponent({
	props: ['clickData', 'check'],
	emits: ['handle-event-click'],
	setup(props, context){
		const checkSwitch = ref(props.check)
		const closeNav = computed(() => {
			if(!checkSwitch.value){
				return { width : "0"}
			}
		})

		const deleteContents = () => {
			if (confirm(`'${props.clickData.event.title}'을 정말 삭제하시겠습니까`)) {
				props.clickData.event.remove()
			}
		}
		const handleEventClick = () => {
			checkSwitch.value = !checkSwitch.value
			console.log('menu handleEventClick',checkSwitch.value)
			context.emit('handle-event-click')
		}

		return{
			closeNav,
			deleteContents,
			handleEventClick
		}
	},
	// data(){
	// 	return{
	// 		checkSwitch : this.check
	// 	}
	// },
	// computed: {	
	// 	closeNav() {
	// 		if(!this.checkSwitch){
	// 			return { width : "0"}
	// 		}
	// 	},
	// },
	// methods: {
	// 	deleteContents(){
	// 		console.log('Menu', this.clickData)
	// 		if (confirm(`'${this.clickData.event.title}'을 정말 삭제하시겠습니까`)) {
	// 			this.clickData.event.remove()
	// 		}
	// 	},
	// 	handleEventClick() {
	// 		this.checkSwitch = !this.checkSwitch
	// 		console.log('menu handleEventClick',this.checkSwitch)
	// 		this.$emit('handle-event-click')
	// 	}
	// }
})
</script>

<style scoped>
a {
  padding: 8px 8px 8px 32px;
  font-size: 1.5rem;
  text-decoration: none;
  color: #818181;
  display: block;
  transition: 0.3s;
}

a:hover {
  color: #f1f1f1;
}
</style>