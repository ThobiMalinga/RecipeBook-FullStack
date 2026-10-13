import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Recipe } from '../models/recipe.model';

interface ApiRecipe {
  recipeId: number;
  recipeName: string;
  recipeImage: string;
  ingredients: string;
  instructions: string;
}

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5241/api/Recipe';

  private toModel = (r: ApiRecipe): Recipe => ({
    id: r.recipeId,
    name: r.recipeName,
    image: r.recipeImage || '',
    ingredients: (r.ingredients || '').split('\n').filter(Boolean),
    instructions: (r.instructions || '').split('\n').filter(Boolean)
  });

  private toDto = (r: Partial<Recipe>) => ({
    recipeName: r.name,
    recipeImage: r.image || '',
    ingredients: (r.ingredients || []).join('\n'),
    instructions: (r.instructions || []).join('\n')
  });

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<ApiRecipe[]>(this.baseUrl).pipe(map(l => l.map(this.toModel)));
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<ApiRecipe>(`${this.baseUrl}/${id}`).pipe(map(this.toModel));
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    return this.http.post<ApiRecipe>(this.baseUrl, this.toDto(recipe)).pipe(map(this.toModel));
  }

  updateRecipe(id: number, changes: Partial<Recipe>): Observable<Recipe> {
    return this.http.put<ApiRecipe>(`${this.baseUrl}/${id}`, { recipeId: id, ...this.toDto(changes) })
      .pipe(map(this.toModel));
  }

  deleteRecipe(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}
