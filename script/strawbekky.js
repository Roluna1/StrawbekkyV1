import { cart, addToCart } from "../script/cart.js";
import { products } from "../script/product.js";

let productHTML = '';
products.forEach((product) => {
  productHTML += `
  <div class="container">
  <div class="content">
    <img class="food-pic" src="${product.image}">
    <div class="food-about">
      <p class="food-name">${product.name}</p>
      <p class="food-price">₱${product.price}</p>
      </div>
      <div class="button-place">
        <button class="buy-button-shop" data-product-id="${product.id}">Buy now</button>
      </div>
    </div>
  </div>
  `  
});
console.log(productHTML);

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector('.shopping-cart-count').innerHTML = cartQuantity;
}
document.querySelector('.grid-style').innerHTML = productHTML;
document.querySelectorAll('.buy-button-shop').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
  
});
updateCartQuantity();