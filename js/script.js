// console.log(getGoodsInformation.getItems());
var mainScript = (function () {
//Делаем щётчик
    var basketCounter = document.getElementById('basketCounter');

    var getCounter;

    getCounter = localStorage.getItem('counterClick');
    if (getCounter > 0) {

        basketCounter.innerHTML = getCounter;
    } else {
        basketCounter.innerHTML = 0;
    }

    // function searchGoods () {
    //     var searchInput = document.querySelector('.search__input').value;
    
    //     console.log(searchInput);
        
    //   }
    //   searchGoods();

})();
