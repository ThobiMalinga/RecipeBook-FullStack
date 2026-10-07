
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})

export class RecipeComponent implements OnInit {

  recipes: Recipe[] = [];
  quantities: Record<number, number> = {};
  isLoading = true;
  error?: string;

  constructor(private recipeService: RecipeService, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.loadRecipes();

  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.isLoading = false;
    });}

     onEdit(recipe: Recipe): void{
       this.router.navigate(['/recipes',recipe.id,'edit']);
     }

  getQuantity(recipe: Recipe): number {
    return this.quantities[recipe.id] ?? 1;
  }

  increaseQuantity(recipe: Recipe): void {
    this.quantities[recipe.id] = this.getQuantity(recipe) + 1;
  }

  decreaseQuantity(recipe: Recipe): void {
    const quantity = this.getQuantity(recipe);
    this.quantities[recipe.id] = Math.max(1, quantity - 1);
  }

  onAddToCart(recipe: Recipe): void {
    const quantity = this.getQuantity(recipe);

    this.cartService.getCart().pipe(
      switchMap(items => {
        const existingItem = items.find(item => item.recipeId === recipe.id);

        return existingItem
          ? this.cartService.updateQuantity(existingItem.id, existingItem.quantity + quantity)
          : this.cartService.addToCart(recipe, quantity);
      })
    ).subscribe(() => this.quantities[recipe.id] = 1);
  }
     
}
  


