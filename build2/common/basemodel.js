define("webapp/common/basemodel.js",["model/form.model"],function(require){var n=require("model/form.model");return n.extend({propertys:function(){},initialize:function($super,n){$super(n)},buildBaseUrl:function(){return"http://api.liveroom.ttpod.com/liveroom"},buildParam:function(){return null},buildResult:function(){return null}})});