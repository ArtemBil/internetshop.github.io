(function() {
  let btn = document.getElementById("btn-to-top");

  btn.addEventListener("click", moveToTop);

  window.addEventListener("scroll", checkCurrentScroll);

  function checkCurrentScroll() {
    
    document.documentElement.scrollTop > 0
      ? btn.classList.remove("hidden")
      
      : document.documentElement.scrollTop == 0
      ? btn.classList.add("hidden")
      : undefined;
  }

  function moveToTop() {
    var inter = setInterval(moveInit, 10);
    function moveInit() {
      var scrollTop = document.documentElement.scrollTop;
      if (scrollTop == 0) {
        clearInterval(inter);
      } else {
        window.scrollBy(0, -30);
      }
    }
  }
})();
