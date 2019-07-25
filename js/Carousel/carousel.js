var moduleSlider = (function () {

    var previous = document.querySelector("#previous");
    var next = document.querySelector("#next");
    var slider = document.getElementById("Slider");
    
    var sliderRecent = document.getElementById('addingRecent');
    var prevRecent = document.getElementById('previous-recent__span');
    var nextRecent = document.getElementById('next-recent__span');

    var counter = 0;
    var counterRecent = 0;
    
    next.addEventListener("click", ToggleNextSlide);
    previous.addEventListener("click", TogglePreviousSlide);

    nextRecent.addEventListener("click", ToggleRecentNextSlide);
    prevRecent.addEventListener("click", ToggleRecentPreviousSlide);

    function ToggleNextSlide() {

        slider.style.cssText = "transition: 1s";
        counter -= 200;
        if (counter == -1200) counter = 0;
        slider.style.left = counter + "px";
        

    }

    function TogglePreviousSlide() {

        slider.style.cssText = "transition: 1s";
        counter += 200;
        if (counter == 200) counter = -1000;
        slider.style.left = counter + "px";



    }

    function ToggleRecentNextSlide() {

        sliderRecent.style.cssText = "transition: 1s";
        counterRecent -= 200;
        if (counterRecent == -1200) counterRecent = 0;
        sliderRecent.style.left = counterRecent + "px";
        

    }

    function ToggleRecentPreviousSlide() {

        sliderRecent.style.cssText = "transition: 1s";
        counterRecent += 200;
        if (counterRecent == 200) counterRecent = -1000;
        sliderRecent.style.left = counterRecent + "px";



    }

    // var interval = setInterval(ToggleNextSlide, 2000);

})();