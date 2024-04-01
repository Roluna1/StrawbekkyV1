import { cart, removeFromCart } from "../script/cart.js";
import { products } from "../script/product.js";
let cartSummaryHTML = '';
let totalHTML = '';
var totalQuantity = 0; // Initialize total quantity variable
var totalPrice = 0; // Initialize total price variable
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId){
      matchingProduct = product
    };
  });
  if (!matchingProduct) {
    console.error(`Product with ID ${productId} not found`);
    return;
  }
  let priceNumber = Number(matchingProduct.price);
  totalQuantity += cartItem.quantity;
  totalPrice += priceNumber * cartItem.quantity;
  cartSummaryHTML +=
  `
  <div class="product-content js-cart-item-container-${matchingProduct.id}">
    <img class="product-img" src="${matchingProduct.image}">
    <div class="product-about">
      <p class="product-name">${matchingProduct.name}</p>
      <p class="product-price">₱${matchingProduct.price}</p>
      <div class="quantity-count">
        <p class="product-quantity">Quantity: ${cartItem.quantity}</p>
        <div class="product-edit">
        <button class="update-button-css" style="background-color: rgb(101, 191, 243);">Update</button>
        <button onclick="document.getElementById('myAudi').play()" style="background-color: rgb(247, 100, 100);" class="update-button-css js-delete-quantity" data-product-id=${matchingProduct.id}>Delete</button>
        </div>
      </div>
    </div>
  </div>
  <audio id="myAudi" src="mp3/minecraft_villager.mp3" controls></audio>
  `;
});
  totalHTML +=
  `
<div class="price-content">
  <p class="Price-text">Total (item: ${totalQuantity}) :<span> ₱</span><span class="js-total-price"><span>${totalPrice}</span></p>
    <div class="button-edit">
      <button class="place-order-button" onclick="document.getElementById('myAudio').play()">Place Order</button>
    </div>
</div>
<audio id="myAudio" src="mp3/villager_trade.mp3" controls></audio>
  `
document.querySelector('.container').innerHTML = cartSummaryHTML;
document.querySelector('.price-container').innerHTML = totalHTML;
document.querySelectorAll('.js-delete-quantity').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId
    removeFromCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    updateTotals();
  })
});
function updateTotals() {
  totalQuantity = 0;
  totalPrice = 0;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct = products.find(product => product.id === productId); 
    if (!matchingProduct) {
      console.error(`Product with ID ${productId} not found`);
      return;
    }
    let priceNumber = Number(matchingProduct.price);
    totalQuantity += cartItem.quantity; 
    totalPrice += priceNumber * cartItem.quantity;

    console.log("Product ID:", productId);
    console.log(`Price: ${totalPrice}`)
    console.log(`Total: ${totalQuantity}`)
  });
  document.querySelector('.Price-text').textContent = `Total (item: ${totalQuantity}) : ₱${totalPrice}`; // Update total price with 2 decimal places
  document.querySelector('.shopping-cart-count').textContent = `${totalQuantity}`
}
updateTotals();
