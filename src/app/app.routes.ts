import { Routes } from '@angular/router';
import { RecipeComponent } from './Pages/recipe/recipe.component';
import { AddRecipeComponent } from './Pages/add-recipe/add-recipe.component';
import { LoginComponent } from './Pages/login/login.component';
import { EditRecipeComponent } from './Pages/edit-recipe/edit-recipe.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './Pages/cart/cart.component';

export const routes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: 'recipes' },

    { path: "login", component: LoginComponent, pathMatch: "full" },
    { path: "recipes", component: RecipeComponent, pathMatch: "full" },
    { path: "add-recipe", component: AddRecipeComponent, pathMatch: "full" },
    { path: "recipes/:id/edit", component: EditRecipeComponent, pathMatch: "full" },
    { path: "register", component: RegisterComponent, pathMatch: "full" },
    { path: "cart", component: CartComponent, pathMatch: "full" },
    { path: '**', redirectTo: 'recipes' },
];
