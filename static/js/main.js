AOS.init({
 duration: 800,
 easing: 'slide'
});

function getChurchMap(){
  var ChurchLatLng = {lat: 45.603628, lng: 9.300047};
  var ParkLatLng1 = {lat: 45.605007, lng: 9.299551};
  var ParkLatLng2 = {lat: 45.603417, lng: 9.301028};
  var ParkLatLng3 = {lat: 45.603638, lng: 9.303500};

  var map = new google.maps.Map(document.getElementById('map-cerimonia'), {
    zoom: 16,
    center: ChurchLatLng
  });

  var marker = new google.maps.Marker({
    position: ChurchLatLng,
    map: map
  });

  var marker1 = new google.maps.Marker({
    position: ParkLatLng1,
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    },
    title: 'Parcheggio via Ada Negri'
  });
  var infowindow1 = new google.maps.InfoWindow({
    content: 'Parcheggio via Ada Negri'
  });
  marker1.addListener('click', function() {
    infowindow1.open(map, marker1);
  });

  var marker2= new google.maps.Marker({
    position: ParkLatLng2,
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    },
    title: 'Parcheggio piazza Papa Giovanni XXIII'
  });
  var infowindow2 = new google.maps.InfoWindow({
    content: 'Parcheggio piazza Papa Giovanni XXIII'
  });
  marker2.addListener('click', function() {
    infowindow2.open(map, marker2);
  });

  var marker3 = new google.maps.Marker({
    position: ParkLatLng3,
    map: map,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    },
    title: 'Parcheggio via Villa Ambrogio'
  });
  var infowindow3 = new google.maps.InfoWindow({
    content: 'Parcheggio via Villa Ambrogio'
  });
  marker3.addListener('click', function() {
    infowindow3.open(map, marker3);
  });
}

