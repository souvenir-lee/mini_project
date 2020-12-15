<template>
  <div class='container'>
    <div class='sidenav'>
      <Menu 
        :clickData='clickData' 
        :check="check" 
        :style="switchMenuStyle" 
        @handle-event-click="handleEventClick"
      ></Menu>
    </div>
    <div 
      class='demo-app-main' 
      :style="switchCalStyle"
    >
      <AddContent></AddContent>
      <FullCalendar
        id='calendar'
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
import {
  defineComponent,
  ref,
  Ref,
  computed,
  reactive,
} from '@nuxtjs/composition-api'
import FullCalendar, {CalendarOptions, DateSelectArg, EventClickArg, EventApi} from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utlis.js'
import Menu from '../components/Menu.vue'
import AddContent from '../components/payment/AddContent.vue'

export default defineComponent({
  components: {
    FullCalendar,
    Menu,
    AddContent
  },
  setup(){
    const check:Ref<boolean> = ref<boolean>(false)
    const clickData  = ref<EventClickArg>()
    const currentEvents = ref<EventApi[]>()
    //const currentEvents = computed(() =>[] as EventApi[])
    

    const calendarOptions = computed(() :CalendarOptions => {
      return{
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
          eventTimeFormat: {
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
          },
          select: handleDateSelect,
          eventClick: handleEventClick,
          eventsSet: handleEvents,
        }
      })

      const switchCalStyle = computed(() => {
        if(!check.value){ //close
          return { marginLeft :"auto" } 
        } else { //open
          return { marginLeft :"15rem" } 
        }
      })
      const switchMenuStyle = computed(() => {
        if(!check.value){ //close
          return { width :"auto", display: "none" } 
        } else { //open
          return { width :"15rem" } 
        }
      })
      

      const handleDateSelect = (selectInfo :DateSelectArg) => {
        let title = prompt('Please enter a new title for your event')
        //<input type='time'/><br>
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
      }
      const handleEvents = (events :EventApi[]) => {
        currentEvents.value = events
      }
      const handleEventClick = (clickInfo :EventClickArg) => {
        check.value = !check.value
        clickData.value = clickInfo
      }
      
      return {
        check,
        clickData,
        calendarOptions,
        switchCalStyle,
        switchMenuStyle,
        handleEventClick
      }
    },
  })
  // data() {
  //   return {
  //     check: false,
  //     clickData : {} as EventClickArg,
  //     currentEvents: [] as EventApi[]
  //   }
  // },
  // computed: {
  //   calendarOptions(): CalendarOptions {
  //     return {
  //       plugins: [interactionPlugin, dayGridPlugin],
  //       initialView: 'dayGridMonth',
  //       headerToolbar: {
  //         left: 'prev today',
  //         center: 'title',
  //         right: 'next'
  //       },
  //       titleFormat : { year: 'numeric', month: 'short', day: 'numeric' },
  //       selectable: true,
  //       initialEvents: INITIAL_EVENTS,
  //       editable: true,
  //       dayMaxEvents: true,
  //       eventTimeFormat: {
  //         hour: 'numeric',
  //         minute: '2-digit',
  //         meridiem: 'short'
  //       },
  //       select: this.handleDateSelect,
  //       eventClick: this.handleEventClick,
  //       eventsSet: this.handleEvents,
  //     }
  //   },
  //   switchCalStyle() {
  //     if(!this.check){ //close
  //       return { marginLeft :"auto" } 
  //     } else { //open
  //       return { marginLeft :"15rem" } 
  //     }
  //   },
  //   switchMenuStyle() {
  //     if(!this.check){ //close
  //       return { width :"auto", display: "none" } 
  //     } else { //open
  //       return { width :"15rem" } 
  //     }
	// 	},
  // },
  // methods: {
  //   handleDateSelect(selectInfo :DateSelectArg) {
  //     let title = prompt('Please enter a new title for your event')
  //     let calendarApi = selectInfo.view.calendar

  //     calendarApi.unselect() // clear date selection

  //     if (title) {
  //       calendarApi.addEvent({
  //         id: createEventId(),
  //         title,
  //         start: selectInfo.startStr,
  //         end: selectInfo.endStr,
  //         editable: true,
  //       })
  //     }
  //   },
  //   handleEvents(events :EventApi[]) {
  //     this.currentEvents = events
  //   },
  //   handleEventClick(clickInfo :EventClickArg) {
  //     this.check = !this.check
  //     this.clickData = clickInfo
  //   },
  // }
//})
</script>

<style lang="scss" scoped>

.container {
  margin: 0 auto;
  min-height: 100vh;
  align-items: center;
  text-align: center;
  transition: margin-left .5s;
  padding: 0px 16px 16px 16px;
}

#calendar {
  max-width: 1100px;
  max-height: 700px;
  margin: 40px auto;
  // transition: margin-left .5s;
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
