(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bb48e860"],{"0c43":function(e,t,a){"use strict";var r=a("b120"),n=a.n(r);n.a},"92de":function(e,t,a){"use strict";var r="https://eyeai.weinde.cn/newserver/apis";t["a"]={BASE_API:r}},"9b9e":function(e,t,a){"use strict";a.d(t,"d",(function(){return o})),a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return l}));var r=a("b775"),n=a("92de");function o(e){return Object(r["a"])({url:n["a"].BASE_API+"/permission/access",method:"get",params:e})}function i(e){return Object(r["a"])({url:n["a"].BASE_API+"/permission/access",method:"post",data:e})}function s(e){var t=n["a"].BASE_API+"/api/permission/access/"+e;return Object(r["a"])({url:t,method:"delete"})}function l(e,t){var a="https://eyeai.weinde.cn/covid-19/api/permission/access/"+e;return Object(r["a"])({url:a,method:"patch",data:t})}},b120:function(e,t,a){},eac6:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-row",{attrs:{id:"form-button"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addRole()}}},[e._v("添加角色")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"编号",width:"360"}}),a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),a("el-table-column",{attrs:{prop:"ctime",label:"日期"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),a("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":e.page.page_size,"current-page":e.page.page_no,total:e.page.total_count},on:{"current-change":e.handleCurrentChange}}),e.dialogFormVisible?a("el-dialog",{attrs:{title:1==e.dialogTitle?"添加角色":"修改角色",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-form-item",{attrs:{label:e.formFormat.name,"label-width":e.formLabelWidth,prop:"name"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:e.formFormat.type,"label-width":e.formLabelWidth}},[a("el-checkbox-group",{model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},e._l(e.dialogData,(function(t,r){return a("div",{key:r},[a("el-checkbox",{attrs:{label:t.id,name:"type"}},[e._v(e._s(t.name)+"--"+e._s(t.remark))])],1)})),0)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),1===e.dialogTitle?a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.confirmAdd("form")}}},[e._v("确 定")]):a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.editRole("form")}}},[e._v("修 改")])],1)],1):e._e()],1)},n=[],o=(a("b0c0"),a("96cf"),a("1da1")),i=a("9b9e"),s=a("b775"),l=a("92de");function c(e){return Object(s["a"])({url:l["a"].BASE_API+"/permission/role",method:"get",params:e})}function u(e){return Object(s["a"])({url:l["a"].BASE_API+"/permission/role",method:"post",data:e})}function m(e){var t=l["a"].BASE_API+"/permission/role/"+e;return Object(s["a"])({url:t,method:"get"})}function d(e){var t=l["a"].BASE_API+"/permission/role/"+e;return Object(s["a"])({url:t,method:"delete"})}function p(e,t){var a=l["a"].BASE_API+"/permission/role/"+e;return Object(s["a"])({url:a,method:"put",data:t})}var f={name:"Test",components:{},data:function(){return{repeatField:{name:"",type:[]},formFormat:{name:"角色名称",type:"权限"},tableData:[],dialogFormVisible:!1,form:{id:"",name:"",region:"",type:[]},formLabelWidth:"100px",dialogTitle:1,dialogData:[],rules:{name:[{required:!0,message:"请输入角色名称",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 50 个字符",trigger:"blur"}]},page:{page_no:1,page_size:1,total_count:1}}},created:function(){this.getAccessList(),this.getRoleList()},methods:{getRoleList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={page_no:1},t.next=3,c(a);case 3:r=t.sent,e.tableData=r.data.list,e.page.page_no=r.data.page_no,e.page.page_size=r.data.page_size,e.page.total_count=r.data.total_count;case 8:case"end":return t.stop()}}),t)})))()},getAccessList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["d"])();case 2:a=t.sent,e.dialogData=a.data.list;case 4:case"end":return t.stop()}}),t)})))()},handleEdit:function(e,t){var a=this;m(t.id).then((function(e){a.form.name=e.data.name,a.form.id=e.data.id;for(var t=[],r=e.data.access_list,n=0;n<r.length;n++)t.push(r[n]["id"]);a.form.type=t,a.repeatField.name=e.data.name,a.repeatField.type=t,a.dialogTitle=2,a.dialogFormVisible=!0}))},handleDelete:function(e,t){var a=this;this.$confirm("此操作将永久删除该角色, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){d(t.id).then((function(e){a.$message({type:"success",message:"删除成功!"}),a.getRoleList()}))})).catch((function(){a.$message({type:"info",message:"已取消删除"})}))},addRole:function(){this.form.name="",this.form.type=[],this.dialogTitle=1,this.repeatField.name="",this.repeatField.type=[],this.dialogFormVisible=!0},editRole:function(e){var t=this;this.$refs[e].validate((function(e){if(e){console.log(t.repeatField.name);var a={};t.repeatField.name!==t.form.name&&(a.role={name:t.form.name}),a.access_id_list=t.form.type,p(t.form.id,a).then((function(e){t.getRoleList(),t.dialogFormVisible=!1})).catch((function(e){var a=JSON.parse(e.message);t.dealCode1004(t.formFormat,a)}))}}))},confirmAdd:function(e){var t=this;this.$refs[e].validate((function(e){if(e){var a={role:{name:t.form.name},access_id_list:t.form.type};u(a).then((function(e){t.getRoleList(),t.dialogFormVisible=!1})).catch((function(e){var a=JSON.parse(e.message);t.dealCode1004(t.formFormat,a)}))}}))},handleCurrentChange:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r={page_no:e},a.next=3,c(r);case 3:n=a.sent,t.tableData=n.data.list,t.page.page_no=n.data.page_no,t.page.page_size=n.data.page_size,t.page.total_count=n.data.total_count;case 8:case"end":return a.stop()}}),a)})))()},dealCode1004:function(e,t){if(1004===t.error_code)for(var a in t.data)if(Object.prototype.hasOwnProperty.call(e,a)){var r=this.formFormat[a]+":"+t.data[a];this.$message({type:"error",message:r})}else this.$message({type:"error",message:a+":"+t.data[a]})}}},g=f,b=(a("0c43"),a("2877")),h=Object(b["a"])(g,r,n,!1,null,"acc4e29e",null);t["default"]=h.exports}}]);