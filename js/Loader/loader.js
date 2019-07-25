var loader = (function() {

document.body.onload = function() {
    doLoader();
}

function doLoader() {
    var preloader = document.getElementById('loaderMain');
    if (!preloader.classList.contains('done')) {
        preloader.classList.add('done');
    }
}



})();