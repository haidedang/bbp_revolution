$(document).ready(function(){
    //owl carousel
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        navText: ["<img src='images/myprevimage.png'>","<img src='images/mynextimage.png'>"],
        navClass: ['owl-prev', 'owl-next'],
        autoplay:true,
        autoplayTimeout:3000,
        autoHeight:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });

    //slide ins
    var clicked1=true;
    $(".button1").on('click', function(){
        if(clicked1)
        {
            clicked1=false;
            $(".whats-included .two").css({"top": 0});
            $(".whats-included").css({"height": 350});
            $('html,body').animate({
                scrollTop: $(".line1").offset().top-100},
          'slow');
        }
        else
        {
            clicked1=true;
            $(".whats-included .two").css({"top": "-200px"});
            $(".whats-included").css({"height": 60});
        }
    });

});
var clicked2=true;
$(".button2").on('click', function(){
    if(clicked2)
    {
        clicked2=false;
        $(".book-now .two").css({"top": 0});
        $(".book-now").css({"height": 1800});
        $("body").animate({"scrollTop": window.scrollY +400}, 1000);
    }
    else
    {
        clicked2=true;
        $(".book-now .two").css({"top": "-1800px"});
        $(".book-now").css({"height": 60});
    }
});

//initialize position for GOOGLEMAPS
var position = [27.1959739, 78.02423269999997];
//days loop
var daysWrapper = document.getElementById('days-wrapper');

var unclickedArr = [];
for (var i = 0; i < (daysWrapper.children.length); i++) {
    unclickedArr[i] = true;
}
//DAY 1
$("li:nth-child(1)").on('click', function(){
    if(unclickedArr[1])
    {
        $(".map").css({"height": "125vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[1]=false;
        $("li:nth-child(2)").css({"display": "inline"});
        $('html,body').animate({
            scrollTop: $(".map").offset().top},
      'slow');

      //googlemaps position
      position = [28.1959739, 80.02423269999997];
    }
    else
    {
        unclickedArr[1]=true;
        $("li:nth-child(2)").css({"display": "none"});
    }
});
//DAY 2
$("li:nth-child(3)").on('click', function(){

    if(unclickedArr[3])
    {
        $(".map").css({"height": "125vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[3]=false;
        $("li:nth-child(4)").css({"display": "inline"});
        $('html,body').animate({
            scrollTop: $(".map").offset().top},
      'slow');
    }
    else
    {
        unclickedArr[3]=true;
        $("li:nth-child(4)").css({"display": "none"});
    }
});
//DAY 3
$("li:nth-child(5)").on('click', function(){

    if(unclickedArr[5])
    {
        $(".map").css({"height": "125vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[5]=false;
        $("li:nth-child(6)").css({"display": "inline"});
        $('html,body').animate({
            scrollTop: $(".map").offset().top},
      'slow');
    }
    else
    {
        unclickedArr[5]=true;
        $("li:nth-child(6)").css({"display": "none"});
    }
});
//DAY 4
$("li:nth-child(7)").on('click', function(){

    if(unclickedArr[7])
    {
        $(".map").css({"height": "125vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[7]=false;
        $("li:nth-child(8)").css({"display": "inline"});
        $('html,body').animate({
            scrollTop: $(".map").offset().top},
      'slow');
    }
    else
    {
        unclickedArr[7]=true;
        $("li:nth-child(8)").css({"display": "none"});
    }
});
//DAY 5
$("li:nth-child(9)").on('click', function(){

    if(unclickedArr[9])
    {
        $(".map").css({"height": "125vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[9]=false;
        $("li:nth-child(10)").css({"display": "inline"});
        $('html,body').animate({
            scrollTop: $(".map").offset().top},
      'slow');
    }
    else
    {
        unclickedArr[9]=true;
        $("li:nth-child(10)").css({"display": "none"});
    }
});
//DAY 6
$("li:nth-child(11)").on('click', function(){

    if(unclickedArr[11])
    {
        $(".map").css({"height": "125vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[11]=false;
        $("li:nth-child(12)").css({"display": "inline"});
        $('html,body').animate({
            scrollTop: $(".map").offset().top},
      'slow');
    }
    else
    {
        unclickedArr[11]=true;
        $("li:nth-child(12)").css({"display": "none"});
    }
});
//DAY 7
$("li:nth-child(13)").on('click', function(){

    if(unclickedArr[13])
    {
        $(".map").css({"height": "125vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[13]=false;
        $("li:nth-child(14)").css({"display": "inline"});
        $('html,body').animate({
            scrollTop: $(".map").offset().top},
      'slow');
    }
    else
    {
        unclickedArr[13]=true;
        $("li:nth-child(14)").css({"display": "none"});
    }
});
//DAY 8
$("li:nth-child(15)").on('click', function(){

    if(unclickedArr[15])
    {
        $(".map").css({"height": "125vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[15]=false;
        $("li:nth-child(16)").css({"display": "inline"});
        $('html,body').animate({
            scrollTop: $(".map").offset().top},
      'slow');
    }
    else
    {
        unclickedArr[15]=true;
        $("li:nth-child(16)").css({"display": "none"});
    }
});
//DAY 9
$("li:nth-child(17)").on('click', function(){

    if(unclickedArr[17])
    {
        $(".map").css({"height": "125vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[17]=false;
        $("li:nth-child(18)").css({"display": "inline"});
        $('html,body').animate({
            scrollTop: $(".map").offset().top},
      'slow');
    }
    else
    {
        unclickedArr[17]=true;
        $("li:nth-child(18)").css({"display": "none"});
    }
});
//DAY 8
$("li:nth-child(19)").on('click', function(){

    if(unclickedArr[19])
    {
        $(".map").css({"height": "125vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[19]=false;
        $("li:nth-child(20)").css({"display": "inline"});
        $('html,body').animate({
            scrollTop: $(".map").offset().top},
      'slow');
    }
    else
    {
        unclickedArr[19]=true;
        $("li:nth-child(20)").css({"display": "none"});
    }
});

//googlemaps

function showGoogleMaps() {

    var latLng = new google.maps.LatLng(position[0], position[1]);

    var mapOptions = {
        zoom: 16, // initialize zoom level - the max value is 21
        gestureHandling: 'none',
        streetViewControl: false, // hide the yellow Street View pegman
        scaleControl: true, // allow users to zoom the Google Map
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: latLng
    };

    map = new google.maps.Map(document.getElementById('googlemaps'),
        mapOptions);

    // Show the default red marker at the location
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP
    });
}

google.maps.event.addDomListener(window, 'load', showGoogleMaps);
