define("webapp/views/share/play.js",["webapp/common/baseview","text!webapp/templates/share/play.html","webapp/models/models","common/lrcview","base/log","webapp/common/app","common/audioplay","webapp/common/oldapp"],function(require){var t=require("webapp/common/baseview"),e=require("text!webapp/templates/share/play.html"),s=require("webapp/models/models"),a=require("common/lrcview"),i=(require("base/log"),require("webapp/common/app"),require("common/audioplay")),o=require("webapp/common/oldapp"),n="header-opacity",r=s.MasterInfoModel.createLazyFun(),l=(s.ListenerHeartBeatModel.createLazyFun(),s.ListenerLeaveModel.createLazyFun(),s.LrcDownloadModel.createLazyFun()),h=s.SongSerachModel.createLazyFun(),c=s.SharePvCountPutModel.createLazyFun(),u=s.SharePvCountGetModel.createLazyFun(),p=navigator.userAgent.match(/ios|ipad|iphone|ipod/i)?"http://www.ttpod.com/head/platdown?platformCode=s300":"http://www.ttpod.com/head/platdown?platformCode=s200";return t.extend({onCreate:function(){this.el.html(e),this.el_bgimg=this.$(".js_bgimg"),this.el_name=this.$(".js_name"),this.el_avatar=this.$(".js_avatar"),this.el_songinfo=this.$(".js_songinfo"),this.el_lrcbox=this.$(".js_lrcbox"),this.audioplay=new i,this.el_playstatus=this.$(".play-status"),this.el_statususerempty=this.$(".status-user-empty")},events:{"click .js_openapp":"toOpenApp"},toOpenApp:function(){var t=this;o.send(""),this.showLoading(),setTimeout(function(){this.hideLoading(),this.showAlert("没有安装app，是否跳转下载?",[{title:"确定",click:function(){t.showLoading(),this.hide(),window.location.href=p}},{title:"取消",click:function(){this.hide()}}]),setTimeout(function(){this.hideAlert()}.bind(this),3e3)}.bind(this),2e3)},userInfo:{},onLoad:function(){this.playstatus="none",this.setBackground("url("+defaultCover+") no-repeat center center","100% 100%!important"),this.el_playstatus.hide(),this.el_statususerempty.show();this._setHeader(2),this.masterId=this.$Q("masterid"),this.loopMasterStatus(this.masterId),this.el_avatar.hide(),this.turning("notanimte"),this.hideToast();var t=c();t.setParam("link",location.href),t.request({success:function(){this.loadListenerSize()}},this)},_setHeader:function(t){this.setHeader({cls:"center-header",title:t+"个好友一起听",hideRightBtn:!0,hideLeftBtn:!0})},uploadMasterInfo:function(t){this.showLoading();var e=r();e.setParam("masterid",t),e.setType("GET"),e.request({success:function(t){t&&t.data?(this.userInfo=t.data,this.renderMasterInfo(t.data)):this.showToast("TA已经停止播放了~!",3)},error:function(){this.showToast("TA已经停止播放了~!",3)},complete:function(){this.hideLoading()}},this)},renderMasterInfo:function(t){t.albumPicUrl?this.setBackground("url("+t.albumPicUrl+") no-repeat center center","auto 100%!important"):this.setBackground("url("+defaultCover+") no-repeat center center","100% 100%!important"),t.albumPicUrl&&this.getRootBg().css({"-webkit-filter":"blur(5px)",filter:"blur(5px)"}),this.el_name.html(t.nickName),this.el_avatar.attr("src",t.picUrl||defaultHand),this.el_avatar.show(),this.$(".l-songname").html(t.songName),this.$(".l-singler").html(t.singerName)},loopMasterStatus:function(t){var e=r();e.setParam("masterid",t);var s=!0;e.loopRequest(2,{success:function(t){this.userInfo=t.data,this.controPlay(t.data,s),s=!1}},this)},playstatus:"none",checkChnage:function(t){var e=!1,s=[t.songId,t.position,t.action,t.time].join(",");return s!=this.playstatus&&(e=!0),this.playstatus=s,e},controPlay:function(t,e){if(this.checkChnage(t)||e)switch(t.action){case 0:case 1:case 3:case 5:var s=this.lastPlayInfo&&this.lastPlayInfo.songId==t.songId&&this.lastPlayInfo.action==t.action&&this.lastPlayInfo.time==t.time;s?this.audioplay.play():this.loadSong(t.songId,function(t){this.audioplay.setSrc(t),this.audioplay.play()}),this.uploadLrc(t.songId),this.renderMasterInfo(t),this.el_playstatus.show(),this.el_statususerempty.hide();break;case 2:this.audioplay.pause(),this.el_playstatus.hide(),this.el_statususerempty.show();break;case 4:this.el_playstatus.hide(),this.el_statususerempty.show()}this.lastPlayInfo=t},lastPlayInfo:null,lrcview:null,uploadLrc:function(t){var e=l(),s=this;e.setParam("id",t),e.request({success:function(t){t=t.replace(/<[^<>]+>/g,""),s.lrcview=new a({wraper:s.el_lrcbox,lrc:t}),s.listenAppPlayStatus()},error:function(){s.lrcview=new a({wraper:s.el_lrcbox,lrc:"[00:00.00]未匹配到歌词，随着节拍哼唱吧~"})}})},listenAppPlayStatus:function(){var t=this;this.audioplay.on("all",function(){var e=parseInt(this.audioplay.getCurPos());t.lrcview.pos(e)}.bind(this))},loadSong:function(t,e){var s=h();s.setParam("song_id",t),s.request({success:function(t){var s=t&&t.data&&t.data[0],a=s&&s.url_list&&(s.url_list[1]||s.url_list[0]||{}).url;e&&e.call(this,a)}},this)},loadListenerSize:function(){var t=u();t.setParam("link",location.href),t.loopRequest(5,{success:function(t){var e=parseInt(t&&t.data)||2;e=2>e?2:e,this._setHeader(e)}},this)},onShow:function(){this.getHeaderRoot().addClass(n)},onHide:function(){this.getHeaderRoot().removeClass(n),this.audioplay.pause(),r().endLoopRequest()}})});