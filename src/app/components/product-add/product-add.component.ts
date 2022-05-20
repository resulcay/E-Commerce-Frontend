import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm: FormGroup = new FormGroup({
    productName: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    unitPrice: new FormControl('', Validators.required),
    unitsInStock: new FormControl('', Validators.required),

  });
  constructor(private formBuilder: FormBuilder, private productService: ProductService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createProductAddForm()
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName: ["", Validators.required],
      categoryId: ["", Validators.required],
      unitsInStock: ["", Validators.required],
      unitPrice: ["", Validators.required],

    })
  }

  add() {

    if (this.productAddForm.valid) {
      let productModel = Object.assign({}, this.productAddForm.value)

      this.productService.add(productModel).subscribe(
        response => {
          this.toastrService.success(response.message)
        }, responseError => {
          if (responseError.error.Errors > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Failure")
            }
          }
        })
    }
    else {
      this.toastrService.error("Incorrect Form")
    }

  }

}
