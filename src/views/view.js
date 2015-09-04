define(function(require){
	var MvcView = require('webapp/common/baseview'),
		html = require('text!webapp/templates/view.html');
	var Models = require('webapp/models/models');
	var Stores = require('webapp/stores/stores');
	var L = require('SINGLE/base/log');
	var UiDialog = require('SINGLE/ui/dialog');

	var DoToStore = Stores.TodoListStore.getInstance();

	var getUiDialog = UiDialog.createLazyFun();

	var noop = function(){};



	return MvcView.extend({
		onCreate:function(){
			this.el.html(html);
			this.eledit = this.el.find('#edit');
		},
		events:{
			'click textarea':function(e){
				e.currentTarget.focus();
			}
		},
		onLoad:function(lastview){
			var self = this;
			this.id = this.$Q('id');
			this.obj = DoToStore.getOne(this.id);
			this.updatePage();
			this.setHeader({
				
				title:this.obj ? '编辑' : '新增',
				leftHandle:function(){
					getUiDialog().show({
						content:"确认要离开吗？",
						buttons:[
							{
								title:'确认',
								click:function(){
									this.hide();
									self.back('index');
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
				},
				rightTitle:'<span class="icon-add"></span>完成',
				rightHandle:function(){
					this.save();
					
				}
			});
			if(this.isHeaderHidden()){
				this.showHeader();
			}
			this.turning();
			setTimeout(function(){
				this.hideLoading();
			}.bind(this),300);
		},
		save:function(){
			var content = this.eledit.val();
			if(!content){
				this.showToast('请输入内容!',3);
				return;
			}
			if(this.obj){

				DoToStore.edit(this.obj.id,content);
			}else{
				DoToStore.add(content);
			}
			this.back('index');
		},
		updatePage:function(){
			this.eledit.val('');
			if(this.obj){
				this.eledit.val(this.obj.content);
			}
		},
		onShow:function(){
		},
		onHide:function(){
		}
	});
});