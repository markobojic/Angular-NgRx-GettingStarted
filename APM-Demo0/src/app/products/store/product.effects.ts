import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Product } from '../product';
import { ProductService } from './../product.service';
import * as productActions from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions,
              private productService: ProductService) {}

    @Effect()
    loadProducts$ = this.actions$.pipe(
      ofType(productActions.ProductActionTypes.Load),
      mergeMap((action: productActions.Load) => this.productService.getProducts().pipe(
        map((products: Product[]) => (new productActions.LoadSuccess(products))),
        catchError(err => of(new productActions.LoadFail(err)))
      ))
    );
}