(function($) {

 "use strict";

 $(window).stellar({
   responsive: true,
   parallaxBackgrounds: true,
   parallaxElements: true,
   horizontalScrolling: false,
   hideDistantElements: false,
   scrollProperty: 'scroll'
 });


 var fullHeight = function() {

   $('.js-fullheight').css('height', $(window).height());
   $(window).resize(function(){
     $('.js-fullheight').css('height', $(window).height());
   });

 };
 fullHeight();

 // loader
 var loader = function() {
   setTimeout(function() {
     if($('#ftco-loader').length > 0) {
       $('#ftco-loader').removeClass('show');
     }
   }, 1);
 };
 loader();

 // Scrollax
  $.Scrollax();



  // Burger Menu
 var burgerMenu = function() {

   $('body').on('click', '.js-fh5co-nav-toggle', function(event){

     event.preventDefault();

     if ( $('#ftco-nav').is(':visible') ) {
       $(this).removeClass('active');
     } else {
       $(this).addClass('active');
     }



   });

 };
 burgerMenu();


 var onePageClick = function() {


   $(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
     event.preventDefault();

     var href = $.attr(this, 'href');

     $('html, body').animate({
         scrollTop: $($.attr(this, 'href')).offset().top - 70
     }, 500, function() {
       // window.location.hash = href;
     });
   });

 };

 onePageClick();


 var carousel = function() {
   $('.carousel-friends').owlCarousel({
     autoplay: true,
     autoHeight: true,
     center: true,
     loop: true,
     items:1,
     margin: 30,
     stagePadding: 0,
     nav: false,
     dots: true,
     navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
     responsive:{
       0:{
         items: 1
       },
       600:{
         items: 2
       },
       1000:{
         items: 5
       }
     }
   });

   $('.carousel-testimony').owlCarousel({
     autoplay: true,
     autoHeight: true,
     center: true,
     loop: true,
     items:1,
     margin: 30,
     stagePadding: 0,
     nav: false,
     dots: true,
     navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
     responsive:{
       0:{
         items: 1
       },
       600:{
         items: 2
       },
       1000:{
         items: 3
       }
     }
   });

 };
 carousel();

 $('nav .dropdown').hover(function(){
   var $this = $(this);
   // 	 timer;
   // clearTimeout(timer);
   $this.addClass('show');
   $this.find('> a').attr('aria-expanded', true);
   // $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
   $this.find('.dropdown-menu').addClass('show');
 }, function(){
   var $this = $(this);
     // timer;
   // timer = setTimeout(function(){
     $this.removeClass('show');
     $this.find('> a').attr('aria-expanded', false);
     // $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
     $this.find('.dropdown-menu').removeClass('show');
   // }, 100);
 });


 $('#dropdown04').on('show.bs.dropdown', function () {
   console.log('show');
 });

 // scroll
 var scrollWindow = function() {
   $(window).scroll(function(){
     var $w = $(this),
         st = $w.scrollTop(),
         navbar = $('.ftco_navbar'),
         sd = $('.js-scroll-wrap');

     if (st > 150) {
       if ( !navbar.hasClass('scrolled') ) {
         navbar.addClass('scrolled');
       }
     }
     if (st < 150) {
       if ( navbar.hasClass('scrolled') ) {
         navbar.removeClass('scrolled sleep');
       }
     }
     if ( st > 350 ) {
       if ( !navbar.hasClass('awake') ) {
         navbar.addClass('awake');
       }

       if(sd.length > 0) {
         sd.addClass('sleep');
       }
     }
     if ( st < 350 ) {
       if ( navbar.hasClass('awake') ) {
         navbar.removeClass('awake');
         navbar.addClass('sleep');
       }
       if(sd.length > 0) {
         sd.removeClass('sleep');
       }
     }
   });
 };
 scrollWindow();



 var counter = function() {

   $('#section-counter, .hero-wrap, .ftco-counter').waypoint( function( direction ) {

     if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

       var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
       $('.number').each(function(){
         var $this = $(this),
           num = $this.data('number');
           console.log(num);
         $this.animateNumber(
           {
             number: num,
             numberStep: comma_separator_number_step
           }, 7000
         );
       });

     }

   } , { offset: '95%' } );

 }
 counter();


 var contentWayPoint = function() {
   var i = 0;
   $('.ftco-animate').waypoint( function( direction ) {

     if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

       i++;

       $(this.element).addClass('item-animate');
       setTimeout(function(){

         $('body .ftco-animate.item-animate').each(function(k){
           var el = $(this);
           setTimeout( function () {
             var effect = el.data('animate-effect');
             if ( effect === 'fadeIn') {
               el.addClass('fadeIn ftco-animated');
             } else if ( effect === 'fadeInLeft') {
               el.addClass('fadeInLeft ftco-animated');
             } else if ( effect === 'fadeInRight') {
               el.addClass('fadeInRight ftco-animated');
             } else {
               el.addClass('fadeInUp ftco-animated');
             }
             el.removeClass('item-animate');
           },  k * 50, 'easeInOutExpo' );
         });

       }, 100);

     }

   } , { offset: '95%' } );
 };
 contentWayPoint();

 // magnific popup
 $('.image-popup').magnificPopup({
   type: 'image',
   closeOnContentClick: true,
   closeBtnInside: false,
   fixedContentPos: true,
   mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
    gallery: {
     enabled: true,
     navigateByImgClick: true,
     preload: [0,1] // Will preload 0 - before current, and 1 after the current image
   },
   image: {
     verticalFit: true
   },
   zoom: {
     enabled: true,
     duration: 300 // don't foget to change the duration also in CSS
   }
 });

 $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
   disableOn: 700,
   type: 'iframe',
   mainClass: 'mfp-fade',
   removalDelay: 160,
   preloader: false,

   fixedContentPos: false
 });

 var bgVideo = function() {
   $('.player').mb_YTPlayer();
 };
 bgVideo();


 function makeTimer() {

   var endTime = new Date("16 May 2020 11:00:00 GMT+02:00");
   endTime = (Date.parse(endTime) / 1000);

   var now = new Date();
   now = (Date.parse(now) / 1000);

   var timeLeft = endTime - now;

   var days = Math.floor(timeLeft / 86400);
   var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
   var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
   var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

   if (hours < "10") { hours = "0" + hours; }
   if (minutes < "10") { minutes = "0" + minutes; }
   if (seconds < "10") { seconds = "0" + seconds; }

   $("#days").html(days + "<span>Days</span>");
   $("#hours").html(hours + "<span>Hours</span>");
   $("#minutes").html(minutes + "<span>Minutes</span>");
   $("#seconds").html(seconds + "<span>Seconds</span>");

 }

 setInterval(function() { makeTimer(); }, 1000);

 function prepareCard(regalo, appendTo){
   // console.log(regalo);

   var $comp = $('<div>', {
                 class:"col-md-6 col-lg-4 col-xl-3 py-2"});

   var $card = $('<div>', {
                 class:"card h-100 text-center",
                 id: "regalo-" + regalo.Id.toString()});

   var $cardImg = $('<img>', {
               class: "card-img-top",
               src: regalo.Img})

   var $cardBody = $('<div>', {class: 'card-body'})

   var $cardTitle = $('<h5>', {
     class: 'card-title'
   }).html(regalo.Name + '<br>' + regalo.Prezzo + '&euro;');

   var $cardBar = $('<div>', {
     class: 'progress',
     html: $('<div>', {
       class: 'progress-bar',
       role: 'progressbar',
       'aria-valuenow': regalo.Perc.toString(),
       'aria-valuemin':"0",
       'aria-valuemax':"100"
     })
   })

   $cardBar.find('.progress-bar').css('width', regalo.Perc+'%').attr('aria-valuenow', regalo.Perc).text(regalo.Perc+'%');;

   var $cardFooter = $('<div>', {
     class: 'card-footer',
     html: $('<button>', {
       class:"btn btn-primary",
       type:"button",
       'data-toggle': "modal",
       'data-target': "#ModalRegalo",
       'data-category': regalo.Category,
       'data-name': regalo.Name,
       'data-id': "regalo-" + regalo.Id
     }).text('Contribuisci!')
   })

   $cardBody.append($cardTitle, $cardBar);
   $card.append($cardImg, $cardBody, $cardFooter);
   $comp.append($card);
   $('#' + appendTo).append($comp);
 }

 $(function(){
   $.ajax({
     url: '/populateListaCasa',
     type: 'POST',
     contentType: "application/json",
     dataType: 'json',
     success: function(response){
       var lista = JSON.parse(response);
       $(lista).each(function(){
         prepareCard(this, "listaCasa");
       })
     },
     error: function(error){
       console.log(error);
     }
   })
 })

  $(function(){
    $.ajax({
      url: '/populateListaViaggio',
      type: 'POST',
      contentType: "application/json",
      dataType: 'json',
      success: function(response){
        var lista = JSON.parse(response);
        $(lista).each(function(){
          prepareCard(this, "listaViaggio");
        })
      },
      error: function(error){
        console.log(error);
      }
    })
  })

 // $(function(){
 //   $('#lista-nozze').find('.card').each(function(){
 //     var card = $(this);
 //
 //     var $cardImg = $('<img>', {
 //                 class: "card-img-top",
 //                 src: card.attr('imgSrc')})
 //     var $cardBody = $('<div>', {class: 'card-body'})
 //
 //     var $cardTitle = $('<h5>', {
 //       class: 'card-title'
 //     }).html(card.attr('id') + '<br>' + card.attr('importo') + '&euro;');
 //
 //     var $cardBar = $('<div>', {
 //       class: 'progress',
 //       html: $('<div>', {
 //         class: 'progress-bar',
 //         role: 'progressbar',
 //         'aria-valuenow':"0",
 //         'aria-valuemin':"0",
 //         'aria-valuemax':"100"
 //       })
 //     })
 //
 //     var $cardFooter = $('<div>', {
 //       class: 'card-footer',
 //       html: $('<button>', {
 //         class:"btn btn-primary",
 //         type:"button",
 //         'data-toggle': "modal",
 //         'data-target': "#ModalRegalo",
 //         'data-category': card.attr('categ')
 //       }).text('Contribuisci!')
 //     })
 //
 //     $cardBody.append($cardTitle, $cardBar);
 //
 //     card.append($cardImg, $cardBody, $cardFooter)
 //
 //   })
 // });

 $('#ModalShowChurchMap').on('show.bs.modal', function (event) {
     $('#ModalShowChurchMap').removeClass("invisible");
     $('#ModalShowChurchMap').modal('toggle');
     getChurchMap()
 })

 $('#rsvp-submit').on('click', function (){
    var nome = $('#rsvpNome').val();
    var email = $('#rsvpEmail').val();
    var numAdulti = $('#rsvpAdulti').val();
    var numBimbi = $('#rsvpBimbi').val();
    var numBebe = $('#rsvpBebe').val();
    var allergie = $('#rsvpAllergie').val();

    $.ajax({
        type: "POST",
        url: "/sendMailRSVP",
        data: {nome:nome, email:email, numAdulti:numAdulti,
          numBimbi:numBimbi, numBebe:numBebe, allergie:allergie},
        success : function(){},
        error: function (error) {
            console.log(error);
        },
    });
 })

 $('#ModalRegalo').on('show.bs.modal', function (event) {
     var button = $(event.relatedTarget) // Button that triggered the
     // Get the name of the present from the id of the clicked card
     var chosenPresent = button.data('name')
     // Extract info from data-* attributes
     var chosenCategory = button.data('category')
     var titleMessage = (chosenCategory === 'casa') ? "ad un pezzetto della nostra casa!" : "ad una tappa della nostra luna di miele!"
     // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
     // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
     var modal = $(this)
     modal.find('.modal-title#modal-title-grazie').text('Grazie per aver scelto di contribuire ' + titleMessage)
     modal.find('.modal-body input#regalo-name').val(chosenPresent)
     modal.find('.modal-body input#regalo-id').attr('val', button.data('id'))
 })

 function updateProgressBar(){
   var importo = $('#regalo-importo').val();
   var chosenPresentId = $('#regalo-id').attr('val');
   // Get the object containing the progress bar
   var chosenPresent = $('#' + chosenPresentId);
   // var presentCost = chosenPresent.attr('importo');
   var progressBar = chosenPresent.find('.progress-bar')

   var validDonation = true;
   $.ajax({
     url: '/donate',
     async: false,
     data: {id:chosenPresentId, importo:importo},
     traditional:true,
     type: 'POST',
     success: function(response){
       console.log(response);
       var newPerc = response['newPerc'];
       validDonation = response['validDonation'];
       progressBar.css('width', newPerc+'%').attr('aria-valuenow', newPerc).text(newPerc+'%');
     },
     error: function(error){
       console.log(error);
     }
   })

   return validDonation;
 }

 function submitForm(){
   // Initiate Variables With Form Content
   var name = $("#regalo-from").val();
   var email = $("#regalo-from-email").val();
   var message = $("#regalo-message").val();
   var regalo = $("#regalo-name").val();
   var importo = $("#regalo-importo").val();

   $.ajax({
       type: "POST",
       url: "/sendMailRegalo",
       data: {name:name, email:email, message:message, regalo:regalo, importo:importo},
       success : function(text){
           console.log('---------------------------');
           console.log(text);
           console.log('---------------------------');
           // if (text == "success"){
           //     formSuccess();
           // }
       },
       error: function (error) {
           console.log(error);
       },
   });

   console.log('Triggered');
 }

 // function formSuccess(){
 //     $( "#msgSubmit" ).removeClass( "hidden" );
 // }

 $("#makeDonation").submit(function(event){
     // cancels the form submission
     event.preventDefault();
     var validDonation = updateProgressBar();
     $("#ModalRegalo").modal('hide');
     if(validDonation){
       $("#ModalRegaloGrazie").modal('show');
       submitForm();
     }
 });

})(jQuery);
