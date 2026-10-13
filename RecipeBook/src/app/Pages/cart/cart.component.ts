import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  isLoading = true;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.items = items;
      this.isLoading = false;
    });
  }

  increase(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity + 1).subscribe(() => item.quantity++);
  }

  decrease(item: CartItem): void {
    if (item.quantity <= 1) return this.remove(item);
    this.cartService.updateQuantity(item.id, item.quantity - 1).subscribe(() => item.quantity--);
  }

  remove(item: CartItem): void {
    this.cartService.removeItem(item.id).subscribe(() => {
      this.items = this.items.filter(i => i.id !== item.id);
    });
  }
}