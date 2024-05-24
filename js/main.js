const data = [
  {
    category: "burger",
    id: 1,
    title: "Мясная бомба",
    price: 689,
    weight: "520",
    img: "burger1",
  },
  {
    category: "burger",
    id: 2,
    title: "Супер сырный",
    weight: "512",
    price: 439,
    img: "burger2",
  },
  {
    category: "hot-dog",
    id: 3,
    title: "Pizdatiy",
    weight: "314",
    price: 347,
    img: "hot-dog1",
  },
];

const navigationList = document.querySelector(".navigation__list");
const navigationBtns = document.querySelectorAll(".navigation__button");
const catalogGoods = document.querySelector(".catalog__list");
const catalogTitle = document.querySelector(".catalog__title");
const modalProduct = document.querySelector(".modal_product");

const changeActiveNavigationBtn = (e) => {
  const target = e.target;
  const navigationBtn = target.closest(".navigation__button");
  if (!navigationBtn) return;

  navigationBtns.forEach((el) => el.classList.remove("navigation__button_active"));
  navigationBtn.classList.add("navigation__button_active");
  updateCatalog(navigationBtn.textContent, navigationBtn.dataset.category);
};

const renderCardProduct = ({ title, weight, img, price, id }) => {
  const card = `
  <li class="catalog__item" id="${id}">
              <article class="product">
                <img class="product__image" src="img/${img}.jpg" alt="${title}">

                <p class="product__price">${price}<span class="currency">₽</span></p>

                <h3 class="product__title">
                  <button class="product__detail">${title}</button>
                </h3>

                <p class="product__weight">${weight}г</p>

                <button class="product__add">Добавить</button>
              </article>
            </li>
  `;

  return card;
};

const updateCatalog = (titleCategory, title) => {
  catalogTitle.innerHTML = titleCategory;
  catalogGoods.innerHTML = "";
  const filterProducts = data.filter((el) => el.category === title);
  const cardsProducts = filterProducts.map((el) => renderCardProduct(el));
  catalogGoods.insertAdjacentHTML("afterbegin", cardsProducts);
};

const openModalCard = (e) => {
  const target = e.target;
  const productID = +target.closest(".catalog__item").id;

  if (!target.closest(".product__add") && !target.closest(".product__title")) return;

  modalProduct.classList.add("modal_open");
  const currentProduct = data.find((el) => el.id === productID);
  modalProduct.innerHTML = `
  <div class="modal__main modal-product">
  <div class="modal-product__container">
    <h2 class="modal-product__title">${currentProduct.title}</h2>

    <div class="modal-product__content">
      <img class="modal-product__image" src="img/${currentProduct.img}.jpg" alt="${currentProduct.title}">


      <p class="modal-product__description">Супер мясное наслаждение! Большая рубленая котлета из свежего говяжего
        мяса покорит вас своей сочностью, а хрустящие листья салата добавят свежести.</p>

      <div class="modal-product__ingredients ingredients">
        <h3 class="ingredients__title">Состав:</h3>

        <ul class="ingredients__list">
          <li class="ingredients__item">Пшеничная булочка</li>
          <li class="ingredients__item">Котлета из говядины</li>
          <li class="ingredients__item">Красный лук</li>
          <li class="ingredients__item">Листья салата</li>
          <li class="ingredients__item">Соус сорчичный</li>
        </ul>

        <p class="ingredients__calories">520г, ккал 430</p>
      </div>
    </div>

    <div class="modal-product__footer">
      <div class="modal-product__add">
        <button class="modal-product__btn">Добавить</button>
        <div class="count">
          <button class="count__minus">-</button>

          <p class="count__amount">1</p>

          <button class="count__plus">+</button>
        </div>
      </div>

      <p class="modal-product__price">
        <span class="modal-product__price-count">689</span>
        <span class="currency">₽</span>
      </p>
    </div>
  </div>

  <button class="modal__close">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="5.07422" y="5.28247" width="1" height="20" transform="rotate(-45 5.07422 5.28247)"></rect>
      <rect x="5.78125" y="19.4246" width="1" height="20" transform="rotate(-135 5.78125 19.4246)"></rect>
    </svg>
  </button>
</div>
  `;
};

const init = () => {};

init();

navigationList.addEventListener("click", changeActiveNavigationBtn);
catalogGoods.addEventListener("click", openModalCard);
