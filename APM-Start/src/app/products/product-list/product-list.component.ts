import { Component, OnDestroy, OnInit, } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  // selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],

})
export class ProductListComponent implements OnInit, OnDestroy {

  pageTitle = "Product List";
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  sub!: Subscription;

  private _listFilter = '';

  get listFilter(): string {
    return this._listFilter
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performedFilter(value);
  }

  filteredProducts: IProduct[] = [];

  products: IProduct[] = [];

  constructor(private productService: ProductService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });

  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  performedFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLowerCase().includes(filterBy));
  }

  onRatingClick(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
