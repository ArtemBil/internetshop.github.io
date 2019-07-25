// // setTimeout для запуска скрипта, после запуска всех других скриптов.
// // Таким образом создаем задержку загрузки скрипта.
var timeOut = setTimeout(MakesTabs, 200)
// "articul": 1000,

function MakesTabs() {

    var mainPho = document.getElementById('mainPhoto');
    var smallPhoto = document.querySelectorAll('.change-main');
    var LiElement = document.querySelectorAll('.wrapper__small');
    LiElement[0].classList.add('active');

    
    // Перебираем все фотографии и вешаем обработчик переключения фотографий
    for (var i = 0; i < smallPhoto.length; i++) {
        smallPhoto[i].addEventListener('click', toggleTabs);
    }

    // Функция переключения фотографий
    function toggleTabs(event) {

        // Отлавливаем нажатие на таб-фото
        var event = event.target;
            // находит первого родителя
        var li = event.closest('.wrapper__small');

        for ( var i =0 ;i < LiElement.length; i++) {
            LiElement[i].classList.remove('active');
        }
        li.classList.add('active');
        // Ставим новый атрибут главной фотографии, в который будет добавляться
        // ссылка на нажатую фотографию.       
        mainPho.setAttribute('src', event.src);
        
    }
}

// В втором варианте event.target действует на каждого ребёнка ul;
// Нужно как то исправить


// setTimeout для запуска скрипта, после запуска всех других скриптов.
// Таким образом создаем задержку загрузки скрипта.
// var timeOut = setTimeout(MakesTabs, 10)

// function MakesTabs() {
//     var ul = document.getElementById('tabs');
//     var mainPho = document.getElementById('mainPhoto');
//     var smallPhoto = document.querySelectorAll('.change-main');
//     var LiElement = document.querySelectorAll('.wrapper__small');
//     console.log(ul)
//     ul.addEventListener('click', toggleTabs);


//     function toggleTabs(event) {
//         // Отлавливаем нажатие на таб-фото
//         var li = event.target;
//         // с помощью css свойства pointer-events, мы запрещаем переход(например) src на нажатом элементе
//         var img = li.querySelector('img');
//         console.log(li);
//            // Ставим новый атрибут главной фотографии, в кот    орый будет добавляться
//            // ссилка на нажатую фотографию.
        
           
 
//            for ( var i =0 ;i < LiElement.length; i++) {
//                LiElement[i].classList.remove('active');
//            }
//            li.classList.add('active');
//            mainPho.setAttribute('src', img.src);
    
        
//     }

// }