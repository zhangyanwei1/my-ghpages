var img_group=document.getElementsByClassName("img_group")[0];
var img=img_group.getElementsByTagName("img");

var pre=document.getElementsByClassName("pre")[0];
var next=document.getElementsByClassName("next")[0];

var body_width=document.body.scrollWidth;
// 初始化图片宽度，获取页面宽度，使图片宽度等于页面宽度
for(var i=0,length=img.length;i<length;i++){
    // console.log(i);
    img[i].style.width=body_width+"px";
}

//为每一个li标签自定义index属性，标识这是第几个li标签
var btns=document.getElementsByClassName("control")[0].getElementsByTagName("li");
for(var i=0,length=btns.length;i<length;i++){
    btns[i].setAttribute("data-index",i);
}

img_group.style.left=0+"px";
var num=0;//num记录当前图片是哪一张，初始化是0
//图片移动位置函数
function setImg(n){
    // img_group.style.left=-n*body_width+"px";
    moveTo(-n*body_width);
    num=n;//记录当前图片是第几张
}

//滑动小圆点样式
function current(n){
    for(var i=0,length=btns.length;i<length;i++){
        if(btns[i].getAttribute("data-index")==n){
            btns[i].className="current";
        }else{
            btns[i].className="";
        }
    }
}

//图片移动动画
function moveTo(end){
    var t0=new Date();//动画开始时间
    var span=1000;//动画间隔

    var timer=setInterval(function(){
        var start=parseInt(img_group.style.left);//图片移动前位置，end是图片需要移动的最终位置
        var now=new Date();//动画执行到的时间
        var per=(now-t0)/span;//动画执行的速率
        if(per<=1){
            img_group.style.left=(end-start)*per*per+start+"px";
        }else{
            img_group.style.left=end+"px";
            clearInterval(timer);
        }
    }, 20);
}
//自动轮播函数
function run(){
    current(num);
    play=setInterval(function(){
    num++;
    if(num>4){
        num=0;
    }
    setImg(num);
    current(num);
    }, 3000);
}
run();
//前后移动图片位置
pre.onclick=function(){
    if(num==0){
        num=4;
    }else{
        num--;
    }
    setImg(num);
    current(num);
}
next.onclick=function(){
    if(num>=4){
        num=0;
    }else{
        num++;
    }
    setImg(num);
    current(num);
}

pre.onmouseover=function(){
    clearInterval(play);
}
next.onmouseover=function(){
    clearInterval(play);
}
pre.onmouseout=function(){
    run();
}
next.onmouseout=function(){
    run();
}

//按钮点击函数
for(var i=0,length=btns.length;i<length;i++){
    btns[i].onclick=function(){
        setImg(this.getAttribute("data-index"));
        current(this.getAttribute("data-index"));
    }
    btns[i].onmouseover=function(){
        clearInterval(play);
    }
    btns[i].onmouseout=function(){
        run();
    }
}