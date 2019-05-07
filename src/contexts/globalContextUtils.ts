/**
 * HELPER FUNCTIONS
 */

const calcGrandTotal = cart => {
  let grandTotal = 0;

  cart.forEach(element => {
    grandTotal += element.quantity * element.item.price;
  });
  return grandTotal;
};

const calcMwst = cart => {
  return ((calcGrandTotal(cart) * 0, 19) * 100) / 100;
};

const calcNumCartItems = cart => {
  let numCartItems = 0;

  cart.forEach(element => {
    numCartItems += element.quantity;
  });

  return numCartItems;
};

export default {
  calcGrandTotal: calcGrandTotal,
  calcMwst: calcMwst,
  calcNumCartItems: calcNumCartItems
};
