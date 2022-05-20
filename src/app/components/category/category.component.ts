import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = []
  currentCategory: Category = { categoryId: 0, categoryName: "" }
  done: boolean = false

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategory()
  }

  getCategory() {
    this.categoryService.getCategory().subscribe(response => {
      this.categories = response.data
    })
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category
    this.done = true
  }

  getCurrentCategoryClass(category: Category) {
    if (category == this.currentCategory) {
      return "list-group-item active"
    } else {
      return "list-group-item "
    }

  }

  getAllCategoryClass() {

    if ((this.currentCategory.categoryId == 0 || this.currentCategory.categoryName == "") && this.done) {
      return "list-group-item active"
    }
    else {
      return "list-group-item "
    }
  }

  setAllCategoryClass() {
    this.currentCategory = { categoryId: 0, categoryName: "" }
  }
}
