import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Products';
  @Input() errorMessage: string;
  @Input() products: Product[];
  @Input() selectedProduct:  Product;
  @Input() displayCode: boolean;
  @Output() checked = new EventEmitter<boolean>();
  @Output() initiliazeNewProduct = new EventEmitter<void>();
  @Output() selected = new EventEmitter<Product>();

  productSelected(product) {
    this.selected.emit(product);
  }

  checkChanged(value: boolean) {
    this.checked.emit(value);
  }

  newProduct() {
    this.initiliazeNewProduct.emit();
  }
}
