import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  saving = false;
  error?: string;
  recipeId!: number;
  original?: Recipe;

  viewMode = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) { this.error = 'Missing recipe id.'; return; }

    this.recipeId = Number(idParam);
    if (Number.isNaN(this.recipeId)) { this.error = 'Invalid recipe id.'; return; }

    this.buildForm();
    this.loadRecipe();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(120)]],
      image: [''],
      ingredientsText: [''],
      instructionsText: ['']
    });
  }

  private loadRecipe(): void {
    this.isLoading = true;
    this.error = undefined;

    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (recipe) => {
        this.original = recipe;
        this.form.patchValue({
          name: recipe.name,
          image: recipe.image ?? '',
          ingredientsText: (recipe.ingredients ?? []).join('\n'),
          instructionsText: (recipe.instructions ?? []).join('\n')
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = err?.message || 'Failed to load recipe.';
        this.isLoading = false;
      }
    });
  }

  toggleMode(): void {
    this.viewMode = !this.viewMode;
  }

  save(): void {
    if (!this.form.valid || !this.original) return;

    this.saving = true;
    this.error = undefined;

    const ingredients = (this.form.value.ingredientsText as string)
      .split('\n').map(s => s.trim()).filter(Boolean);

    const instructions = (this.form.value.instructionsText as string)
      .split('\n').map(s => s.trim()).filter(Boolean);

    const changes: Partial<Recipe> = {
      name: this.form.value.name,
      image: this.form.value.image,
      ingredients,
      instructions
    };

    this.recipeService.updateRecipe(this.recipeId, changes).subscribe({
      next: () => {
        this.saving = false;
        // After save, go back to view mode (and keep centered)
        this.viewMode = true;
      },
      error: (err) => {
        console.error(err);
        this.error = err?.message || 'Failed to save changes.';
        this.saving = false;
      }
    });
  }

  cancel(): void {
    // If editing, switch back to view; otherwise go back
    if (!this.viewMode) {
      this.viewMode = true;
    } else {
      this.router.navigate(['/recipes']);
    }
  }
}
