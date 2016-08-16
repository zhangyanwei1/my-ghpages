window.onload=function(){
    var cols=5;
    waterfull(cols);
    
    //checkLoad();
    window.onscroll=function(){
        if(checkLoad()){
            creatElement();//创建元素

            //注意：新加入的元素只是加入文档中，并没有按照之前的排列规则排布，
            //需要再次调用waterfull函数使加载的图片按照瀑布流的规则排列
            waterfull(cols);
        }
    }
    var oParent=document.getElementById("back");
    oParent.onclick=function(event){
        event=event||window.event;
        var src=event.target||event.srcElement;
        if(src.nodeName=="IMG"){
            displayImg(src);
            var mask=document.getElementsByClassName("mask")[0];
            mask.onclick=function(){
                hideImg();
            }
        }
    }
}

//瀑布流排列，参数：列数
function waterfull(cols){
    var oParent=document.getElementById("back");
    var oBox=oParent.getElementsByTagName("div");

    //设置背景宽：宽=列数*每一列的宽度，列数=浏览器宽度/每一列的宽度。设置背景居中
    var boxW=oBox[0].clientWidth;
    oParent.style.cssText='width:'+cols*boxW+'px;margin:0 auto;';

    //1、定义数组保存每一列的高度
    //2、计算数组中高度最小的值，并取得索引
    //3、将图片放在下方，并增加这一列数组高度，更新数组
    var arrH=[];
    for(var i=0,len=oBox.length;i<len;i++){
        if(i<cols){
            arrH.push(oBox[i].offsetHeight);//第一行的高度首先添加进数组，这就是我们所需要的数组
        }else{
            var minH=Math.min.apply(null, arrH);//取得数组中高度最小的值：注意min           
            var index=arrH.indexOf(minH); //通过数组方法indexOf查找元素索引，取得数组中高度最小值得索引

            //设置下一张图片的位置样式：绝对定位，top:minH，left:图片宽度*索引值（等宽）
             oBox[i].style.cssText='position:absolute;top:'+minH+'px;left:'+boxW*index+'px;';
             
            //非常重要：更新图片数组高度，index所在位置的数组添加了图片，高度增加放上去图片的高度。
            arrH[index] +=oBox[i].offsetHeight;
            var maxH=Math.max.apply(null,arrH);
        }
        oParent.style.height=maxH+"px";//设置父盒子高度，子盒子脱离文档流，父元素盒子高度为0，需要手动设置。
    }
}

//加载数据
function creatElement(){
    var oParent=document.getElementById("back");
    var oBox=oParent.getElementsByTagName("div");

    //后台给的数据
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'20.jpg'},
    {'src':'8.jpg'},{'src':'21.jpg'}]};

    for(var i=0,len=dataInt.data.length;i<len;i++){
        var boxImg=document.createElement("div");
        boxImg.className="box";
        oParent.appendChild(boxImg);
        var img=document.createElement("img");
        img.src="./img/"+dataInt.data[i].src;
        boxImg.appendChild(img);
    }
}

//检测加载数据的条件
function checkLoad(){
    var oParent=document.getElementById("back");
    var oBox=oParent.getElementsByTagName("div");

    var lastImg=oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight/2);//最后一张图片的一半距顶部距离
    var scrollH=document.documentElement.scrollTop||document.body.scrollTop;//鼠标滚动距离
    var documentH=document.documentElement.clientHeight;//页面可视区域高度
    var docH=scrollH+documentH;//鼠标滚动距离+页面可视区域距离

    /*console.log(lastImg);
    console.log(docH);*/

    //当页面+滚动距离到达我们设定好的标准，返回true加载图片，否则没有达到加载条件不加载图片。
    return (lastImg<docH)?true:false;
}

//点击图片显示
function displayImg(obj){
    var mask=document.getElementsByClassName("mask")[0];
    var display=document.getElementsByClassName("display")[0];

    //设置图片属性
    var imgDisplay=display.getElementsByTagName("img")[0];
    imgDisplay.src=obj.src;

    //设置好图片属性之后再显示
    mask.style.display="block";
    display.style.display="block";

    //设置图片位置
    var imgW=imgDisplay.offsetWidth;
    var imgH=imgDisplay.offsetHeight;
    imgDisplay.style.top=document.documentElement.clientHeight/2-imgDisplay.offsetHeight/2+'px';
    imgDisplay.style.left=document.documentElement.clientWidth/2-imgDisplay.offsetWidth/2+'px';  
}

//隐藏图片
function hideImg(){
    var mask=document.getElementsByClassName("mask")[0];
    var display=document.getElementsByClassName("display")[0];

    mask.style.display="none";
    display.style.display="none";
}