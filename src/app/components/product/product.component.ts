import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItems } from 'src/app/models/cartItems';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // product1: any = { productId: 1, productName: "Mobile  ", categoryId: 1, unitPrice: 10 }
  // product2: any = { productId: 2, productName: "Laptop  ", categoryId: 2, unitPrice: 20 }
  // product3: any = { productId: 3, productName: "Keyboard", categoryId: 3, unitPrice: 30 }
  // product4: any = { productId: 4, productName: "Desk    ", categoryId: 4, unitPrice: 40 }
  // product5: any = { productId: 5, productName: "Monitor ", categoryId: 5, unitPrice: 50 }

  products: Product[] = []

  dataLoaded = false
  filterText = ""

  // productResponseModel: ProductResponseModel = {
  //   data: this.products,
  //   message: "",
  //   success: true
  // }

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"])
      } else {
        this.getProducts()
      }
    })
  }

  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response.data
      this.dataLoaded = true
    })
  }

  getProductsByCategory(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe(response => {
      this.products = response.data
      this.dataLoaded = true
    })
  }

  addToCart(product: Product) {

    if (product.productId === 1) {
      this.toastrService.error("Error Can not add number 1 item")

    } else {
      this.cartService.addToCart(product)
      this.toastrService.success(product.productName + " Successfully Added to Cart")
    }


  }

}

