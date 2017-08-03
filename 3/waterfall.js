$(window).on('load',function(){
    
    var dataInt={'data':[{'src':'0.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'}]};

    //滚动加载
    $(window).on('scroll',function(){
    	if(checkScrollSlide()){
           $.each(dataInt.data,function(i,item){
           	  var oBox=$('<li>').addClass('box').appendTo($('#main'))
           	  html='<div class="pic"><img src="../imgs/'+dataInt.data[i].src+'"></div>'
              oBox.html(html)
           })
           waterfall();
    	}
    })
})

function checkScrollSlide(){
	var $lastBox=$('#main>li').last();

	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.height()/2);
	var scrollTop=$(window).scrollTop();
	var clientH=$(window).height();

	return lastBoxDis<=scrollTop+clientH?true:false;
}