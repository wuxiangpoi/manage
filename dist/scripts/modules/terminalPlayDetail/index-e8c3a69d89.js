"use strict";angular.module("sbAdminApp",[]).controller("terminalPlayDetailCtrl",["$scope","$rootScope","baseService","$stateParams",function(a,t,l,e){a.displayed=[],a.sp={},a.tableState={},a.currentGroup=t.rootGroup,a.sp.terminalId=e.id,a.terminalName=e.name,a.resolution=e.resolution,a.pos=e.pos,a.callServer=function(t){l.initTable(a,t,l.api.apiUrl+"/api/termialPlayMonthly/getTerminalPlayMonthlyPageList")},a.initPage=function(){a.tableState.pagination.start=0,a.callServer(a.tableState)},a.showProgram=function(a){l.confirmDialog(720,"播放管理",a,"tpl/terminal_play_daily_detail.html",function(a,t){},function(t){t.displayed=[],t.sp={},t.sp.terminalId=a.terminalId,t.sp.month=a.month,t.tableState={},t.ids=[],t.callUrl=l.api.apiUrl+"/api/termialPlayMonthly/getTerminalPlayMonthlyDetailsPageList",t.callServer=function(a){l.initTable(t,a,t.callUrl)},t.initTable=function(){t.callServer(t.tableState)},t.showProgram=function(a){a.pid=a.programId,l.showProgram(a)}})}}]);