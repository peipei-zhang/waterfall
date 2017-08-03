$(window).on('load',function(){
	//图片定位函数
	waterfall();
    
    var dataInt={'data':[{'src':'0.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'}]};

	//滚动加载
	$(window).on('scroll',function(){
		if(checkScrollSlide()){
           for(var i=0;i<dataInt.data.length;i++){
           	  var oBox=$('<li>').addClass('box').appendTo($('#main'));
              html='<div class="pic"><img src="../imgs/'+dataInt.data[i].src+'"></div>'
              oBox.html(html)
           }
           waterfall();
		}
	})
})

//图片定位
function waterfall(){
	var $boxs=$('#main>li');

	var boxW=$boxs.eq(0).outerWidth();  //width 和 outerWidth
	var cols=Math.floor($(window).width()/boxW);
	$('#main').width(cols*boxW)

	//遍历box定位每一张图片
	var colsH=[];
	$boxs.each(function(i,item){
		var itemH=$(item).outerHeight();
		if(i<cols){
           colsH[i]=itemH;
		}else{
           var minH=Math.min.apply(null,colsH);
           var minIndex=$.inArray(minH,colsH);
           $(item).css({
           	   'position':'absolute',
           	   'top':minH+'px',
           	   'left':minIndex*boxW+'px'
           });
           colsH[minIndex]+=itemH;
		}
	})
}

//判断滚动加载条件
function checkScrollSlide(){
	var $lastbox=$('#main>li').last();

	var lastBoxdis=$lastbox.offset().top+Math.floor($lastbox.outerHeight()/2)
	var scrollTop=$(window).scrollTop();
	var clientH=$(window).height()
	
	return lastBoxdis<=scrollTop+clientH?true:false;
}