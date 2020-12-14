<template>
  <div class="container">
    <the-header></the-header>
    <FullCalendar :options='calendarOptions' />
      <router-link to="/payment">router를 시험함</router-link>
   
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid';
import TheHeader from '../components/TheHeader.vue'

export default Vue.extend({
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        headerToolbar:{
          start: 'title', // will normally be on the left. if RTL, will be on the right
          center: '',
          end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
        },
       titleFormat : { year: 'numeric', month: 'short', day: 'numeric' },
        initialEvents: [
          { title: 'nice event', start: new Date() }
        ]
      }
    }
  },
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
