"use strict";angular.module("sbAdminApp").controller("groupCtrl",["$scope","$rootScope","baseService",function(o,t,i){function n(){for(var t=[],i=0;i<o.root_organizations.length;i++)t.push({id:o.root_organizations[i].id,pId:o.root_organizations[i].pid,name:o.root_organizations[i].name,sort:o.root_organizations[i].sort});return t}o.root_organizations=t.userData.root_organizations,o.isSort=!1,o.ztreeSetting={zNodes:n(),isSort:!1,isSet:!0,isCheck:!1,selectedNodes:[]},o.sort=function(){o.isSort=!0,o.ztreeSetting={zNodes:n(),isSort:!0,isSet:!1,isCheck:!1,selectedNodes:[]}},o.cancelSort=function(){o.isSort=!1,o.ztreeSetting={zNodes:n(),isSort:!1,isSet:!0,isCheck:!1,selectedNodes:[]}},o.sumbitSort=function(){var a=$.fn.zTree.getZTreeObj("groupSet");a.getNodes()[0].children?i.postData(i.api.organization+"saveOrganizationSort",{sorts:JSON.stringify(a.getNodes()[0].children)},function(i){o.root_organizations=t.userData.root_organizations=i,o.isSort=!1,o.ztreeSetting={zNodes:n(),isSort:!1,isSet:!0,isCheck:!1,selectedNodes:[]}}):o.isSort=!1},o.$on("addNode",function(n,a,e){i.confirmDialog(540,"新建组织机构",{},"tpl/group_save.html",function(n,r){r.modalForm.$valid?(r.isPosting=!0,i.postData(i.api.organization+"saveOrganization",{name:r.name,pid:e.id},function(i){n.close(),o.root_organizations=t.userData.root_organizations=i;for(var s="",g=0;g<o.root_organizations.length;g++)o.root_organizations[g].name==r.name&&(s=o.root_organizations[g].id);a.addNodes(e,{pid:e.id,name:r.name,id:s})})):r.isShowMessage=!0})}),o.$on("editNode",function(n,a,e){for(var r="",s=0;s<o.root_organizations.length;s++)e.id==o.root_organizations[s].id&&(r=o.root_organizations[s].name);if(""==e.name)e.name=r,i.alert("组名不能为空，请重新输入！","warning",!0,function(){a.editName(e)});else{if(e.name==r)return;i.postData(i.api.organization+"saveOrganization",{id:e.id,name:e.name},function(i){o.root_organizations=t.userData.root_organizations=i},function(o){e.name=r,a.editName(e),i.alert(o,"warning",!0)})}}),o.$on("delNode",function(n,a,e){i.confirm("删除","确定删除该组织机构"+e.name+" ?",function(n){n.close(),e.isParent?i.confirmAlert("删除组织机构","该机构包含子机构，请先删除子机构再进行删除！","warning"):i.postData(i.api.organization+"deleteOrganization",{id:e.id},function(n){o.root_organizations=t.userData.root_organizations=n,a.removeNode(e),i.alert("删除成功","success",!0)},function(o){i.confirmAlert("删除组织机构",o,"warning")})})})}]);