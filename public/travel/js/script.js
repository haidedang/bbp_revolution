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
                scrollTop: $(".line1").offset().top-50},
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
        $("body").animate({"scrollTop": window.scrollY +350}, 3000);
    }
    else
    {
        clicked2=true;
        $(".book-now .two").css({"top": "-1800px"});
        $(".book-now").css({"height": 60});
    }
});

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
        $(".map").css({"height": "110vh"});
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
        $(".map").css({"height": "110vh"});
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
        $(".map").css({"height": "110vh"});
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
        $(".map").css({"height": "110vh"});
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
        $(".map").css({"height": "110vh"});
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
        $(".map").css({"height": "110vh"});
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
        $(".map").css({"height": "110vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[13]=false;
        $("li:nth-child(14)").css({"display": "inline"});
        $('html,body').animate({
            scrollTop: $(".map").offset().top+100},
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
        $(".map").css({"height": "110vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[15]=false;
        $("li:nth-child(16)").css({"display": "inline"});
        $('html,body').animate({
              scrollTop: $(".map").offset().top+100},
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
        $(".map").css({"height": "110vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[17]=false;
        $("li:nth-child(18)").css({"display": "inline"});
        $('html,body').animate({
            scrollTop: $(".map").offset().top+100},
      'slow');
    }
    else
    {
        unclickedArr[17]=true;
        $("li:nth-child(18)").css({"display": "none"});
    }
});
//DAY 10
$("li:nth-child(19)").on('click', function(){

    if(unclickedArr[19])
    {
        $(".map").css({"height": "110vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[19]=false;
        $("li:nth-child(20)").css({"display": "inline"});
        $('html,body').animate({
              scrollTop: $(".map").offset().top+100},
      'slow');
    }
    else
    {
        unclickedArr[19]=true;
        $("li:nth-child(20)").css({"display": "none"});
    }
});
//DAY 11
$("li:nth-child(21)").on('click', function(){

    if(unclickedArr[21])
    {
        $(".map").css({"height": "110vh"});
        $("li:nth-child(2n)").css({"display": "none"});
        for (var i = 0; i < (daysWrapper.children.length); i++) {
            unclickedArr[i] = true;
        }
        unclickedArr[21]=false;
        $("li:nth-child(22)").css({"display": "inline"});
        $('html,body').animate({
            scrollTop: $(".map").offset().top+100},
      'slow');
    }
    else
    {
        unclickedArr[21]=true;
        $("li:nth-child(22)").css({"display": "none"});
    }
});

//googlemaps
//initialize position for GOOGLEMAPS
var position = [27.1959739, 78.02423269999997];

function showGoogleMaps() {

    var latLng = new google.maps.LatLng(position[0], position[1]);

    var locations = [
      ['SHIMLA', 31.1048145, 77.1734033, 11],
      ['SARAHAN', 31.5167835, 77.7938376, 10],
      ['KALPA', 31.5376578, 78.2753776, 9],
      ['NAKO', 31.8815167, 78.6274612, 8],
      ['TABO', 32.0932775,78.3728707, 7]
      ['DHANKAR', 32.0909872, 78.2278556, 6],
      ['KAZA', 32.2275991, 78.0709903, 5],
      ['KAZA', 32.24068253, 78.0619812, 4],
      ['MANALI', 32.2396325, 77.1887145, 3],
      ['ARU', 34.0886568, 75.2616768, 2]
      ['SRINAGAR', 34.1066985,74.7365434, 1]
    ];

    var map = new google.maps.Map(document.getElementById('googlemaps'), {
      zoom: 9, // initialize zoom level - the max value is 21
      gestureHandling: 'none',
      streetViewControl: false, // hide the yellow Street View pegman
      scaleControl: true, // allow users to zoom the Google Map
      center: new google.maps.LatLng(31.6811552,77.9011197),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    // Show the default red marker at the location
    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

}

google.maps.event.addDomListener(window, 'load', showGoogleMaps);
