import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartIconComponent } from '../../shared/cart-icon/cart-icon.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CartIconComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit(): void {

  }
  registerRouter() {
    this.router.navigate(['/register']);
  }

  addRecipeRouter() {
    this.router.navigate(['/add-recipe']);
  }

  editRecipeRouter() {
    this.router.navigate(['/edit-recipe']);
  }

  logoutRouter() {
    console.log("Logging out...");
  }

  loginRouter() {
    this.router.navigate(['/login'])
  }

  cartRouter() {
    this.router.navigate(['/cart']);
  }

  homeRouter() {
    this.router.navigate(['/']);
  }
}
