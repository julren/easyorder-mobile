type Cart = {
  cart: {
    item: MenuItem;
    quantity: number;
  }[];
  restaurant: Restaurant;
  table: string;
  paymentMethod: string;
  mwst: number;
  grandTotel: number;
};
