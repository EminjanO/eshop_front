// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Product } from "@eshop-front/products";

export class OrderItem{
  product? : Product;
  quantity?: number;
}
