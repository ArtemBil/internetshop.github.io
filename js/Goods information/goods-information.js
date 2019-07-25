var getGoodsInformation = (function () {
    var items;
    document.addEventListener("DOMContentLoaded", xhttr);

    function xhttr() {
        var xhr = new XMLHttpRequest();
        var categories;
        xhr.open("GET", "../../json/category.json");

        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                categories = JSON.parse(xhr.responseText);
                items = categories;
                getCategories(categories);
                Basket();
            }
        });
        xhr.send();
    }


    function getPreviousBreadcrumb(breadcrumbs, category) {
        return ` ${breadcrumbs}
        
        <li class="breadcrumb__item">
        <a href="${category.location}" class="breadcrumb__lnk">${category.category}</a>
        </li>
        
        <li class="breadcrumb__item">
        <a href="${document.location.href}" class="breadcrumb__lnk">${category.name}</a>
        </li>`;
    }

    //перебираем масив
    function getCategories(categories) {
        categories.forEach(element => {
            for (var key in element) {
                getSpecificCategory(element, key);
            }
        });
    }
    // перебираем масив
    function getSpecificCategory(element, key) {
        element[key].forEach(item => {
            for (var key in item) {
                item[key].forEach((specificClothes) => {
                    renderClothesInformation(specificClothes);
                });
            }
        });
    }
    //имеет информацию о товаре
    function getItems() {
        return items;
    }

    //получаем breadcrumbsTempplate и все объекты и проверяем id, и добавляем разметку
    function renderClothesInformation(specificClothes) {
        // var arrOfRecentGoods = []; 

        // если hash равен id то добавляем крошки, и разметку
        if (document.location.hash == specificClothes.id) {
            // добавляем товар, для недавно просмотренного.
            var recent = JSON.parse(localStorage.getItem('recentGoods')) || [];
            var checkArrRecent = recent.filter(item => {
                return specificClothes.id == item.id;
            });
            if (checkArrRecent.length == 0) {
                recent.push(specificClothes);
            }
            localStorage.setItem('recentGoods', JSON.stringify(recent));

            var breadcrumbs = JSON.parse(localStorage.getItem('breadcrumbList'));
            var newBreadcrumb = getPreviousBreadcrumb(breadcrumbs, specificClothes);

            document.getElementById('breadcrumb__js').innerHTML = newBreadcrumb;

            var clothes = renderCurrentClothes(specificClothes);
            document.querySelector('.goods').innerHTML = clothes;

        }
    }

    //шаблон li елементов для добавления маленьких фото
    function makeSmallerPhoto(photos) {
        return `
            <li class="wrapper__small">
                <a href="javascript: void(0);" ><img src="${photos}" alt="" class="image__style-small change-main "></a>
            </li>
        `;
    }

    // function which returns html template(шаблон)     
    function renderCurrentClothes(goods) {
        return ` <div class="goods__block">
    <div class="goods__wrapper">
        <a href="javascript: void(0);"  id="${goods.id}"><img src="${goods.imageUrl}" alt="" class="image__style" id="mainPhoto"></a>
        <ul class="wrapper__small__main" id="tabs">
    
             ${goods.mini_photos.map(makeSmallerPhoto).join('')}
            
        </ul>
    </div>
</div>
<h2 class="goods__heading">${goods.name}</h2>
        <h3 class="goods__articul">Articul number: ${goods.articul}</h3>
        <p class="goods__price">${goods['price']} ${goods.currency}</p>
        <!-- Sending -->
        <div class="block__sending">
            <p class="some__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
            quisquam est mollitia quos itaque hic eligendi ea consequuntur .</p>
            <h1 class="size__heading">size</h1>

           <form id="sizes">
            <label class="checkbox-wrapper">
           <input type="radio" name="size" class="size__checkbox-hidden">
            <span class="new-checkbox">${goods.sizes['small']}</span>
            </label>
            <label class="checkbox-wrapper">
            <input type="radio" name="size" class="size__checkbox-hidden">
            <span class="new-checkbox">${goods.sizes['bigger']}</span>
            </label>
            <label class="checkbox-wrapper">
            <input type="radio" name="size" class="size__checkbox-hidden">
            <span class="new-checkbox">${goods.sizes['normal']}</span>
            </label>
            <label class="checkbox-wrapper">
            <input type="radio" name="size" class="size__checkbox-hidden">
            <span class="new-checkbox">${goods.sizes['big']}</span>
            </label>
            <label class="checkbox-wrapper">
            <input type="radio" name="size" class="size__checkbox-hidden">
            <span class="new-checkbox">${goods.sizes['veryBig']}</span>
            </label>
        </form>

                <p class="error-size hidden">You have not chosen a size</p>
                <button class="btn-style" id="add-to-cart" data-articul="${goods.articul}" 
                data-name="${goods.name}" data-price="${goods.price}" data-img="${goods.imageUrl}"
                data-color="${goods.color}">
                        Add to Cart
                </button>
            </div>`;
    }

    /* функция, которая обрабатывает кнопку, работает с размерами, 
    и отправкой товара в корзину через localStorage */
    function Basket() {
        var chosenSize;
        var counterQTY = 1;
        var btnBasket = document.getElementById('add-to-cart');
        var basketCounter = document.getElementById('basketCounter');
        var sizes = document.getElementById('sizes');
        
        sizes.addEventListener('click', addSizeToCart)
        btnBasket.addEventListener('click', addToCart);


        //Функция отправляет размер в localStorage
        function addSizeToCart(event) {
            var target = event.target.parentNode.lastElementChild.innerHTML;
            if (event.target.checked) {
                chosenSize = target;
            }
        }

        // Функция добавляет информацию о товаре в localStorage
        function addToCart() {
            var errorMessage = document.querySelector('.error-size');

            var articul = this.getAttribute('data-articul');
            var name = this.getAttribute('data-name');
            var price = this.getAttribute('data-price');
            var img = this.getAttribute('data-img');
            var color = this.getAttribute('data-color');

            function Goods(articul, name, price, img, color, counterQTY, chosenSize) {
                this.articul = articul;
                this.name = name;
                this.price = price;
                this.img = img;
                this.color = color;
                this.qty = counterQTY;
                this.size = chosenSize;
            }
            var informationGoods = new Goods(articul, name, price, img, color, counterQTY, chosenSize);
            
            // если размер выбран (:checked), то отправляем в localStorage
            // проверка на количество нажатий на один и тот же размер, 
            if (informationGoods.size == undefined) {
                errorMessage.classList.remove('hidden');
            } else {
                var itemsInCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
                for(var key in informationGoods) {
                    console.log(informationGoods);
                    
                }
                itemsInCart.forEach(item => {
                   if (informationGoods.articul == item.articul && informationGoods.size == item.size) {
                       item.qty++;
                   }
                });
                var checkArray = itemsInCart.filter(element => {
                    return informationGoods.articul == element.articul && informationGoods.size == element.size;
                })

                if (checkArray.length == 0) {
                    itemsInCart.push(informationGoods);
                    if (itemsInCart != undefined) {
                        localStorage.setItem('counterClick', ++basketCounter.innerHTML);
                    }
                }

                localStorage.setItem('shoppingCart', JSON.stringify(itemsInCart));
                errorMessage.classList.add('hidden');
            }
        }
    }
    
})();