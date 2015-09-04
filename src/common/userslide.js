define(function(require){
	var Base = require('SINGLE/base/base');
	var UiSlide = require('SINGLE/ui/slide');

	var CLS_PAGE_WRAPER = 'l-page-wraper';

	var TPL_PAGE = '<table><tr><td><div class="'+CLS_PAGE_WRAPER+'"></div></td></tr></table>'

	return UiSlide.extend({
		propertys:function(){
			this.pageSize = 3;
			this.itemTemplate = _.template([
				'<div class="h-list-item">',
					'<div class="l-p-info">',
						'<div class="l-p-avatar"><img src="<%=pic%>"/></div>',
						'<div class="l-p-name"><%=nickname%></div>',
					'</div>',
				'</div>'
			].join(''));
			this.userItems = [];

			this.on('create',function(){
				this.emit('update');
			});
			this.on('update',function(){
				this.update();
			});
		},
		initialize:function($super,options){
			options = options || {};
			options.items = [];
			$super(options);
		},
		setOption:function($super,options){
			$super(options);
			//一页放几个icon
			if(options.pageSize){
				this.pageSize = options.pageSize;
			}
			//单项的模版
			if(options.itemTemplate){
				this.itemTemplate = options.itemTemplate;
			}
			//数据变化
			if(options.userItems){
				this.userItems = options.userItems;
			}
		},
		setUserItems:function(userItems){
			this.userItems = userItems;
		},
		update:function(){
			this.subbox.empty();
			this.$el.find('.ui-slide-nav').empty();
			var pages = [],pagecontent={},self = this;
			this.userItems = this.userItems || [];
			Base.each(this.userItems,function(user,i){
				i+=1;
				var pageid = Math.ceil(i/self.pageSize);
				pageitems = pagecontent[pageid] = pagecontent[pageid] || [];
				pageitems.push(self.itemTemplate(user));
			});
			var totalpage = Math.ceil(this.userItems.length/this.pageSize);
			if(totalpage <= 1){
				this.$el.find('.ui-slide-nav').hide();
			}
			Base.each(pagecontent,function(list,i){
				var page = list.join('');
				var pagebox = $(TPL_PAGE);
				pagebox.find('.'+CLS_PAGE_WRAPER).html(page);
				var items = pagebox.find('.h-list-item');
				var w = 100 / items.length;
				items.css('width',w+'%');
				self.add(pagebox);
			});
			this.emit('resize');
		}
	});
});