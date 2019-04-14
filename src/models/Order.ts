import { MenuItem } from "./MenuItem";
import { Table } from "./Table";
export interface Order {
  id?: string;
  customerID: string;
  grandTotal: string;
  items: {
    item: MenuItem;
    quantity: number;
  }[];
  mwst: number;
  orderDate: any;
  orderID: string;
  paymentMethod: string;
  restaurant: {
    coverPhoto: string;
    logo: string;
    name: string;
    restaurantID: string;
  };
  table: Table;
}
