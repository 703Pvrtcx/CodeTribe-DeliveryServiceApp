import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CartviewPage } from 'src/app/page/cartview/cartview.page';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  
  cartItemCount: BehaviorSubject<number>;
  constructor( private cartService: CartService) { }

  ngOnInit() {
    this.cartItemCount = this.cartService.getCartItemCount();
  }


}
