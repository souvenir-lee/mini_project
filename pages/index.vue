<template>
  <div class='container'>
    <the-header></the-header>
    <div class='sidenav'>
      <Menu :clickData='clickData' :check="check" :style="switchMenuStyle"></Menu>
      <!-- <div class='demo-app-sidebar-section'>
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div> -->
    </div>
    <div class='demo-app-main'>
      <FullCalendar
        id='calendar'
        :options='calendarOptions'
        :style="switchCalStyle"
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FullCalendar, {CalendarOptions, DateSelectArg, EventClickArg, EventApi} from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utlis.js'
import TheHeader from '../components/TheHeader.vue'
import Menu from '../components/Menu.vue'

export default Vue.extend({
  components: {
    FullCalendar,
    TheHeader,
    Menu
  },
  data() {
    return {
      check: false,
      clickData : {} as EventClickArg,
      currentEvents: [] as EventApi[]
    }
  },
  computed: {
    calendarOptions(): CalendarOptions {
      return {
        plugins: [interactionPlugin, dayGridPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev today',
          center: 'title',
          right: 'next'
        },
        titleFormat : { year: 'numeric', month: 'short', day: 'numeric' },
        selectable: true,
        initialEvents: INITIAL_EVENTS,
        editable: true,
        dayMaxEvents: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      }
    },
    switchCalStyle() {
      if(!this.check){ //close
        return { marginLeft :"auto" } 
      } else { //open
        return { marginLeft :"15rem" } 
      }
    },
    switchMenuStyle() {
      if(!this.check){ //close
        return { width :"auto", display: "none" } 
      } else { //open
        return { width :"15rem" } 
      }
		},
  },
  methods: {
    handleDateSelect(selectInfo :DateSelectArg) {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          editable: true,
        })
      }
    },
    handleEvents(events :EventApi[]) {
      this.currentEvents = events
    },
    handleEventClick(clickInfo :EventClickArg) {
      this.check = !this.check
      this.clickData = clickInfo

      // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      //   clickInfo.event.remove()
      // }
    },
  }
})
</script>

<style lang="scss" scoped>
html, body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  align-items: center;
  text-align: center;
}

#calendar {
  max-width: 1100px;
  max-height: 700px;
  margin: 40px auto;
  transition: margin-left .5s;
  padding: 16px;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 10rem;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left .5s;
  padding: 16px;
}
</style>
