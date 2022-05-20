import { Product } from "./product"

export class CartItem {
    product: Product = { productId: 0, categoryId: 0, productName: "", unitPrice: 0, unitsInStock: 0 }
    quantity: number = 0
}