<template>
<section>
	<slot>
	<!-- <button @click="">추가하기</button>
	<button @click="">수정하기</button>
	<button @click="">상세보기</button> -->
	<!-- <nuxt-link></nuxt-link> -->
	<button @click="deleteContents">삭제하기</button>
</slot>
</section>
</template>


<script lang="ts">
import Vue from 'vue'
import {EventClickArg} from '@fullcalendar/vue'

export default Vue.extend({
	methods: {
		deleteContents(clickInfo :EventClickArg){
			console.log(clickInfo)
			if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
				clickInfo.event.remove()
			}
		}
	}
})
</script>