import Vue from 'vue'

import {formatDate,isMobile} from '@/plugins/function.js' // 辅助js 库
import {post,get,put,deletes,toJson,isEmpty} from '@/plugins/http.js' // axios

// import VueMeta from 'vue-meta'

// // Vue mate
// Vue.use(VueMeta, {
//   // optional pluginOptions
//   refreshOnceOnNavigation: true
// })

//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$put=put;
Vue.prototype.$delete=deletes;
Vue.prototype.$toJson=toJson;
Vue.prototype.$isEmpty=isEmpty;
Vue.prototype.$isMobile=isMobile;

Vue.filter('formatDate', function (time) {
    var date = new Date(time*1000);
    return formatDate(date, 'yyyy-MM-dd hh:mm');
});

Vue.filter('formatDataAuto', function ([time,str]) {
    var date = new Date(time*1000);
    return formatDate(date, str);
});

Vue.prototype.ROOT_URL = 'http://s.qingwuit.com/api/';