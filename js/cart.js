const orderCount = document.querySelector(".order__count");
const orderList = document.querySelector(".order__list");
const orderBody = document.querySelector(".order__wrap-list");

const updatePriceCart = () => {};

const updateCountProducts = (count) => {
  orderCount.textContent = +orderCount.textContent + count;
};

export const renderOrderProduct = (product, count) => {
  const orderItem = `<li class="order__item">
  <img src="img/${product.img}.jpg" alt="${product.title}" class="order__image">

  <div class="order__product">
    <h3 class="order__product-title">${product.title}</h3>

    <p class="order__product-weight">${product.weight}г</p>

    <p class="order__product-price">${product.price}₽</p>
  </div>

  <div class="order__product-count count">
    <button class="count__minus">-</button>

    <p class="count__amount">${count}</p>

    <button class="count__plus">+</button>
  </div>
</li>`;
  orderList.insertAdjacentHTML("beforeend", orderItem);
  updateCountProducts(count);
};
