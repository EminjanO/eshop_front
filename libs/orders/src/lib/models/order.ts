import { User } from "@eshop-front/users";
import { OrderItem } from "./order-item";

export class Order{
  id?: string;
  public orderItems?: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user?: User;
  dateOrdered?: string;
}
