window.onload=function(){
  //图片定位
  waterfall('main','box')
  var dataInt={'data':[{'src':'0.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'}]};
  //滚动加载
  window.onscroll=function(){
  	//当滚动到指定位置时进行加载下一张
  	if(checkScrollSide()){
       //加载接下来的图片
       console.log("1")
       var oParent=document.getElementById('main')
       //遍历要加载的数据
       for(var i=0;i<dataInt.data.length;i++){
       	   var oBox=document.createElement('li');
       	   oBox.className='box';
       	   oParent.appendChild(oBox);
       	   var oPic=document.createElement('div');
       	   oPic.className='pic';
       	   oBox.appendChild(oPic);
       	   var img=document.createElement('img')
       	   img.src='../imgs/'+dataInt.data[i].src;
       	   oPic.appendChild(img)
       }
       waterfall('main','box')
  	}
  }
}



//定位图片位置
function waterfall(parent,box){
   var oParent=document.getElementById(parent);
   var oBoxs=getClassObj(oParent,box);

   var boxW=oBoxs[0].offsetWidth;
   var cols=Math.floor(document.documentElement.clientWidth/boxW);
   oParent.style.cssText='width:'+cols*boxW+'px';
   
   //遍历box 定位
   var colsH=[];
   for(var i=0;i<oBoxs.length;i++){
   	   if(i<cols){
   	   	  //第一排
          colsH.push(oBoxs[i].offsetHeight)
   	   }else{
         //其他
         var minH=Math.min.apply(null,colsH)
         var minIndex=getMinIndex(colsH,minH);

         oBoxs[i].style.position='absolute';
         oBoxs[i].style.top=minH+'px';
         oBoxs[i].style.left=oBoxs[minIndex].offsetLeft+'px';
         colsH[minIndex]+=oBoxs[i].offsetHeight;
   	   }
   }
}

//获取所有指定classname的元素
function getClassObj(parent,clsName){
	var boxArr=[],
	    oElement=parent.getElementsByTagName("*")
	for(var i=0;i<oElement.length;i++){
         if(oElement[i].className==clsName){
         	boxArr.push(oElement[i])
         }
	}
	return boxArr;
}

//获取最小高度的列数 index
function getMinIndex(arr,min){
	var index;
	for(var i in arr){
		if(arr[i]===min){
			index=i;
		}
	}
	return index;
}

//判断是否滚动至指定位置
function checkScrollSide(){
	var oParent=document.getElementById('main');
	var oBoxs=getClassObj(oParent,'box');

	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var clientHeight=document.documentElement.clientHeight;
	
	return lastBoxH<=scrollTop+clientHeight?true:false;
}