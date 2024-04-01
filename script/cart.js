export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) { cart =
[{
  productId: '123131244113123',
  quantity: 1
},{
  productId: '12113314143223',
  quantity: 3
}];
};
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToCart(productId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    } 
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }

  saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    } 
  });
  cart = newCart;
  saveToStorage();
}