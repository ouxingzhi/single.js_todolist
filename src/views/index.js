define(function(require){
	var MvcView = require('webapp/common/baseview');
	var Models = require('webapp/models/models');
	var Stores = require('webapp/stores/stores');
	var UiDialog = require('SINGLE/ui/dialog');

	var html = require('text!webapp/templates/index.html');


	var DoToStore = Stores.TodoListStore.getInstance();

	var getUiDialog = UiDialog.createLazyFun();

	return MvcView.extend({
		onCreate:function(){
			this.el.html(html);

			this.ellist = this.$('.list');
			this.tpllist = this.$T('#tpl-todolist-item');
		},
		events:{
			'click .js_add':function(){
				this.showLoading();
				this.forward('view');
			},
			'click .todolist li':function(e){
				var el = $(e.currentTarget);
				var id = el.attr('data-id');
				if(!id) return;
				var target = $(e.target);
				var self = this;
				if(target.hasClass('del')){
					getUiDialog().show({
						content:"确认要删除吗？",
						buttons:[
							{
								title:'确认',
								click:function(){
									this.hide();
									DoToStore.del(id);
									self.updatePage();
								}
							},
							{
								title:'取消',
								click:function(){
									this.hide();
								}
							}
						]
					});
					return;
				}
				this.showLoading();
				this.forward('view?id='+el.attr('data-id'));
			}
		},
		onLoad:function(lastview){
			var $ = this.$;
			this.setHeader({
				
				title:'TODOLIST',
				leftHandle:function(){

				},
				hideLeftBtn:true,
				rightTitle:'<span class="icon-add"></span>添加',
				rightHandle:function(){
					this.showLoading();
					this.forward('view');
				}
			});

			this.updatePage();
			this.turning();

		},
		updatePage:function(){
			var list = DoToStore.getAll();
			this.ellist.html(this.tpllist({list:list}));
		},
		onShow:function(){
			
		},
		onHide:function(){
		}
	});
});