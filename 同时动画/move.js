function startMove(obj,json,fn){
    //1、清楚多余定时器
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){ 
        /*所有动画完成的标志，注意这个标志所处的位置：
        定义在定时器内部，否则将永远不会变回true，即不会清除定时器，也无法执行链式函数fn
        定义在json循环之前，因为需要所有动画执行完毕之后才能变成true，放在里边无意义。
        */
        var flag=true;
        for(var attr in json){
            //2、读取当前样式值
            if(attr=='opacity'){//如果样式是透明度
                var cur=parseFloat(getStyle(obj,attr))*100;
            }else{//样式是其他
                var cur=parseInt(getStyle(obj,attr));
            }
            //3、定义运动的速度：缓冲运动，先快后慢
            var speed=(json[attr]-cur)/8;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);//速度>0向上取整，速度<0，向下取整
            //4、当到达目标值时，清除定时器，停止运动
            if(cur!=json[attr]){
                flag=false;
            }
            //5、没有到达目标值时，按预定的速度增量增加值，直到到达回到上一步
            //   根据当前样式，进行相应的增加操作
            if(attr=='opacity'){
                obj.style.opacity=(cur+speed)/100;
                obj.style.filter='alpha(opacity:'+(cur+speed)+')';//IE8,7
            }else{
                obj.style[attr]=cur+speed+'px';
            }
        }
        /*应该放在定时器内，json遍历之后：
        当最后一次，所有动画经过遍历都达到了目标值，这个时候不会执行flag=false，
        再次进入定时器时，执行flag=true，空遍历一次，然后执行关闭定时器以及执行函数fn，
        如果这个时候把这句话放在for遍历内，遍历几次就会执行几次函数fn。
        */
        if(flag){
            console.log(json[attr]);
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    }, 30);
}
function getStyle(obj,attr){
    if(obj.currentStyle)//针对IE   
    {
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}