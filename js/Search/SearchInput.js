var moduleSearchStyling = (function() {
  let searchSiteStyling = document.getElementById("formSearch");
  let inputSearch = document.getElementById("searching");
  let btnOpenSearch = document.getElementById("showSearch");
  let btnSearch = document.getElementById("onSearch");
  let offers = document.querySelector(".offers");
  let showing = true;

  btnOpenSearch.addEventListener("click", MakeTransitionInput);

  function MakeTransitionInput(event) {
    showInput();
  }

  function showInput() {
    btnSearch.classList.remove("hidden");
    btnOpenSearch.parentNode.removeChild(btnOpenSearch);
    showing = false;
    inputSearch.style.display = "block";
    // inputSearch.style.left = -300 + "px";
    inputSearch.style.transition = "1s";
    inputSearch.focus();
    if (window.innerWidth < 468) {
      searchSiteStyling.classList.add("search__Site__small");
      inputSearch.classList.add("input__full-width");
    }
  }
  inputSearch.addEventListener("blur", () => {
    hideInput();
    // offers.classList.add("hidden");
  });

  function hideInput() {
    btnSearch.classList.add("hidden");
    searchSiteStyling.appendChild(btnOpenSearch);
    showing = true;
    inputSearch.style.transition = "1s";
    inputSearch.style.display = "none";
    searchSiteStyling.classList.remove("search__Site__small");
    inputSearch.classList.remove("input__full-width");
  }

  setTimeout(search, 200);

  function search() {
    inputSearch.addEventListener("change", () => {
      var goods = getGoods.getItems();

      goods.forEach(element => {
        for (var key in element) {
          getMoreInfo(element[key]);
        }
      });

      function getMoreInfo(array) {
        array.forEach(item => {
          for (var key in item) {
            getAllInfo(item[key]);
          }
        });
      }
      function getAllInfo(array) {
        array.forEach(item => {
          if (
            inputSearch.value.toLowerCase().trim() ==
            item.name.toLowerCase().trim()
          ) {
            document.location.href = `http://127.0.0.1:5500/Pages/goods/goods.html${
              item.id
            }`;
          }
        });
      }
    });

    inputSearch.addEventListener("keyup", createDropDownd);

    function createDropDownd() {
      var goods = getGoods.getItems();

      goods.forEach(element => {
        for (var key in element) {
          getMoreInfo(element[key]);
        }
      });

      function getMoreInfo(array) {
        array.forEach(item => {
          for (var key in item) {
            getAllInfo(item[key]);
          }
        });
      }
      function getAllInfo(array) {
        array.forEach(item => {
          // if (item.name.toLowerCase().indexOf(inputSearch.value)) {
          if (
            item.name.toUpperCase().includes(inputSearch.value.toLowerCase())
          ) {
            var temp = document.createElement("div");
            temp.className = "wrapperTemp";
            temp.innerHTML += dropdownList(item);

            console.log(
              item.name.toUpperCase().indexOf(inputSearch.value.toLowerCase())
            );

            offers.classList.remove("hidden");
            offers.appendChild(temp);
            // console.log();
          }
        });
      }
    }
  }

  function dropdownList(list) {
    return `
            <a href="http://127.0.0.1:5500/Pages/goods/goods.html${list.id}" class="offers__link" >${list.name}</a>
        `;
  }
  // search();
})();
