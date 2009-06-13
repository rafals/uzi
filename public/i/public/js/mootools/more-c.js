MooTools.More={version:"1.2.2.2"};Fx.Elements=new Class({Extends:Fx.CSS,initialize:function(b,a){this.elements=this.subject=$$(b);this.parent(a);},compute:function(g,h,j){var c={};
for(var d in g){var a=g[d],e=h[d],f=c[d]={};for(var b in a){f[b]=this.parent(a[b],e[b],j);}}return c;},set:function(b){for(var c in b){var a=b[c];for(var d in a){this.render(this.elements[c],d,a[d],this.options.unit);
}}return this;},start:function(c){if(!this.check(c)){return this;}var h={},j={};for(var d in c){var f=c[d],a=h[d]={},g=j[d]={};for(var b in f){var e=this.prepare(this.elements[d],b,f[b]);
a[b]=e.from;g[b]=e.to;}}return this.parent(h,j);}});var Accordion=Fx.Accordion=new Class({Extends:Fx.Elements,options:{display:0,show:false,height:true,width:false,opacity:true,fixedHeight:false,fixedWidth:false,wait:false,alwaysHide:false,trigger:"click",initialDisplayFx:true},initialize:function(){var c=Array.link(arguments,{container:Element.type,options:Object.type,togglers:$defined,elements:$defined});
this.parent(c.elements,c.options);this.togglers=$$(c.togglers);this.container=$(c.container);this.previous=-1;if(this.options.alwaysHide){this.options.wait=true;
}if($chk(this.options.show)){this.options.display=false;this.previous=this.options.show;}if(this.options.start){this.options.display=false;this.options.show=false;
}this.effects={};if(this.options.opacity){this.effects.opacity="fullOpacity";}if(this.options.width){this.effects.width=this.options.fixedWidth?"fullWidth":"offsetWidth";
}if(this.options.height){this.effects.height=this.options.fixedHeight?"fullHeight":"scrollHeight";}for(var b=0,a=this.togglers.length;b<a;b++){this.addSection(this.togglers[b],this.elements[b]);
}this.elements.each(function(e,d){if(this.options.show===d){this.fireEvent("active",[this.togglers[d],e]);}else{for(var f in this.effects){e.setStyle(f,0);
}}},this);if($chk(this.options.display)){this.display(this.options.display,this.options.initialDisplayFx);}},addSection:function(d,b){d=$(d);b=$(b);var e=this.togglers.contains(d);
this.togglers.include(d);this.elements.include(b);var a=this.togglers.indexOf(d);d.addEvent(this.options.trigger,this.display.bind(this,a));if(this.options.height){b.setStyles({"padding-top":0,"border-top":"none","padding-bottom":0,"border-bottom":"none"});
}if(this.options.width){b.setStyles({"padding-left":0,"border-left":"none","padding-right":0,"border-right":"none"});}b.fullOpacity=1;if(this.options.fixedWidth){b.fullWidth=this.options.fixedWidth;
}if(this.options.fixedHeight){b.fullHeight=this.options.fixedHeight;}b.setStyle("overflow","hidden");if(!e){for(var c in this.effects){b.setStyle(c,0);
}}return this;},display:function(a,b){b=$pick(b,true);a=($type(a)=="element")?this.elements.indexOf(a):a;if((this.timer&&this.options.wait)||(a===this.previous&&!this.options.alwaysHide)){return this;
}this.previous=a;var c={};this.elements.each(function(f,e){c[e]={};var d=(e!=a)||(this.options.alwaysHide&&(f.offsetHeight>0));this.fireEvent(d?"background":"active",[this.togglers[e],f]);
for(var g in this.effects){c[e][g]=d?0:f[this.effects[g]];}},this);return b?this.start(c):this.set(c);}});