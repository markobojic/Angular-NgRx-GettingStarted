import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '../../product';
import { ProductService } from '../../product.service';
import * as fromProduct from '../../store';
import * as productActions from '../../store/product.actions';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<fromProduct.State>,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  clearCurrentProduct() {
      this.store.dispatch(new productActions.ClearCurrentProduct());
  }

  updateProduct(product: Product) {
    this.store.dispatch(new productActions.UpdateProduct(product));
      
  }

  deleteProduct(product: Product) {
    this.store.dispatch(new productActions.DeleteProduct(product.id));
  }
  
  createProduct(product: Product) {
    this.store.dispatch(new productActions.CreateProduct(product));
  }
}
