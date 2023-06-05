import { Component, OnInit } from '@angular/core';

@Component({
  // selector: 'pm-product-detail', removing this since we don't need to nest this component
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle = 'Product Detail';

  constructor() { }

  ngOnInit(): void {
  }

}