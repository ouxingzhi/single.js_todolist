define(function(require){
	var BaseStore = require('SINGLE/storage/local.store');
	var CommonFuns = require('SINGLE/common/funs');
	var Base = require('SINGLE/base/base');

	var S = {};
	S.TodoListStore = BaseStore.extend({
		buildName:function(){
			return 'TODOLIST';
		},
		buildTimeout:function(){
			return '100Y';
		},
		getCurId:function(){
			return this.getAttr('maxId') || 1;
		},
		add:function(content){
			var id = this.getCurId()+1;
			var list = this.getAttr('list') || [];
			list.push({
				id:id,
				content:content,
				date:+new Date()
			});
			this.setAttr('list',list);
			this.setAttr('maxId',id);
			return id;
		},
		edit:function(id,content){
			var obj = this.getOne(id);
			var index = obj.index;
			var list = this.getAttr('list') || [];
			obj.content = content;
			obj.date = +new Date();
			delete obj.index;
			list[index] = obj;
			this.setAttr('list',list);
		},
		del:function(id){
			var obj = this.getOne(id);
			var index = obj.index;
			var list = this.getAttr('list') || [];
			list.splice(index,1);
			this.setAttr('list',list);
		},
		getOne:function(id){
			var list = this.getAttr('list') || [];
			var obj;
			Base.each(list,function(o,i){
				if(o.id == id){
					o.index = i;
					obj = o;
					return true;
				}
			});
			return obj;
		},
		getAll:function(){
			return this.getAttr('list') || [];
		}
	});
	return S;
});