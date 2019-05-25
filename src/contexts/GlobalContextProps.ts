import { MenuItem } from "../models/MenuItem";
import { Restaurant } from "../models/Restaurant";
import { Table } from "../models";
import { PaymentMethod } from "../models/PaymentMethod";

/**
 * Interface of Props that will be made accessible through consuming GlobalContext
 */
export interface GlobalContextProps {
  user: any;
  cart: {
    item: MenuItem;
    quantity: number;
    comment: string;
  }[];
  selectedRestaurant: Restaurant;
  table: Table;
  paymentMethod: PaymentMethod;
  grandTotal: number;
  status: string;
  numCartItems: number;

  setUser: (user) => void;
  clearUser: () => void;

  setSelectedRestaurant: (selectedRestaurant: Restaurant) => void;
  setPaymentMethod: (paymentMethod: PaymentMethod) => void;
  setTable: (tableID: string) => void;

  addCartItem: (item: MenuItem, quantity: number, comment: string) => void;
  removeCartItem: (cartItem: { item: MenuItem; quantity: number }) => void;
  getNumOfItemInCart: (item: MenuItem) => number;
  updateCartItemQuantity: (item: MenuItem, quantity: number) => void;
  decreaseCartItemQuantity: (item: MenuItem) => void;
  increaseCartItemQuantity: (item: MenuItem) => void;

  resetSelectedRestaurant: () => void;
  resetTable: () => void;

  placeOrder: () => Promise<any>;
}
