import { closeModalCard, openModalCard } from "./modal.js";
import { renderOrderProduct } from "./cart.js";
import { data } from "./data.js";

const navigationList = document.querySelector(".navigation__list");
const navigationBtns = document.querySelectorAll(".navigation__button");
const catalogGoods = document.querySelector(".catalog__list");
const catalogTitle = document.querySelector(".catalog__title");

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

export const addToCart = (e, productID) => {
  const target = e.target;
  const countAmount = e.currentTarget.querySelector(".count__amount");

  if (target.closest(".count__plus")) {
    countAmount.textContent = +countAmount.textContent + 1;
  }

  if (target.closest(".count__minus") && +countAmount.textContent > 1) {
    countAmount.textContent = +countAmount.textContent - 1;
  }

  if (target.closest(".modal-product__btn")) {
    renderOrderProduct(productID, +countAmount.textContent);
    closeModalCard();
  }
};

navigationList.addEventListener("click", changeActiveNavigationBtn);
catalogGoods.addEventListener("click", openModalCard);
