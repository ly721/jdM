window.onload=function(){
	// 1.顶部搜索
	search();
	// 2.轮播图
	banner();
	// 3.倒计时
	downTime();
};

//============================================================
var search=function(){
	//1、默认固定顶部透明背景
	var searchBox=document.querySelector('.jd_search_box');
	var banner=document.querySelector('.jd_banner');
	var height=banner.offsetHeight;
	//监听页面滚动事件
	window.onscroll=function(){
		//window.pageYoffset   document.body.scrollTop
		var scrollTop=document.documentElement.scrollTop;
	
		var opacity=0;/*默认透明度*/
		if(scrollTop<height){
			//2、页面滚动的时候随着页面卷曲的高度变大，透明度变大
		    opacity=screenTop/height *0.85;
		}else{
			//3、页面超过某一个高度(轮播图高度)透明度不变
		    opacity=0.85;
		}
		searchBox.style.background='rgba(201,21,35,'+opacity+')';
	};
};

//======================================================================
var banner=function(){
	//自动轮播且无缝==========时器，过渡实现
	//点药随着轮播图片改变  根据索引及切换
	//滑动效果    touch 事件
	//滑动结束的时候 如果滑动的距离不超过屏幕三分之一 恢复原位  ===过渡
	//如果超过 切换（上一张/下一张  滑动方向+过渡
   
   //轮播图
	var banner=document.querySelector('.jd_banner');
   //宽度
	var width=banner.offsetWidth;
   //图片容器
	var images=banner.querySelector('ul:first-child');
   //点容器
	var pointBox=banner.querySelector('ul:last-child');
    //所有点
	var points=pointBox.querySelectorAll('li');
	
	var addTransition=function(){
		images.style.transition='all 0.2s';
		images.style.webkitTransition='all 0.2s';
	};
	
	var removeTransition=function(){
		images.style.transition="none";
		images.style.webkitTransition="none";
	};
	
	var setTranslateX=function(translateX){
		images.style.transform='translateX('+translateX+'px)';
		images.style.webkitTransform='translateX('+translateX+'px)';
	};
	
	var index=1;//默认显示第一张
	var timeId=setInterval(function(){
		index++;
		//加过渡
		addTransition();
		//做位移
	    setTranslateX(-index*width);
	},1000);
	//需要等最后一张动画结束去判断 是否瞬间定位第一张
	images.addEventListener('transitionend',function(){
		//自动滚动的无缝
		if(index>=9){
			//跳转
			index=1;
			//清过渡
			removeTransition();
			//做位移
		    setTranslateX(-index*width);
		}
		//滑动的时候也需要无缝
		else if(index<=0){
			index=8;
			//清过渡
			removeTransition();

			//做位移
			setTranslateX(-index*width);
		}
		//根据索引设置点
		//此时取值范围 1-8 上面有范围设置
		//点的索引index-1
		setPoint();
	});
	//设置点的方法
	var setPoint=function(){
		//清除点样式
		for(var i=0;i<points.length;i++){
			var obj=points[i];
			obj.classList.remove('now');
		}
		//给对应点加上样式
		points[index-1].classList.add('now');
	};
	//绑定事件
	var startX=0;
	var distanceX=0;
	var isMove=false;
	images.addEventListener('touchstart',function(e){
		//清除定时器
		clearInterval(timeId);
		//记录起始位置的x坐标
		startX=e.touches[0].clientX;
	});
	
	images.addEventListener('touchmove',function(e){
		//记录滑动过程中的x坐标
		var moveX=e.touches[0].clientX;
		//计算位移，有方向
		distanceX=moveX-startX;
		//计算目标元素的位移  不用管正负
		//元素将要的定位=当前定位+手指移动距离
		var translateX=-index*width+distanceX;
		//要清除自动的过渡
		removeTransition();
		setTranslateX(translateX);
		isMove=true;
	});
	
	images.addEventListener('touchend',function(e){
		if(isMove){
			//判断切换不
if(Math.abs(distanceX)<width/3){
	//恢复回去
	addTransition();
	setTranslateX(-index*width);
}else{
	  //  distanceX<0,左边滑动下一张  <0右边滑动上一张
		if(distanceX>0){
			index--;
		}else{
				index++;
			}
			//根据index定位
			addTransition();
			setTranslateX(-index*width);
}}

//最好重置一次参数
startX=0;
distanceX=0;
isMove=false;
//重置定时器
clearInterval(timeId);
timeId=setInterval(function(){
		index++;
		//加过渡
		addTransition();
		//做位移
	    setTranslateX(-index*width);
	},1000);
	});
};

//=============================================
var downTime=function(){
	//倒计时时间
	var time=2*60*60;
	//时间盒子
	var spans=document.querySelector('.time').querySelectorAll('span');
	//每一秒去更新时间
	var timeId=setInterval(function(){
		time--;
		var h=Math.floor(time/3600);
		var m=Math.floor(time%3600/60);
		var s=time%60;
		spans[0].innerHTML=Math.floor(h/10);
		spans[1].innerHTML=h%10;
		
		spans[3].innerHTML=Math.floor(m/10);
		spans[4].innerHTML=m%10;
		
		spans[6].innerHTML=Math.floor(s/10);
		spans[7].innerHTML=s%10;
		if(time<=0){
			clearInterval(timeId);
		}
	},1000);
};