define("webapp/views/master/home.js",["webapp/common/baseview","common/lrcview","webapp/common/app","text!webapp/templates/master/home.html","webapp/common/userslide","webapp/models/models","base/log"],function(require){var e=require("webapp/common/baseview"),t=require("common/lrcview"),i=require("webapp/common/app"),s=require("text!webapp/templates/master/home.html"),n=require("webapp/common/userslide"),o=require("webapp/models/models"),a=require("base/log"),r=o.ListenerOfMyModel.createLazyFun(),l=o.MasterInfoModel.createLazyFun(),c=o.LrcDownloadModel.createLazyFun(),u="header-opacity";return e.extend({onCreate:function(){this.el.html(s),this.el_bg=this.$(".js_bg"),this.el_songinfo=this.$(".js_songinfo"),this.el_lrcbox=this.$(".js_lrcbox")},events:{"click .topage":"toPage"},toPage:function(){this.forward("friend/list")},onLoad:function(e){this.setHeader({title:"我们在听",leftHandle:function(){this.back("home")},rightTitle:'<span class="icon-share"></span>',rightHandle:function(){this.getUid(function(e){this.forward("share/master?masterid="+e._id)})}}),this.createSlide(),this.getUid(function(e){this.uploadListenerList(e),this.uploadMasterStatus(e)}),this.isHeaderHidden()&&this.showHeader();var t="";"index"==e&&(t="notanimte"),this.turning(t)},uploadListenerList:function(e){var t=r();t.setParam("uid",e._id),t.loopRequest(5,{success:function(e){this.renderListenerList(e.data)},error:function(){},complete:function(){}},this)},lastIds:"none",renderListenerList:function(e){var t=_.map(e,function(e){e.listenerId}).join(",");this.lastIds!=t&&(this.slide.setUserItems(this.formatUserItems(e)),this.slide.update()),this.lastIds=t},formatUserItems:function(e){return _.map(e,function(e){return{nickname:e.nickName,pic:e.picUrl||defaultHand}})},createSlide:function(){this.slide=this.slide=new n({container:this.$(".h-listenlist-box"),userItems:[]}),this.slide.show()},uploadMasterStatus:function(e){var t=l();t.setParam("masterid",e._id),this.showLoading(),t.request({success:function(e){this.updateSongInfo(e.data||{})},complete:function(){this.hideLoading()}},this)},updateSongInfo:function(e){e.albumPicUrl?this.setBackground("url("+e.albumPicUrl+") no-repeat center center","auto 100%"):this.setBackground("url("+defaultCover+") no-repeat center center","100% 100%!important"),this.el_songinfo.html((e.songName||"")+" "+(e.singerName||"")),e.albumPicUrl&&this.getRootBg().css({"-webkit-filter":"blur(5px)",filter:"blur(5px)"}),this.uploadLrc(e.songId)},lrcview:null,uploadLrc:function(e){var i=c(),s=this;i.setParam("id",e),i.request({success:function(e){e=e.replace(/<[^<>]+>/g,""),window.lrcview=s.lrcview=new t({wraper:s.el_lrcbox,lrc:e}),s.listenAppPlayStatus()},error:function(){window.lrcview=s.lrcview=new t({wraper:s.el_lrcbox,lrc:"[00:00.00]未匹配到歌词，随着节拍哼唱吧~"}),s.endListenAppPlayStatus()}})},listenAppPlayStatus:function(){i.listenPlayInfo({callback:function(e){a.log(JSON.stringify(e)),this.lrcview.pos(parseInt(e.position/1e3))},error:function(){}},this)},endListenAppPlayStatus:function(){i.unListenPlayInfo({callback:function(){},error:function(){}})},onShow:function(){this.getHeaderRoot().addClass(u)},onHide:function(){this.getHeaderRoot().removeClass(u),this.endListenAppPlayStatus(),r().endLoopRequest()}})});