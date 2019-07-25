var getGoods = (function () {
  document.addEventListener("DOMContentLoaded", xhttr);
var items;
  function xhttr() {
    var xhr = new XMLHttpRequest();
    var categories;
    xhr.open("GET", "../../json/category.json");

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        categories = JSON.parse(xhr.responseText);
        items = categories;

        // сделать проверку для функций на ссылку
        var currentCategory = getCategoryName(categories); // проверяем на какой мы странице
        // var breadcrumbs = getBreadcrumb(currentCategory);
        var category = getCategory(categories, currentCategory); // фильтруем масив
        renderGoods(category);
        makeSortGoods(category);
        var inint = (function() {
          recentGoods();
        })();

      }
    });
    xhr.send();
  }

  

  function getItems () {
    return items;
}

  /* Функция, которая проверяет в каком мы находимся каталоге(Women or Men or Kids)
   и возвращает его */
  function getCategoryName(category) {
    var getUrl = new URLSearchParams(document.location.search);
    // console.log(category[0])
    if (getUrl.get('category') == 'women') {
      getBreadcrumb(category[0]);
      return category[0];
    } else if (getUrl.get('category') == 'men') {
      getBreadcrumb(category[1]);
      return category[1];
    } else if (getUrl.get('category') == 'kids') {
      getBreadcrumb(category[2]);
      return category[2];
    }
  }
  // функция breadcrumbs
function getBreadcrumb(breadcrumb) {
  var getUlList = document.getElementById('breadcrumb__js');
  
  for (var key in breadcrumb) {
    var templateBreadcrumb = `
    <li class="breadcrumb__item">
    <a href="http://127.0.0.1:5500/Home.html" class="breadcrumb__lnk">Home</a>
    </li>
    <li class="breadcrumb__item">
    <a href="${document.location.origin + document.location.pathname + document.location.search}" class="breadcrumb__lnk">${key}</a>
    </li>`
  }
getUlList.innerHTML = templateBreadcrumb;
  var arrayBreadcrumb = [];
  arrayBreadcrumb.push(templateBreadcrumb);
  localStorage.setItem('breadcrumbList', JSON.stringify(arrayBreadcrumb));
  
}

  // Функция, которая перебирает категорию товара из каталога
  function getCategory(category, currentCategory) {
    // Почему то даёт ошибку без параметра (category)
    var goods = [];
    for (let key in currentCategory) {
      currentCategory[key].forEach(function (currentGoods) {
        goods.push(currentGoods);
      });
    }
    return goods;
  }

  // Функция, которая проверяет в какой мы категории:(coats, outerwears, t-shirts) и заполняем.
  function renderGoods(goods) {
    /* Перебираем весь масив объектов, потом проверяем: 
    если индекс масива равен елементу то отправляем его в добавляем шаблон. */
    goods.forEach(element => {
      // console.log(coats)
      if (goods[0] == element) {
        // возвращается объект с товаром
        getCoats(element);
      } else if (goods[1] == element) {
        getOuterwears(element);
      } else if (goods[2] == element) {
        getTshirts(element);
      }

    });
  }

  // перебираем информацию для категорий, добавляем шаблон и заполняем.
  function getCoats(SpecificGoods) {
    let tempElem = document.createElement("div");
    for (var key in SpecificGoods) {
      SpecificGoods[key].forEach((item) => {
        tempElem.innerHTML += Coat(item);
        document.querySelector(".coats").innerHTML = tempElem.innerHTML;
      })

    }
  }
  // перебираем информацию для категорий, добавляем шаблон и заполняем
  function getOuterwears(SpecificGoods) {
    let tempElem2 = document.createElement("div");
    for (var key in SpecificGoods) {
      SpecificGoods[key].forEach((item) => {
        tempElem2.innerHTML += Outerwear(item);
        document.querySelector(".outerwear").innerHTML = tempElem2.innerHTML;
      })

    }
  }
  // перебираем информацию для категорий, добавляем шаблон и заполняем
  function getTshirts(SpecificGoods) {
    let tempElem3 = document.createElement("div");
    for (var key in SpecificGoods) {
      SpecificGoods[key].forEach((item) => {
        tempElem3.innerHTML += Tshirt(item);
        document.querySelector(".t-shirt").innerHTML = tempElem3.innerHTML;
      })

    }
  }
  // Шаблон для Coats
  function Coat(coats) {
    return `<div class="coats__main coats">
      <div class="coat__block">  
       <div class="image__wrapper">
         <a href="../../../Pages/goods/goods.html${coats.id}"> 
         <img src="${coats.imageUrl}" alt="" class="image__style"></a>
      </div>
       <h2 class="coat__heading">${coats.name}</h2>
       <p class="coat__price">${coats.price} ${coats.currency}</p>
      </div>
   </div>`
  }
  // Шаблон для Outerwears
  function Outerwear(outerwears) {
    return `<div class="outerwear__main outerwear">
          <div class="outerwear__block">
            <div class="image__wrapper">
            <a href="../../../Pages/goods/goods.html${outerwears.id}"><img src="${outerwears.imageUrl}" alt="" class="image__style"></a>
            <h2 class="outerwear__heading">${outerwears.name}</h2>
            <p class="outerwear__price">${outerwears.price} ${outerwears.currency}</p>
          </div>
        </div>
      </div>`
  }
  // Шаблон для T-shirts
  function Tshirt(tshirts) {
    return `<div class="tshirt__main t-shirt">
            <div class="tshirt__block">
              <div class="image__wrapper">
              <a href="../../../Pages/goods/goods.html${tshirts.id}"><img src="${tshirts.imageUrl}" alt="" class="image__style"></a>
              <h2 class="tshirt__heading">${tshirts.name}</h2>
              <p class="tshirt__price">${tshirts.price} ${tshirts.currency}</p>
            </div>
          </div>
        </div>`
  }



  function recentGoods() {
    var listRecent = document.getElementById('addingRecent');
    var headline = document.querySelector('.recent__headline');

    let getRecenetViewed = JSON.parse(localStorage.getItem('recentGoods'));
    if (getRecenetViewed != null) {
     
    getRecenetViewed.forEach(recent => {
      
      listRecent.innerHTML += renderRecentViewed(recent);
      headline.classList.remove('hidden');
      
    
    });
  }
  }

  function renderRecentViewed(goods) {
    return `
    <li class="recent-goods__item image__wrapper">
        <a href="http://127.0.0.1:5500/Pages/goods/goods.html${goods.id}" class="recent-goods__link"><img src="${goods.imageUrl}" alt="photoOfClothes" class="recent-photo__img image__style"></a>
        <h2 class="name-goods__headline">${goods.name}</h2>
    </li>`
  }


  function makeSortGoods(goods) {
    console.log(goods);
    let globArr = [];
    goods.forEach(item=> {
      for(var key in item) {
        item[key].forEach(element => globArr.push(element.price));
      }
    });
      function sortsArray() {
        // console.log(globArr);
        globArr.sort((a, b) => b-a);
        return globArr;
      };
      console.log(sortsArray());

  }

  return {
    getItems: getItems
  };
})();

