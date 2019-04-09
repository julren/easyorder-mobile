interface Cart {
  cart: {
    item: MenuItem;
    quantity: number;
  }[];
  restaurant: Restaurant;
  table: {
    tableID: string;
    name: string;
  };
  paymentMethod: string;
  mwst: number;
  grandTotal: number;
  status: string;
  numCartItems: number;
}
