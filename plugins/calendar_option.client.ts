// import { Plugin, Context } from '@nuxt/types'

// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';

// declare module 'vue/types/vue' {
//   // this.$myInjectedFunction inside Vue components
//   interface Vue {
//     $calendarOptions(views: number): void
//   }
// }

// declare module '@nuxt/types' {
//   // nuxtContext.app.$formatViews inside asyncData, fetch, plugins, middleware, nuxtServerInit
//   interface NuxtAppOptions {
//     $calendarOptions(views: number): void
//   }
//   // nuxtContext.$formatViews
//   interface Context {
//     $calendarOptions(views: number): void
//   }
// }

// const calendarOptions: Plugin = (context: Context) => {
//   context.$calendarOptions = () => {
//     return {
//       plugins: [interactionPlugin, dayGridPlugin],
//       initialView: 'dayGridMonth',
//       headerToolbar: {
//       left: 'prev,next today',
//       center: 'title',
//       right: ''
//     },
//     titleFormat : { year: 'numeric', month: 'short', day: 'numeric' },
//     selectable: true,
//     dateClick : function(info : any){
//      console.log(info)
//      alert('Clicked on: ' + info.dateStr);
//    },
//    events: [
//       // { 이벤트 동적으로 넣기
//       //   start: '2020-12-11T10:00:00',
//       //   end: '2020-12-11T16:00:00',
//       //   display: 'background',
//       //   color: '#ff9f89'
//       // },
//     ],
//     initialEvents: [
//       { title: 'nice event', start: new Date() }
//     ]
//     }
//   }
// }

// export default calendarOptions