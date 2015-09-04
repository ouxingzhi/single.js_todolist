define(function(require){
	var BaseModel = require('SINGLE/model/form.model');
	
	return BaseModel.extend({
		propertys:function(){

		},
		initialize:function($super,options){
			$super(options);
		},
		buildBaseUrl:function(){
			return 'http://api.liveroom.ttpod.com/liveroom';
			//return 'http://58.215.179.69:14004/liveroom';
			//return 'http://192.168.1.37:14004/liveroom'
			//return 'http://phpcode.jd-app.com';
		},
		buildParam:function(){
			return null;
		},
		buildResult:function(){
			return null;
		}
	});
});