define("webapp/common/userslide.js",["base/base","ui/slide"],function(require){var e=require("base/base"),i=require("ui/slide"),t="l-page-wraper",s='<table><tr><td><div class="'+t+'"></div></td></tr></table>';return i.extend({propertys:function(){this.pageSize=3,this.itemTemplate=_.template(['<div class="h-list-item">','<div class="l-p-info">','<div class="l-p-avatar"><img src="<%=pic%>"/></div>','<div class="l-p-name"><%=nickname%></div>',"</div>","</div>"].join("")),this.userItems=[],this.on("create",function(){this.emit("update")}),this.on("update",function(){this.update()})},initialize:function($super,e){e=e||{},e.items=[],$super(e)},setOption:function($super,e){$super(e),e.pageSize&&(this.pageSize=e.pageSize),e.itemTemplate&&(this.itemTemplate=e.itemTemplate),e.userItems&&(this.userItems=e.userItems)},setUserItems:function(e){this.userItems=e},update:function(){this.subbox.empty(),this.$el.find(".ui-slide-nav").empty();var i={},a=this;this.userItems=this.userItems||[],e.each(this.userItems,function(e,t){t+=1;var s=Math.ceil(t/a.pageSize);pageitems=i[s]=i[s]||[],pageitems.push(a.itemTemplate(e))});var n=Math.ceil(this.userItems.length/this.pageSize);1>=n&&this.$el.find(".ui-slide-nav").hide(),e.each(i,function(e,i){var n=e.join(""),m=$(s);m.find("."+t).html(n);var h=m.find(".h-list-item"),l=100/h.length;h.css("width",l+"%"),a.add(m)}),this.emit("resize")}})});