var makeBasket = (function () {
  var subtotal;
  var getInfoLocStorage =
    JSON.parse(localStorage.getItem("shoppingCart")) || [];

  renderBasketInformation(getInfoLocStorage);

  function renderBasketInformation(basketGoods) {
    if (basketGoods.length == 0) {
      emptyBasket();
    } else {
      var makeTemplate = getTemplate(basketGoods);
      document.getElementById("basketInformation").innerHTML = makeTemplate;
      getSumSubtotal();
      manipulationOfQty();
      setTimeout(deleteGoods, 100);
    }
  }

  // Если корзина пуста, то вызываем эту функцию
  function emptyBasket() {
    var divEmptyBasket = document.createElement("div");
    divEmptyBasket.innerHTML = "<h1 class='emptyBasket'> Your basket is empty</h1>";
    document.querySelector(".basket__wrapper").appendChild(divEmptyBasket);
  }

  // Функция создает строку информации о товаре
  function templateBasketInformation(goods) {
    return `<tr class="row-info__goods">
    <td class="cell-info__goods cell-info__goods--product"><a href="javascript: void(0);" class="link"> <img src="${goods.img}" alt="Goods" class="goods-photo"></a></td>
    <td class="cell-info__goods cell-info__goods--description">${goods.name} <!--<span class="articul">1003</span>--></td>
    <td class="cell-info__goods cell-info__goods--color">${goods.color}</td>
    <td class="cell-info__goods cell-info__goods--size">${goods.size}</td>
    <td class="cell-info__goods cell-info__goods--qty"><input type="number" size="1" min="1" max="100" value="1" class="qty" data-qty="${goods.qty}"> </td>
    <td class="cell-info__goods cell-info__goods--amount"><span class="price">${goods.price}</span></td>
    <td class="cell-info__goods cell-info__goods--delete"><span class="delete">✖</span></td>
</tr>`;

  }
  // функция создает таблицу корзины и заливает в неё информацию о товаре
  function getTemplate(templateBasket) {
    return `<table class="goods-information">
<tr class="row-headlines">
<th class="cell__headlines cell__headlines--product">Product</th>
<th class="cell__headlines cell__headlines--description">Description</th>
<th class="cell__headlines cell__headlines--color">Color</th>
<th class="cell__headlines cell__headlines--size">Size</th>
<th class="cell__headlines cell__headlines--qty">Qty</th>
<th class="cell__headlines cell__headlines--amount">Amount</th>
<th class="cell__headlines cell__headlines--delete">Delete</th>
</tr>
${templateBasket.map(templateBasketInformation).join('')}
</table>
<section class="block-sendOrder">
<div class="wrapper-subotal"> 
<section class="block-subtotal"><h3 class="subtotal-headline">Subtotal: <span id="exact-amount"> </span><span class="curency"> $</span> </h3></section></div>
<a href="../Category.html" class="continue">Continue Shopping</a>
<form method="POST" class="send-form"><a href="/Pages/Ordered/order.html" class="btn-sending">Order Now</a></form>`;
  }

  // Get the exact amount
  function getSumSubtotal() {
    subtotal = document.getElementById("exact-amount");


    var getPrice = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    var sum = 0;
    var newArr = [];
    getPrice.forEach(element => {
      newArr.push(parseFloat(element.price));
    });

    newArr.forEach(item => {
      sum += item;

    });
    return subtotal.innerHTML = sum.toFixed(2);
  }

  // calculateQty
  function calculateQty() {
    var qties = document.querySelectorAll('.qty');
    var prices = document.querySelectorAll('.price');
    var totalPriceQty = 0;


// here I calculate price with qty values 
    for (var i = 0; i < prices.length; i++) {
      totalPriceQty += prices[i].innerText * qties[i].value;
    }
    return subtotal.innerHTML = totalPriceQty.toFixed(2);
  }
  function getQtyNumber() {
    //here I'am assigning qty values from getInfoLocalStorage to input qty values.  
    var qties = document.querySelectorAll('.qty');
    for (var i = 0; i < qties.length; i++) {
      qties[i].value = getInfoLocStorage[i].qty;
    }
  }
  
  // обрабатываем input QTY
  function manipulationOfQty() {
   
    getQtyNumber();
    calculateQty();

    var tableQty = document.querySelector(".goods-information");
    tableQty.addEventListener("click", makeQTY);

    function makeQTY() {
      calculateQty();
    }
  }

  // удаляет строку о товаре, обнуляет щетчик, удаляте с localStorage информацию о товаре
  function deleteGoods() {
    var table = document.querySelector(".goods-information");
    var btnSend = document.querySelector('.btn-sending');
    var getCloseBtn = document.querySelectorAll(".delete");
    // console.log(getCloseBtn);

    table.addEventListener("click", deleteInfoRow);
    btnSend.addEventListener('click', () => {
      localStorage.clear();
    });

    function deleteInfoRow(event) {
      var goodsInfo = document.getElementById("basketInformation");
      for (var i = 0; i < getCloseBtn.length; i++) {
        if (
          event.target.closest(".row-info__goods") &&
          event.target == getCloseBtn[i]
        ) {
          var currentIndex = getCloseBtn[i].parentNode.parentNode.rowIndex;
          console.log(currentIndex);
          
          table.deleteRow(currentIndex);
          var deleteFromLocSt = JSON.parse(
            localStorage.getItem("shoppingCart")
          );
          deleteFromLocSt.pop();
          localStorage.setItem("shoppingCart", JSON.stringify(deleteFromLocSt));

          calculateQty();

          localStorage.getItem("counterClick");
          localStorage.setItem("counterClick", --basketCounter.innerHTML);
          if (localStorage.getItem("counterClick") <= 0) {
            goodsInfo.parentNode.removeChild(goodsInfo);
            localStorage.clear();
            localStorage.setItem("counterClick", (basketCounter.innerHTML = 0));
            emptyBasket();
          }
        }
      }
    }
  }
})();