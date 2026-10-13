import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})

export class AddRecipeComponent {
  model = {
    name: '',
    image: ''
  };

  ingredientsText = '';
  instructionsText = '';
  submitted = false;

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {}

  // GETTERS REQUIRED BY THE TEMPLATE
  get ingredientsEmpty(): boolean {
    return !this.ingredientsText.trim();
  }

  get instructionsEmpty(): boolean {
    return !this.instructionsText.trim();
  }

  submit(): void {
    this.submitted = true;

    if (
      !this.model.name.trim() ||
      this.ingredientsEmpty ||
      this.instructionsEmpty
    ) {
      return;
    }

    const newRecipe = {
      name: this.model.name.trim(),
      ingredients: this.ingredientsText
        .split('\n')
        .map(i => i.trim())
        .filter(Boolean),
      instructions: this.instructionsText
        .split('\n')
        .map(i => i.trim())
        .filter(Boolean),
      image: this.model.image?.trim() || ''
    };

    this.recipeService.addRecipe(newRecipe).subscribe(() => {
      // Navigate back to recipes page
      this.router.navigate(['/recipes']);
    });
  }

  clear(): void {
    this.model = { name: '', image: '' };
    this.ingredientsText = '';
    this.instructionsText = '';
    this.submitted = false;
  }
}