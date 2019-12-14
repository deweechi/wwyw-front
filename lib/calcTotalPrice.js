export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.item) return tally;
    if(cartItem.item.inventoryLevel<1) return tally;
    return tally + cartItem.quantity * cartItem.item.price;
  }, 0);
}
