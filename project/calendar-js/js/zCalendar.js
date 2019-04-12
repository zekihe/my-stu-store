;(function(){
  "use strict";
  var _global;
  // 工具函数
  // 对象合并
  function extend(o,n,override) {
    for(var key in n){
        if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
            o[key]=n[key];
        }
    }
    return o;
  }

  //获取某年某月有多少天
  var getDaysInOneMonth = function(year, month){
    month = parseInt(month,10);
    //month 0-11 
    let d = new Date(year,month,0);  //0,前一个月的天数
    // let date = new Date(year+"/"+month+"/0")   //IE浏览器可以获取天数，谷歌浏览器会返回NaN
    return d.getDate();
  }

  //获取当前某年某月第一天是星期几
  var getFirstDayInMonth = function(year, month){
    month = parseInt(month,10) -1;
    let d = new Date(year,month,1);  //这个是都可以兼容的
    return d.getDay();
  }
  //获取当前某年某月最后一天是星期几
  var getLastDayInMonth = function(year, month){
    let lastDay = getDaysInOneMonth(year,month);
    month = parseInt(month,10) - 1;
    let d = new Date(year,month,lastDay);  //这个是都可以兼容的
    return d.getDay();
  }


  function Zcalendar(opt){
    const _self = this;
    if(!opt) {
        throw new Error("请传入配置参数");
    }
    _self._initial(opt);
  }
  Zcalendar.prototype = {
    cunstructor: this,
    _initial: function(opt){
      //默认参数
      var def = {
        tmpId: null,
        prevBtnTxt: '上个月',
        nextBtnTxt: '下个月',
        weekName: ['周日','周一','周二','周三','周四','周五','周六'],
        currentDate: new Date(),
        currentYear: 0,
        currentMonth: 0,  // 0 - 11
        curWeek: 0, //当前星期几
        curMonthDays: 0 //当前月天数 
      }
      this.preBtn = null;
      this.nextBtn = null;
      def.currentYear = def.currentDate.getFullYear();
      def.currentMonth = def.currentDate.getMonth() + 1;

      this.def = extend(def,opt,true); //配置参数   
      this.oDom = document.getElementById(def.tmpId);
      this.oDom.setAttribute('class','z_calendar');
      this.initRender();
    },
    //初始化渲染
    initRender: function(){
      let _self = this,
          oLi = null,
          uLi = null,
          oSpan = null;
      let ol = document.createElement('ol'),
          ul = document.createElement('div');
      ol.setAttribute('class','z_week_list');
      ul.setAttribute('class','z_cal_list');

      _self.oDom.innerHTML = '<div class="z_cla_header">'
                   +    '<div>'
                   +        '<a href="javascript:;" name="prev" class="prev_btn z_btn">上个月</a>'
                   +        '<a href="javascript:;" name="now" class="now_btn z_btn">今天</a>'
                   +        '<a href="javascript:;" name="next" class="next_btn z_btn">下个月</a>'
                   +    '</div>'
                   +    '<div>'
                   +        '<span class="curTips">' + _self.def.currentYear + '年' + _self.def.currentMonth + '月' + '</span>'
                   +    '</div>'
                   + '</div>';

      _self.preBtn = document.getElementsByClassName('prev_btn', _self.oDom)[0];
      _self.nextBtn = document.getElementsByClassName('next_btn', _self.oDom)[0];
      _self.nowBtn = document.getElementsByClassName('now_btn', _self.oDom)[0];

      for(let i = 0, len = _self.def.weekName.length; i < len; i++){
        oLi = document.createElement('li');
        oLi.innerHTML = _self.def.weekName[i];
        ol.appendChild(oLi);
      }

      _self.oDom.appendChild(ol);
      _self.oDom.appendChild(ul);
      _self.initMonth();
      
      _self.initEvents();
    },
    initEvents: function(){
      let _self = this;
      _self.preBtn.addEventListener('click',function(){
        let oSpan = document.getElementsByClassName('curTips', _self.oDom)[0];
        _self.selectMonth('prev');
        oSpan.innerHTML = '<span class="curTips">' + _self.def.currentYear + '年' + _self.def.currentMonth + '月' + '</span>';
      })

      _self.nextBtn.addEventListener('click',function(){
        let oSpan = document.getElementsByClassName('curTips', _self.oDom)[0];
        _self.selectMonth('next');
        oSpan.innerHTML = '<span class="curTips">' + _self.def.currentYear + '年' + _self.def.currentMonth + '月' + '</span>';
      })

      _self.nowBtn.addEventListener('click',function(){
        let oSpan = document.getElementsByClassName('curTips', _self.oDom)[0];
        _self.selectMonth('now');
        oSpan.innerHTML = '<span class="curTips">' + _self.def.currentYear + '年' + _self.def.currentMonth + '月' + '</span>';
      })

    },
    
    //初始化列表
    initMonth(){
      let _self = this;
      let lastDayInWeek = null;
      let oUl = document.getElementsByClassName('z_cal_list', _self.oDom)[0];
      _self.def.curMonthDays = getDaysInOneMonth(_self.def.currentYear,_self.def.currentMonth); //当前月天数
       //当前星期几0-6 ， 当前展示前面有几个空的Li
      _self.def.curWeek = getFirstDayInMonth(_self.def.currentYear,_self.def.currentMonth);
      //当前月最后一天星期几 0-6
      lastDayInWeek = getLastDayInMonth(_self.def.currentYear,_self.def.currentMonth);

      let tempHtml = '';
      let tempArr = [];
      //当月第一天从星期几开始，前面加几个空的li
      if(_self.def.curWeek){
        let nullLi = null;
        let len = _self.def.curWeek
        for(let j = 0; j < len; j++){
          nullLi = '<div class="cal_day cal_null">'
                  +    '<span>-</span>'
                  +  '</div>';
          tempArr.push(nullLi);
        }
      }
      //本月div
      let dataLi = null;
      //[0,1,2,3,4,5,6]
      for(let i = 1; i <= _self.def.curMonthDays ; i++){
        dataLi = '<div key="'+ i +'" class="cal_day ' + 'day_' + i +' ">'
                 +    '<span>' + i + '</span>'
                 +  '</div>';
        tempArr.push(dataLi);
      }
      //当月最后一天后面加几个空的li    lastDayInWeek  0-6
      if(lastDayInWeek !== 6){
        let nullLi = null,
            len = 6 - lastDayInWeek;
        for(let j = 0; j < len; j++){
          nullLi = '<div class="cal_day cal_null">'
                  +    '<span>-</span>'
                  +  '</div>';
          tempArr.push(nullLi);
        }
      } 

      //包装
      var counter = 1;  //计数器，每隔5个加个DIV
      for(let i = 0; i < tempArr.length;i++){

        if( counter == 1){
          tempHtml += '<div>';
        } 
        if( counter == 7 || i == tempArr.length){
          tempHtml += tempArr[i];
          tempHtml += '</div>';
          counter = 0;
        }else{
          tempHtml += tempArr[i];
        }
        counter++;
      }
      // console.log(tempHtml)
      oUl.innerHTML = tempHtml;
    },
    //选择月份
    selectMonth: function(type,month){
      let _self = this,
          def = this.def;
      def.currentMonth = parseInt(def.currentMonth);
      def.currentYear = parseInt(def.currentYear);
      if(type == 'prev'){
        if(def.currentMonth == 1){
          def.currentMonth = 12;
          def.currentYear--;
        }else{
          def.currentMonth--
        }
      }else if(type == 'next'){
        if(def.currentMonth == 12){
          def.currentMonth = 1;
          def.currentYear++;
        }else{
          def.currentMonth++;
        }
      }else if(type == 'now'){
          def.currentYear = def.currentDate.getFullYear();
          def.currentMonth = def.currentDate.getMonth() + 1;
      }else{
        return
      }
      
      _self.initMonth()
    },

  }
  // 最后将插件对象暴露给全局对象
  _global = (function(){ return this || (0, eval)('this'); }());
  if (typeof module !== "undefined" && module.exports) {
      module.exports = Zcalendar;
  } else if (typeof define === "function" && define.amd) {
      define(function(){return Zcalendar;});
  } else {
      !('Zcalendar' in _global) && (_global.Zcalendar = Zcalendar);
  }

})()