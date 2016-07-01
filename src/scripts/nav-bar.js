;(function(){

    var buttonNavBar = document.querySelector('.nav-bar');
    var menuNavBar = document.querySelector('.menu');

    init();
    
    function init(){
        buttonNavBar.addEventListener('click', toogleNav);
    }

    function toogleNav(){
      menuNavBar.classList.toggle("responsive");
    }

})();
