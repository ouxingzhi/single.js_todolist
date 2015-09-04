define(function(require){
	var BaseView = require('SINGLE/mvc/view');
	var Models = require('webapp/models/models');
	var Stores = require('webapp/stores/stores');
	require('webapp/common/global.const');


	var CLS_LEFTBTN = 'head-left-btn',
		CLS_TITLE = 'head-title',
		CLS_RIGHTBTN = 'head-right-btn';
	var headertpl = [
		'<span class="btn '+CLS_LEFTBTN+'"<%if(hideLeftBtn){%> style="display:none"<%}%>></span>',
		'<h3 class="'+CLS_TITLE+'"><%=title%></h3>',
		'<span class="btn '+CLS_RIGHTBTN+'"<%if(hideRightBtn){%> style="display:none"<%}%>><%=rightTitle%></span>'
	].join('');
	return BaseView.extend({
		propertys:function(){
		},
		initialize:function($super,options){
			$super(options);
		},
		/**
		 * @param options
		 * 		|- title 标题
		 *		|- leftHandle 左边按键的回调
		 *		|- rightHandle 右边按键的回调
		 *		|- rightTitle 标题
		 */
		setHeader:function(options){
			var events = {};
			if(options.leftHandle){
				events['click .'+CLS_LEFTBTN] = options.leftHandle;
			}
			if(options.rightHandle){
				events['click .'+CLS_RIGHTBTN] = options.rightHandle
			}
			this.toHead(this.id,{
				template:headertpl,
				cls:options.cls,
				data:{
					title:options.title,
					rightTitle:options.rightTitle,
					hideRightBtn:options.hideRightBtn,
					hideLeftBtn:options.hideLeftBtn
				},
				events:events,
				notAnimte:options.notAnimte,
				space:this
			});
		},
		isHeaderHidden:function(){
			return !this.frame.header.box.height();
		},
		setBackground:function(backround,size){
			var bg = this.getRootBg();
			bg.css('background',backround);
			if(size){
				bg.css('background-size',size);
			}
		},
		$T:function(selector){
			return _.template(this.$(selector).html());
		},
		back:function(url){
			location.hash = url;
		}
	});

	return BaseView;
});