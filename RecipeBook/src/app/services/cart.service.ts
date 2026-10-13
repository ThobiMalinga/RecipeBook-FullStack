import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Recipe } from '../models/recipe.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5241/api/Cart';


  private itemCountSubject = new BehaviorSubject<number>(0);
  readonly itemCount$ = this.itemCountSubject.asObservable();

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.baseUrl);
  }
  
  private updateItemCount() {
    this.getCart().subscribe(cart => {
      this.itemCountSubject.next(cart.length);
    });
  }

  addToCart(recipe: Recipe, quantity = 1): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseUrl, {
      itemName: recipe.name,
      quantity,
      recipeId: recipe.id,
      recipeName: recipe.name,
      recipeImage: recipe.image,
      ingredients: recipe.ingredients.join('\n')
    }).pipe(
      tap(() => this.updateItemCount())
    );
  }

  updateQuantity(id: number, quantity: number): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.baseUrl}/${id}`, { quantity }).pipe(
      tap(() => this.updateItemCount())
    );
  }

  removeItem(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.updateItemCount())
    );
  }
}