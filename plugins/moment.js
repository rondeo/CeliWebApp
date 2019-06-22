import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function(value){
  if (value){
    moment.locale('es'); 
    return moment(moment(String(value)).format('LL'),'LL').fromNow()
  }
})