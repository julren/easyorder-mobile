import { MenuItem } from "./MenuItem";
import { Table } from "./Table";
import { PaymentMethod } from "./PaymentMethod";
export interface Order {
  id?: string;
  status?: string;
  customerID: string;
  grandTotal: string;
  items: {
    item: MenuItem;
    quantity: number;
  }[];
  orderDate: any;
  paymentMethod: PaymentMethod;
  restaurant: {
    coverPhoto: string;
    logo: string;
    name: string;
    restaurantID: string;
  };
  table: Table;
}
