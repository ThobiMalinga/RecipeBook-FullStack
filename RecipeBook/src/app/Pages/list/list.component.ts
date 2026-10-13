import { Component } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './list.component.html',
  imports: [CommonModule, FormsModule],
})
export class RecipeListComponent {
  recipes: Recipe[]=[];

}