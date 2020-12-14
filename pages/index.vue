<!------
<template>
  <div class="container">
    <the-header></the-header>
    <FullCalendar :options='calendarOptions' @click="dateClick"/>
    <router-link to="/payment">route</router-link>
    <dialog v-if="clickView"></dialog>
  </div>
</template>
---->
<template>
  <div class='demo-app'>
    <div class='demo-app-sidebar'>
      <the-header></the-header>
      <div v-if="check">
        djls
        <Something></Something>
      </div>
      <div class='demo-app-sidebar-section'>
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
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
import Something from '../components/Something.vue'

export default Vue.extend({
  components: {
    FullCalendar,
    TheHeader,
    Something
  },
  data() {
    return {
      check: false,
      clickData : null,
    }
  },
  computed: {
    calendarOptions(): CalendarOptions {
      return {
        plugins: [interactionPlugin, dayGridPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: ''
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
    currentEvents() :EventApi[] { //이걸 store에 달아보면 좋을 듯
      return []
    }
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
    handleEventClick(clickInfo :EventClickArg) {
      this.check = !this.check
      this.clickData = clickInfo.event.title
      console.log(this.check)
      // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      //   clickInfo.event.remove()
      // }
    },
    handleEvents(events :EventApi[]) {
      this.currentEvents = events
    }
  }
})
</script>

<style>
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

#calendar {
  max-width: 1100px;
  margin: 40px auto;
}
</style>
