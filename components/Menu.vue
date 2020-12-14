<template>
	<div class="sidenav" >
		<a herf="#" class="closebtn" @click="swtichStyle">&times;</a>
		<a herf="#">추가하기</a>
		<a herf="#">수정하기</a>
		<a herf="#">상세보기</a>
		<a herf="#" @click="deleteContents">삭제하기</a>
	</div>
	
</template>


<script lang="ts">
import Vue from 'vue'
import {EventClickArg} from '@fullcalendar/vue'

export default Vue.extend({
	props: ['clickData', 'check'],
	data(){
		return{
			clickInfo : this.clickData,
			checkSwitch : this.check
		}
	},
	// computed: {	
	// 	openNav() {
	// 		console.log('open')
	// 		return { width : "250px" }
	// 	},
	// 	closeNav() {
	// 		console.log('close')
	// 		return { width : "0"}
	// 	},
	// },
	methods: {
		deleteContents(clickInfo : EventClickArg){
			console.log('Menu',this.clickInfo, typeof this.clickData)
			if (confirm(`'${this.clickInfo.event.title}'을 정말 삭제하시겠습니까`)) {
				this.clickInfo.event.remove()
			}
		},
		swtichStyle() {
			this.checkSwitch = !this.checkSwitch
		}
	}
})
</script>

<style scoped>
a {
  padding: 8px 8px 8px 32px;
  font-size: 1.5rem;
  color: #818181;
  display: block;
  transition: 0.3s;
}

a:hover {
  color: #f1f1f1;
}
</style>