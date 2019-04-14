import { MenuItem } from "./MenuItem";
import { Restaurant } from "./Restaurant";
import { Table } from "./Table";

export interface Cart {
  cart: {
    item: MenuItem;
    quantity: number;
  }[];
  restaurant: Restaurant;
  table: Table;
  paymentMethod: string;
  mwst: number;
  grandTotal: number;
  status: string;
  numCartItems: number;
}
