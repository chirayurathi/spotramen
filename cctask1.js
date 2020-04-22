const navspy= ()=>{
    var navs = $('nav ul li a');
    var sec=$('.sec');
    var navh= $('nav').height();
    var docel = $(document);
    docel.on('scroll',function(){
        var scrollpos = docel.scrollTop();
        sec.each(function(){
            var self=$(this);
            if(self.offset().top < (scrollpos+navh) && (scrollpos+navh) < (self.offset().top+self.outerHeight())){
                var currClass='.'+self.attr('id')+'-mark';
                navs.removeClass('active');
                $(currClass).addClass('active');
            }
        });
    });
};
const carousel=()=>{
    var carSlide= $('.carousel-slide');
    var carImg= $('.carousel-slide img');
    var next=$('#next');
    var prev=$('#prev');
    let count=1;
    var size=carImg.width();
    carSlide.css("transform","translateX("+(-size * count)+"px)");
    console.log('dvbdj');
    next.click(()=>{
        if(count >= carImg.length-1) return;
        console.log("next");
        carSlide.css('transition','transform 0.4s ease-in-out')
        count++;
        carSlide.css('transform','translateX('+(-size*count)+'px)');
    });
    prev.click(()=>{
        if(count <= 0) return;
        console.log("prev");
        carSlide.css('transition','transform 0.4s ease-in-out');
        count--;
        carSlide.css('transform','translateX('+(-size*count)+'px)');
    });
    carSlide.on('transitionend',()=>{
        if(carImg[count].id == 'lastc'){
            carSlide.css('transition','none');
            count = carImg.length -2;
            carSlide.css('transform','translateX('+(-size*count)+'px)');
        }
        else if(carImg[count].id == 'firstc'){
            carSlide.css('transition','none');
            count = carImg.length-count;
            carSlide.css('transform','translateX('+(-size*count)+'px)');
        }
    });
    var dropbool = false;
    setInterval(()=>{ 
        if (dropbool == false){
            $('.scrollD').css('transition','transform 0.8s ease-in-out');
            $('.scrollD').css('transform','translateY(10px)');
        }
        else{
            $('.scrollD').css('transition','transform 0.8s ease-in-out');
            $('.scrollD').css('transform','translateY(-10px)');
        }
        dropbool=!dropbool;
    }, 1000);
}; 
const navSlide = ()=>{
    const burger=$('.burger');
    const nav=$('nav ul');
    const navLink=document.querySelectorAll('nav ul li');
    burger.click(()=>{
        nav.toggleClass('nav-active');
        navLink.forEach((link,index)=>{
            if(link.style.animation){
                link.style.animation='';
            }
            else{
            link.style.animation=`navFade 0.5s ease forwards ${index/7 +0.5}s`;}
        });
    });
};
navspy();
carousel();
navSlide();
httpRequest = new XMLHttpRequest();
httpRequest.open('GET',' https://chirayurathi.github.io/spotramenJson/db.json');
var jsonData = []
var hotContainer = document.querySelector(".hotspots-container");
httpRequest.onload= ()=>{
    jsonData = JSON.parse(httpRequest.responseText);
    for(var i=0;i<jsonData.length;i++)
    makeCard(jsonData[i]);
};
httpRequest.send();
const makeCard = (jsonEle)=>{
    htmlString="<div class='flip-container'><div class='flip-card'><div class='flip-front'><p>"+jsonEle["Brand"]+"</p></div><div class='flip-back'><p class='sub-head'>variety</p><p>"+jsonEle["Variety"]+"</p><p class='sub-head'>style</p><p>"+jsonEle["Style"]+"</p><p class='sub-head'>location</p><p>"+jsonEle["Country"]+"</p><p class='rank'>Ranked "+jsonEle["TopTen"]+"</p></div></div></div>";
    hotContainer.insertAdjacentHTML('beforeend',htmlString);
};
