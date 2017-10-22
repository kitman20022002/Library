window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(loop) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var c;//canvas
var ctx;//context
var msX;//mouse x
var msY;//mouse y
var _pt; //point value
var _pts;//point array(_pt)
var _num = 25; //starting num of points
var _s = 2.3; //point [ node ]size
var _lw = 0.2; //line width
var _maxD = 120; //max distance / size of object
var _sp = 251; //speed
var _spr = 1.8; //spring

window.addEventListener('resize', function(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}, false);


var go = function() {

  c = document.getElementById("canv");
  ctx = c.getContext("2d");
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  msX = 0;
  msY = 0;

  _pt = 25;
  _pts = new Array(_pt);
  
  for (var i = 0; i < _pt; i++) {
    _pts[i] = new Pt("Hello world");
  }
 run();
}

var Pt = function(n) {
  this.go(n);
};
var maxSpeed = 5;
var maxWidth = window.innerWidth * 0.8;
Pt.prototype.go = function(n) {
  this.width = ctx.measureText(n).width;
  this.height = ctx.measureText(n).height;
  this.n = n;
  this.x = Math.random() * c.width;
  this.y = Math.random() * c.height ;
  var r = this.getRandomInt(0 , 4);

  
  var angle = 0;
 var spd = 5;
  if(r == 0)
  {
	  angle =  1.57;
	  this.vx = 0;
	  this.vy = spd;
  }
  else if(r == 1) 
  {
	  angle = 1.57*2;
	  this.vx = -spd;
	  this.vy = 0;
  }
  else if(r == 2)
  {
	  angle =  1.57*3;   
	  this.vx = 0;
	  this.vy = -spd;
  }
  else if(r == 3 )
  {
	  angle =  1.57*4;
	  this.vx = spd;
	  this.vy = 0;
  }
  this.rotate = angle;  
};

Pt.prototype.getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

Pt.prototype.move = function(dt) {
  var min = c.width + c.height;
  var _min_a = this.n;
  var _x = c.width / 2;
  var _y = c.height / 2;
 
  var d = this._dist(this.x, this.y, msX, msY);
  if(this.x +  this.width< 0 )
  {
	this.x = this.width + c.width;
  }
  else if(this.x - this.width > c.width  )
  {
  	this.x = 0  - this.width;
  }
  if(this.y < 0  )
  {
  	this.y =  c.height;
  }
  else if(this.y > c.height  )
  {
  	this.y = 0;
  }

  this.x += this.vx * dt/100;
  this.y += this.vy * dt/100;
};


Pt.prototype._dist = function(x1, y1, x2, y2) {
  var dx = (x1 - x2);
  var dy = (y1 - y2);
  return Math.sqrt(dx * dx + dy * dy);
};


var lastUpdate = Date.now();
var myInterval = setInterval(run, 0);

var Timer = 0;

var run = function(){
	 var now = Date.now();
    var dt = now - lastUpdate;
    lastUpdate = now;
	
   window.requestAnimFrame(run);
   draw(dt);
}
window.onload = function() {
  go();
};
var Timer2 = 0;
var draw = function(dt) { 
	Timer += dt/1000;
	Timer2 = Timer/1000;
	 ctx.shadowColor = "red";
	 ctx.shadowOffsetX = 0; 
	 ctx.shadowOffsetY = 0; 
	 ctx.shadowBlur = 10;
	 ctx.font = "40px Arial";
	for (var i = 0; i < _pt; i++) {
	   ctx.save();
	   ctx.textAlign="center";
	   ctx.textBaseline="middle";
	   ctx.translate(_pts[i].x,_pts[i].y);
	   ctx.rotate(_pts[i].rotate );
	   ctx.fillText(_pts[i].n,0,0);
	   _pts[i].move(dt);
	   ctx.restore();
	}
  ctx.globalCompositeOperation = 'source-over';
  
  var grd = ctx.createLinearGradient(0, 0, 1920/2, 0);
  //grd.addColorStop(1, "rgba(5, 28, 66,0.2)");
  //grd.addColorStop(0, "rgba(15, 46, 48,0.2)");
  grd.addColorStop(0, "rgba(36, 36, 36,0.25)");
  grd.addColorStop(1, "rgba(36, 36, 36,0.25)");	  
  
  
  ctx.shadowColor = "red";
  ctx.shadowOffsetX = 0; 
  ctx.shadowOffsetY = 0; 
  ctx.shadowBlur = 0;
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fill();
  ctx.globalCompositeOperation = 'lighter';

}

var ConvertRange = function(originalStart,originalEnd,newStart,newEnd,value)
{
  var originalDiff = originalEnd - originalStart;
  var newDiff = newEnd - newStart;
  var ratio = newDiff / originalDiff;
  var newProduct = value * ratio;
  var finalValue = newProduct + newStart;
  return finalValue; 

}

var chg = function() {

  if (50 <= 25) {
    document.getElementById("num_").value = 50;
  }
  go();
}