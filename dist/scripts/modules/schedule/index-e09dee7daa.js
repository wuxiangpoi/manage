"use strict";angular.module("sbAdminApp",["chartService"]).controller("scheduleCtrl",["$scope","$rootScope","$stateParams","$state","baseService","leafService","chartService",function(e,i,t,a,r,n,o){e.displayed=[],e.sp={},e.tableState={},e.callServer=function(i){t.pos&&(i.pagination.init||(i.pagination={},i.pagination.start=t.pos,i.pagination.init=!0)),r.initTable(e,i,r.api.programSchedule+"getProgramSchedulePageList")},e.initPage=function(){e.tableState.pagination.start=0,e.callServer(e.tableState)},e.showSchedule=function(e){r.showSchedule(e,2,o)},e.del=function(i){r.confirm("删除","确定删除排期："+i.name+"?",function(t,a){a.isPosting=!0,r.postData(r.api.programSchedule+"deleteProgramScheduleById",{id:i.id},function(i){t.close(),r.alert("删除成功","success"),e.callServer(e.tableState)})})},e.submitCheck=function(i){r.confirm("提交审核","是否提交审核？",function(t,a){a.isPosting=!0,r.postData(r.api.programSchedule+"submitProgramScheduleById",{id:i.id},function(i){t.close(),r.alert("提交成功","success"),e.callServer(e.tableState)})})},e.edit=function(e){a.go("dashboard.scheduleCreate",{id:e.id})},e.saveAs=function(e,i){a.go("dashboard.scheduleCreate",{type:"saveAs",pos:i,id:e.id})},e.sendDown=function(e){e.info="(排期发布后，终端上的节目将会停播)",r.confirmDialog(720,"排期发布",e,"tpl/terminal_schedule.html",function(i,t){var a="";a=t.ids.join(","),a.length?r.confirm("节目操作","确定在选中的终端上发布排期?",function(i,t){t.isPosting=!0,r.postData(r.api.programSchedule+"scheduleManage_sendCommand",{pid:e.id,type:1,tids:a},function(e){i.close(),r.alert("下发成功","success",!0)})}):r.alert("请至少勾选一个设备再进行操作","warning",!0)},function(e){e.displayed=[],e.sp={},e.ids=[],e.currentGroup=i.rootGroup,e.sp.oid=e.currentGroup.id,e.currentLeaf={},e.currentLeaf.id="",e.sp.gid="",e.tableState={},e.callServer=function(i){r.initTable(e,i,r.api.programSchedule+"scheduleManage_getAllOkTerminalList")},e.initPage=function(){e.tableState.pagination.start=0,e.callServer(e.tableState)},e.$on("emitGroupLeaf",function(i,t,a){e.sp.oid==t.id&&e.sp.gid==a.id||(e.currentGroup=t,e.sp.oid=t.id,e.sp.gid=a.id,e.callServer(e.tableState))}),e.checkAll=function(i){if(e.ids=[],$(i.currentTarget).is(":checked"))for(var t=0;t<e.displayed.length;t++)e.ids.push(e.displayed[t].id);else e.ids=[]},e.checkThis=function(i,t){$(t.currentTarget).is(":checked")?e.ids.push(i.id):e.ids=r.removeAry(e.ids,i.id)},e.showPlay=function(e){r.showProgram(e)}})},e.sendCommandStopProgram=function(e){r.confirmDialog(720,"播放管理",e,"tpl/terminal_schedulePlay.html",function(i,t){var a="";a=t.ids.join(","),a.length?r.confirm("节目操作","确定在该设备上停播选中节目?",function(i,t){t.isPosting=!0,r.postData(r.api.programSchedule+"scheduleManage_sendCommand",{tids:a,type:0,pid:e.id},function(e){i.close(),r.confirmAlert("信息提示","操作成功","success","终端命令执行成功后，将停播此排期，同时不显示在终端列表中~","离线终端需上线后再执行命令，半小时内重复命令为您自动过滤")})}):r.alert("请至少勾选一个终端再进行操作","warning",!0)},function(t){t.displayed=[],t.sp={},t.ids=[],t.currentGroup=i.rootGroup,t.sp.oid=t.currentGroup.id,t.currentLeaf={},t.currentLeaf.id="",t.sp.gid="",t.tableState={},t.showType=0,t.sp.pid=e.id,t.callUrl=r.api.programSchedule+"getProgramSchedulePlayPageByPid",t.callServer=function(e){r.initTable(t,e,t.callUrl)},t.initTable=function(){switch(t.sp.status="",t.sp.resolution="",t.showType){case 0:t.callUrl=r.api.programSchedule+"getProgramSchedulePlayPageByPid";break;case 1:t.callUrl=r.api.programSchedule+"getProgramScheduleCommandPengdingPageByPid"}t.currentGroup=i.rootGroup,t.sp.oid=t.currentGroup.id,t.currentLeaf={},t.currentLeaf.id="",t.sp.gid="",t.callServer(t.tableState)},t.$on("emitGroupLeaf",function(e,i,a){t.sp.oid==i.id&&t.sp.gid==a.id||(t.currentGroup=i,t.sp.oid=i.id,t.sp.gid=a.id,t.callServer(t.tableState))}),t.checkAll=function(e){if(t.ids=[],$(e.currentTarget).is(":checked"))for(var i=0;i<t.displayed.length;i++)t.ids.push(t.displayed[i].tid);else t.ids=[]},t.checkThis=function(e,i){$(i.currentTarget).is(":checked")?t.ids.push(e.tid):t.ids=r.removeAry(t.ids,e.tid)},t.switchTab=function(e){t.showType!=e&&(t.showType=e,t.initTable())}})}}]);