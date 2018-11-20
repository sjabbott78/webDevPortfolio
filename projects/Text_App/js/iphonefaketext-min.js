/*********************************
*	Lasantha Kumara Gamage
*	iphonefaketext.com  version 3
*	2017-8-25
*	lkgamage@gmail.com
*********************************/

$(document).ready(function(e){App.init();$('.toggle').toggles({width:60,on:!0});$('.toggle').on('toggle',App.statusUpdated);$('#options').click(function(){$('#status_bar').toggle('fast',function(){if(!$(this).hasClass('init')){$('#battery').sGlide({'height':12,'startAt':App.status.battery,'colorStart':'#157efb','colorEnd':'#157efb','image':'images/knob.png',drag:function(o){App.status.battery=o.value?Math.ceil(o.value):4;App.start()}});$('#signal').sGlide({'height':12,'startAt':App.status.signal*20,'colorStart':'#157efb','colorEnd':'#157efb','image':'images/knob.png',drag:function(o){App.status.signal=o.value?Math.ceil(o.value/20):1;App.start()}});$(this).addClass('init')}})});$('#theme').change(App.setTheme);$('#operator, #network').change(App.draw);$('#contact_name').keyup(App.draw).on('paste',App.draw);$('#msgtime').timepicki();$('#msgdate').datepicker();$('#message').keyup(App.autoPost);$('#msg_image').bind('change',App.addImage)});var context,cmask,dimg;var App={};App.mode='compose';App.replay={total:0,current:-1,frame:0};App.config={width:400,height:710,innerWidth:376,innerHeight:575,margin:12,bubblew:260,lineHeight:16,lineGap:5,headerHeight:78.5,footerHeight:57,viewHeight:575};App.status={name:'Friend',battery:80,show_batt:!0,gps:!0,signal:2,op:'AT&T',net:'4g',theme:'b'}
App.meta={loaded:0,total:6,scroll:0,edit:0,editId:null};App.tmp={width:1,height:1}
App.bubble={b:15,c:20};App.themes={color:null,gray:'#e4e4e9',sys:'#6d6c72',black:'#000000',white:'#FFFFFF'};App.messages=[];App.imgs={tpl:null,wifi:null,sent:null,resv:null,battry:null,battry_empty:null,gps:null,blur:null};App.slider={x:0,h:0,delta:0};App.init=function(){var canvas=document.getElementById('canvas');context=canvas.getContext('2d',{alpha:!1});context.lineWidth=1;App.imgs.tpl=new loader("images/template.png");App.imgs.wifi=new loader('images/wifi.png');App.imgs.battry=new loader('images/battry.png');App.imgs.battry_empty=new loader('images/battry-empty.png');App.imgs.gps=new loader('images/gps.png');App.imgs.blur=new loader('images/blur.png');App.messages=[];App.setTheme();$("#slider").draggable({axis:"y",drag:function(e,ui){if(ui.position.top<77){ui.position.top=78}
if(ui.position.top>556){ui.position.top=555}
App.slider.x=(ui.position.top-78)/477;App.draw()}})}
App.start=function(){App.draw()}
App.statusUpdated=function(e,active){if(e.currentTarget.id=='battery_percent'){App.status.show_batt=active}
else if(e.currentTarget.id=='gps'){App.status.gps=active}
App.draw()}
App.autoPost=function(e,k){if(e.keyCode==13){if(App.messages.length==0){App.add(0)}
else{m=App.messages[App.messages.length-1];if(m.dir==1){App.add(0)}
else{App.add(1)}}}}
App.add=function(dir,dontdraw){msg=$('#message').val();if(!msg){return}
msgtime=$('#msgtime').val();msgdate=$('#msgdate').val();var dt;if(msgtime||msgdate){context.font='12px Verdana';if(msgtime&&msgdate){ud=msgdate.split('/');ut=msgtime.split(/[: ]/);if(ut[2]=='PM'){ut[0]=parseInt(ut[0])+12}
dt=new Date(parseInt(ud[2]),parseInt(ud[0])-1,parseInt(ud[1]),parseInt(ut[0]),parseInt(ut[1]));ts=timeTostring(0,dt)}
else if(msgdate){ud=msgdate.split('/');dt=new Date(parseInt(ud[2]),parseInt(ud[0])-1,parseInt(ud[1]));ts=timeTostring(40,dt);dt=getDateTime(40,dt)}
else if(msgtime){cd=new Date();ud=[cd.getMonth(),cd.getDate(),cd.getFullYear()];ut=msgtime.split(/[: ]/);if(ut[2]=='PM'){ut[0]=parseInt(ut[0]);if(ut[0]!=12){ut[0]+=12}}
dt=new Date(parseInt(ud[2]),parseInt(ud[0]),parseInt(ud[1]),parseInt(ut[0]),parseInt(ut[1]));ts=timeTostring(0,dt)}
skip=!1;if(!App.messages||App.messages.length>=0){var dd=new Date(dt.getTime());for(k=App.messages.length-1;k>=0;k--){if(App.messages[k].isSys()){if(dd.getTime()<App.messages[k].time.getTime()){dif=Date.now()-App.messages[k].time.getTime();nd=getDateTime(-1*(dif/60000),dd);ns=timeTostring(0,nd);App.messages[k].msg=ns;App.messages[k].width=context.measureText(ns).width;App.messages[k].time=nd;if(dd.getTime()-nd.getTime()<3600000){skip=!0}}
else if(dd.getTime()-App.messages[k].time.getTime()<3600000){skip=!0}
dd=new Date(App.messages[k].time.getTime())}}}
if(!skip){dim=context.measureText(ts);var g=new Message(ts,dir,1);g.width=dim.width;g.height=12+App.config.margin;g.lines=1;g.time=dt;App.messages.push(g)}}
else if(!App.messages||App.messages.length==0){context.font='12px Verdana';ts=timeTostring(-5);dim=context.measureText(ts);var g=new Message(ts,dir,1);g.width=dim.width;g.height=12+App.config.margin;g.lines=1;g.time=getDateTime(-5);App.messages.push(g)}
dim=App.calc(msg);msg=$.trim(msg);var m=new Message(dim.text,dir,0);m.width=dim.width;m.height=dim.height;m.lines=dim.lines;App.messages.push(m);if(!dontdraw){App.reorder();App.draw()}
$('#message').val('');$('#msgtime').val('');$('#msgdate').val('')}
App.addImage=function(e){if(!e.target.files||!e.target.files[0]){return}
$('#imgc').html('loading...');iurl=URL.createObjectURL(e.target.files[0]);dimg=new Image();dimg.onload=function(){mwidth=200;mheight=150;if(dimg.width<mwidth&&dimg.height<mheight){iw=dimg.width;ih=dimg.height}
else if(dimg.width>=dimg.height){iw=mwidth;ih=Math.round((mwidth/dimg.width)*dimg.height)}
else{ih=mheight;iw=Math.round((mheight/dimg.height)*dimg.width)}
cw=iw;ch=ih;App.tmp.width=iw*2;App.tmp.height=ih*2;App.tmp.deltax=Math.round((dimg.width-iw)/4);App.tmp.deltay=Math.round((dimg.height-ih)/4);App.tmp.ow=dimg.width;App.tmp.oh=dimg.height;App.tmp.step=0;tmp=new Image();tmp.src=dimg.src;dimg.onload=function(){App.tmp.step++;if(App.tmp.step==3){$('#imgc').html('<canvas width="'+(App.tmp.width/2)+'" height="'+(App.tmp.height/2)+'" style="width:'+(App.tmp.width/2)+'px; height:'+(App.tmp.height/2)+'px;" id="cmask"></canvas>');cmask=document.getElementById('cmask').getContext('2d');cmask.clearRect(0,0,App.tmp.width/2,App.tmp.height/2);cmask.drawImage(dimg,0,0,dimg.width,dimg.height,0,0,App.tmp.width/2,App.tmp.height/2);cmask=document.getElementById('stepdown').getContext('2d')}
else{xw=App.tmp.ow-App.tmp.step*App.tmp.deltax;xh=App.tmp.oh-App.tmp.step*App.tmp.deltay;$('#dark').html('<canvas width="'+xw+'" height="'+xh+'" style="width:'+xw+'px; height:'+xh+'px;" id="stepdown"></canvas>');ctx=document.getElementById('stepdown').getContext('2d');ctx.drawImage(tmp,0,0,tmp.width,tmp.height,0,0,xw,xh);dimg.src=document.getElementById('stepdown').toDataURL()}};dimg.src=dimg.src};dimg.src=iurl;$('#textmsg').css({display:'none'});$('#imagemsg').css({display:'block'})}
App.sendImage=function(dir){$('#message').val('[image]');App.add(dir,!0);w=App.tmp.width;h=App.tmp.height;b=App.bubble.b*2;c=App.bubble.c*2;cmask.clearRect(0,0,w,h);cmask.globalCompositeOperation='source-over';cmask.fillStyle=App.themes.gray;cmask.strokeStyle=App.themes.gray;if(dir==0){cmask.beginPath();cmask.moveTo(c,0);cmask.lineTo(w-b-c,0);cmask.arc(w-b-c,c,c,1.5*Math.PI,0);cmask.lineTo(w-b,h-b);cmask.arc(w,h-b,b,Math.PI,0.6*Math.PI,!0);cmask.arc(w-0.5*b,h-1.5*b,1.5*b,0.55*Math.PI,0.75*Math.PI);cmask.arc(w-c-b,h-c,c,0,0.5*Math.PI);cmask.lineTo(c,h);cmask.arc(c,h-c,c,0.5*Math.PI,Math.PI);cmask.lineTo(0,c);cmask.arc(c,c,c,Math.PI,1.5*Math.PI);cmask.closePath();cmask.fill();cmask.stroke()}
else{cmask.beginPath();cmask.moveTo(c+b,0);cmask.lineTo(w-c,0);cmask.arc(w-c,c,c,1.5*Math.PI,0);cmask.lineTo(w,h-c);cmask.arc(w-c,h-c,c,0,0.5*Math.PI);cmask.lineTo(c+b,h);cmask.arc(b+c,h-c,c,0.5*Math.PI,0.75*Math.PI);cmask.arc(0.5*b,h-1.5*b,1.5*b,0.3*Math.PI,0.55*Math.PI);cmask.arc(0,h-b,b,0.45*Math.PI,0,!0);cmask.lineTo(b,c);cmask.arc(b+c,c,c,Math.PI,1.5*Math.PI);cmask.closePath();cmask.fill();cmask.stroke()}
cmask.globalCompositeOperation='source-in';cmask.drawImage(dimg,0,0,dimg.width,dimg.height,0,0,w,h);var mi=App.messages.length-1;App.messages[mi].type=2;App.messages[mi].width=w/2;App.messages[mi].height=h/2;if(dir==0){App.messages[mi].x=App.config.width-App.config.margin-w}
else{App.messages[mi].x=App.config.margin}
App.reorder();var tm=new Image();App.messages[mi].msg=tm;tm.onload=App.draw;tm.src=document.getElementById('stepdown').toDataURL();App.cancelAddImage()}
App.cancelAddImage=function(){$('#imagemsg').css({display:'none'});$('#textmsg').css({display:'block'}).find('textarea')[0].focus()}
App.reorder=function(){if(App.messages&&App.messages.length>0){tp=App.config.margin;for(n=0;n<App.messages.length;n++){App.messages[n].y=tp;if(App.messages[n].isImage()){if(App.messages[n].isIn()){App.messages[n].x=App.config.margin}
else{App.messages[n].x=App.config.width-(App.messages[n].width+App.config.margin)}}
else if(App.messages[n].isSys()){App.messages[n].x=(App.config.width-App.messages[n].width)/2;if(n>0&&App.messages[n-1].dir==App.messages[n+1].dir){App.messages[n].y+=App.config.margin;tp+=App.config.margin}}
else if(App.messages[n].isIn()){App.messages[n].x=App.config.margin+App.bubble.b}
else{App.messages[n].x=App.config.width-(App.messages[n].width+App.config.margin+App.bubble.b)}
if(n<App.messages.length-1&&App.messages[n+1]&&App.messages[n+1].dir==App.messages[n].dir){App.messages[n].talk=!1;tp+=3+App.messages[n].height}
else{tp+=App.messages[n].height+App.config.margin;App.messages[n].talk=!0}
if(n<App.messages.length-1&&App.messages[n+1]&&App.messages[n+1].isSys()){App.messages[n].talk=!0}}
App.slider.h=tp;if(tp>575){$('#scrollbar, #slider').css({display:'block'});$('#slider').css({top:555});App.slider.x=1}
else{$('#scrollbar, #slider').css({display:'none'})}}}
App.calc=function(msg){wd=msg.split(' ');txt=[];ti=0;mw=0;line='';App.font();for(i=0;i<wd.length;i++){line+=wd[i]+" ";nv=(wd.length>i+1)?wd[i+1]:'';if(context.measureText(line+" "+nv).width>App.config.bubblew){txt[ti]=$.trim(line);line="";ti++}}
txt[ti]=$.trim(line);ti++;if(txt){for(l=0;l<txt.length;l++){tw=context.measureText(txt[l]);if(tw.width>mw){mw=tw.width}}}
mh=(ti*App.config.lineHeight)+(ti-1)*App.config.lineGap+(2*App.config.margin);if(mw<20){mw=20}
return{text:txt,lines:ti,width:mw+(2*App.config.margin),height:mh}}
App.setTheme=function(){grd=context.createLinearGradient(0,0,0,660);if($('#theme').val()=='b'){grd.addColorStop(0,'#5abaf9');grd.addColorStop(1,'#3581fd')}
else{grd.addColorStop(0,'#0ff551');grd.addColorStop(1,'#0ecd45')}
App.themes.color=grd;App.draw()}
App.draw=function(){if(App.mode=='replay'){App.replay.frame++;console.log(App.replay.frame);if(App.replay.frame>App.replay.total+1){App.mode='compose';App.sendGif();return}
App.replay.current++;if(App.messages[App.replay.current]){if(App.messages[App.replay.current].isSys()){App.replay.current++}
if(App.messages[App.replay.current].y+App.messages[App.replay.current].height<575){App.slider.delta=App.config.headerHeight}
else{App.slider.delta=575-(App.messages[App.replay.current].y+App.messages[App.replay.current].height)+App.config.headerHeight}}}
else{App.slider.delta=App.config.headerHeight-Math.round((App.slider.h-575)*App.slider.x)}
console.log(App.slider.delta);App.whiteTheme();context.fillRect(0,0,400,710);if(App.messages&&App.messages.length>0){for(t=0;t<App.messages.length;t++){if(App.mode=='replay'&&(t>App.replay.current||App.replay.current<0)){break}
if((App.messages[t].y+App.slider.delta<0)||App.messages[t].y+App.slider.delta>700){continue}
if(App.messages[t].isImage()){App.drawImage(App.messages[t])}
else if(App.messages[t].isSys()){App.drawSysMsg(App.messages[t])}
else if(App.messages[t].isIn()){App.drawInMsg(App.messages[t],t)}
else if(App.messages[t].isOut()){App.drawOutMsg(App.messages[t],t)}}}
context.globalAlpha=0.95;context.drawImage(App.imgs.tpl,0,0);context.globalAlpha=1;App.blackTheme();context.fillRect(364,8,(Math.floor(App.status.battery/4)),10);for(var i=0;i<5;i++){if(i<App.status.signal){context.drawImage(App.imgs.battry,8+(i*9),9)}
else{context.drawImage(App.imgs.battry_empty,8+(i*9),9)}}
context.font='14px Helvetica';context.fillStyle="#000000";context.fillText(getOperator(),56,18);if($('#network').val()=='wifi'){offset=context.measureText(getOperator()).width
context.drawImage(App.imgs.wifi,58+offset,4)}
time=getCurrentTime();context.font='bold 15px Helvetica';wt=context.measureText(time).width;context.fillText(time,Math.round((400-wt)/2),18);leftoff=360;if(App.status.show_batt){context.font='14px Helvetica';txt=App.status.battery+"%";wt=context.measureText(txt).width;context.fillText(txt,Math.round(360-wt),18);leftoff-=wt+2}
if(App.status.gps){context.drawImage(App.imgs.gps,leftoff-14,8)}
context.font='bold 20px Helvetica';context.fillStyle="#000000";name=$('#contact_name').val().trim();wt=context.measureText(name).width;context.fillText(name,Math.round((App.config.width-wt)/2),60);if(App.mode=='replay'){$('#iphone').append('<input type="hidden" class="gif-data" name="gif_data['+(App.replay.frame-1)+']" id="screen_data_'+(App.replay.frame-1)+'" value="'+document.getElementById('canvas').toDataURL('image/jpeg')+'">');setTimeout('App.draw()',200)}}
App.drawImage=function(m){context.drawImage(m.msg,0,0,m.width*2,m.height*2,m.x,m.y+App.slider.delta,m.width,m.height)}
App.drawSysMsg=function(m){context.font='12px Verdana';App.sysTheme();context.fillText(m.msg,m.x,m.y+App.slider.delta+App.config.margin)}
App.drawInMsg=function(m,t){c=App.bubble.c;b=App.bubble.b;x1=m.x;y1=m.y+App.slider.delta;h=m.height;w=m.width;App.grayTheme();context.beginPath();context.moveTo(x1+c,y1);context.lineTo(x1+w-c,y1);context.arc(x1+w-c,y1+c,c,1.5*Math.PI,0);context.lineTo(x1+w,y1+h-c);context.arc(x1+w-c,y1+h-c,c,0,0.5*Math.PI);context.lineTo(x1+c,y1+h);context.arc(x1+c,y1+h-c,c,0.5*Math.PI,Math.PI);if(m.talk||(App.mode=='replay'&&App.replay.current==t)){context.arc(x1-b,y1+h-b,b,0,0.45*Math.PI);context.arc(x1-0.5*b,y1+h-1.5*b,1.5*b,0.55*Math.PI,0.25*Math.PI,!0)}
context.arc(x1+c,y1+h-c,c,0.5*Math.PI,Math.PI);context.lineTo(x1,y1+c);context.arc(x1+c,y1+c,c,Math.PI,1.5*Math.PI);context.stroke();context.fill();App.blackTheme();App.font();for(s=0;s<m.msg.length;s++){cy=y1+App.config.margin+(s+1)*App.config.lineHeight+(s*App.config.lineGap)-2;context.fillText(m.msg[s],x1+App.config.margin,cy)}}
App.drawOutMsg=function(m,t){c=App.bubble.c;b=App.bubble.b;x1=m.x;y1=m.y+App.slider.delta;h=m.height;w=m.width;App.colorTheme();context.beginPath();context.moveTo(x1+c,y1);context.lineTo(x1+w-c,y1);context.arc(x1+w-c,y1+c,c,1.5*Math.PI,0);context.lineTo(x1+w,y1+h-c);if(m.talk||(App.mode=='replay'&&App.replay.current==t)){context.arc(x1+w+b,y1+h-b,b,Math.PI,0.6*Math.PI,!0);context.arc(x1+w+0.5*b,y1+h-1.5*b,1.5*b,0.55*Math.PI,0.75*Math.PI)}
context.arc(x1+w-c,y1+h-c,c,0,0.5*Math.PI);context.lineTo(x1+c,y1+h);context.arc(x1+c,y1+h-c,c,0.5*Math.PI,Math.PI);context.lineTo(x1,y1+c);context.arc(x1+c,y1+c,c,Math.PI,1.5*Math.PI);context.closePath();context.fill();context.stroke();App.sysTheme();App.font();for(s=0;s<m.msg.length;s++){cy=y1+App.config.margin+(s+1)*App.config.lineHeight+(s*App.config.lineGap)-2;context.fillText(m.msg[s],x1+App.config.margin+0.5,cy+0.5)}
App.whiteTheme();for(s=0;s<m.msg.length;s++){cy=y1+App.config.margin+(s+1)*App.config.lineHeight+(s*App.config.lineGap)-2;context.fillText(m.msg[s],x1+App.config.margin,cy)}}
App.font=function(){context.font='16px Verdana'}
App.colorTheme=function(){context.fillStyle=App.themes.color;context.strokeStyle=App.themes.color}
App.grayTheme=function(){context.fillStyle=App.themes.gray;context.strokeStyle=App.themes.gray}
App.sysTheme=function(){context.fillStyle=App.themes.sys;context.strokeStyle=App.themes.sys}
App.blackTheme=function(){context.fillStyle=App.themes.black;context.strokeStyle=App.themes.black}
App.whiteTheme=function(){context.fillStyle=App.themes.white;context.strokeStyle=App.themes.white}
App.editMessages=function(){try{$('#msglist, #msglist *').unbind()}
catch(ex){}
$('#cw').css({display:'none'});$('#ew').css({display:'block'});str='<ul id="msglist">';if(App.messages&&App.messages.length>0){for(m=0;m<App.messages.length;m++){if(App.messages[m].isSys()){continue}
else if(App.messages[m].isIn()){str+='<li class="amessage inmsg" id="m'+m+'" data-id="'+m+'">'}
else if(App.messages[m].isOut()){str+='<li class="amessage outmsg" id="m'+m+'" data-id="'+m+'">'}
if(App.messages[m].isText()){str+='<div class="msgtext">'+App.messages[m].msg+'</div>'}
else{str+='<div class="msgtext"><img src="'+App.messages[m].msg.src+'" style="width:'+(App.messages[m].width)+'px; height:'+(App.messages[m].height)+'px" ></div>'}
str+='<a class="msgdel" href="javascript:void(0)" onClick="App.deleteMsg('+m+')" ></a>';str+='</li>'}}
str+='</ul>';$('#editor_messages').html(str);$('#msglist').sortable()}
App.closeeditMessages=function(){var nm=[];if(App.messages&&App.messages.length>0){nm.push(App.messages[0]);$.each($('#msglist li'),function(){id=parseInt($(this).data('id'));if(id>1){if(App.messages[id-1]&&App.messages[id-1].isSys()){nm.push(App.messages[id-1])}}
nm.push(App.messages[id])});App.messages=nm;App.reorder();App.draw()}
$('#cw').css({display:'block'});$('#ew').css({display:'none'})}
App.deleteMsg=function(id){$('#m'+id).fadeOut('slow',function(){$(this).remove()})}
App.saveAsImage=function(){if(App.messages&&App.messages.length>0){$('#gif-data').remove();$('#action_id').val('jpg');$('#screen_data').val(document.getElementById('canvas').toDataURL('image/jpeg'));document.getElementById('iphone').submit()}
else{alert("Please add some messages")}}
App.saveAsGif=function(){if(App.messages&&App.messages.length>0){ax=Math.round(($(window).width()-280)/2);ay=Math.round(($(window).height()-100)/2);$('#gifgen').css({display:'block',top:ay,left:ax});$('#st1').css({display:'block'});$('#st2').css({display:'none'});st=0;for(m=0;m<App.messages.length;m++){if(!App.messages[m].isSys()){st++}}
App.replay={total:st,current:-2,frame:0};App.mode='replay';$('#action_id').val('gif');$('#screen_data').val('');App.draw()}
else{alert("Please add some messages")}}
App.sendGif=function(){$('#st1').css({display:'none'});$('#st2').css({display:'block'})}
App.sendGifClose=function(){$('#gifgen').css({display:'none'});document.getElementById('iphone').submit()}
App.setId=function(id){$('#image_id').val(id)}
function getOperator(){var op=$('#operator').val();var net=$('#network').val();if(net!=''&&net!='wifi'){op+=" "+net}
return op}
function getCurrentTime(dt){if(!dt){dt=new Date()}
ho=dt.getHours();mm=dt.getMinutes()+"";if(mm.length==1){mm=0+mm}
if(ho==0){time="12:"+mm+" AM"}
else if(ho==12){time="12:"+mm+" PM"}
else if(ho>12){time=(ho-12)+":"+mm+" PM"}
else{time=ho+":"+mm+" AM"}
return time}
var Days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];var Months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec'];function timeTostring(d,dt){if(!dt){dt=new Date()}
var tt=getDateTime(d,dt)
var ct=new Date();if(tt.getFullYear()==ct.getFullYear()&&tt.getMonth()==ct.getMonth()&&tt.getDate()==ct.getDate()){return "Today "+getCurrentTime(tt)}
else if(tt.getMonth()==ct.getMonth()&&tt.getTime()>ct.getTime()-604800000){return Days[tt.getDay()]+" "+getCurrentTime(tt)}
else if(tt.getFullYear()==ct.getFullYear()){return Days[tt.getDay()].substr(0,3)+", "+Months[tt.getMonth()]+" "+tt.getDate()+", "+getCurrentTime(tt)}
return Days[tt.getDay()].substr(0,3)+", "+Months[tt.getMonth()]+" "+tt.getDate()+" "+tt.getFullYear()+", "+getCurrentTime(tt)}
function getDateTime(d,dt){if(!dt){dt=new Date()}
if(d==0){return dt}
return new Date(dt.getTime()+d*60000)}
var Message=function(msg,dir,type){this.msg=msg;this.dir=dir;this.type=type;this.width=40;this.height=45;this.x=10;this.y=10;this.lines=1;this.talk=!0;this.time=null}
Message.prototype.isIn=function(){return this.dir==1}
Message.prototype.isOut=function(){return this.dir==0}
Message.prototype.isText=function(){return this.type==0}
Message.prototype.isSys=function(){return this.type==1}
Message.prototype.isImage=function(){return this.type==2}
function loader(url){var img=new Image();img.onload=imageLoaded;img.src=url;return img}
function imageLoaded(){App.meta.loaded++;if(App.meta.total==App.meta.loaded){App.start()}}