import { Component, ViewChild, ElementRef } from '@angular/core';
import { CartService } from '../../app/services/cart.service';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartviewPage } from './../../app/page/cartview/cartview.page';
import { Router } from '@angular/router';
import { ContactPage } from './../page/contact/contact.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  promoSliders: any[];
  promoImagesLoaded:boolean=false;

  cartList: CartItem [] = [];
  result: CartItem[] =[];
  categories: string[] = ['All','Pizza', 'Burger', 'Dessert', 'Snack', 'Drink'];
  icategory: string = 'All';

  cart = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart', {static: false, read: ElementRef}) fab: ElementRef;
  constructor(
    public toastController: ToastController,
     private router: Router,
     private modalCtrl: ModalController,
     private afs: AngularFirestore,
     private cartServe: CartService) {   
    }
  ngOnInit(){
    this.afs.collection<CartItem>("Product").valueChanges({idField: 'id'}).subscribe(storeItems =>{
      this.cartList = storeItems;
      this.result = this.cartList;
    })
    console.log(this.result);
  }
async addItem(cartItem: CartItem) {
    this.cartServe.addItemToCart(cartItem);
    this.animateCSS('tada');
    const toast = await this.toastController.create({
      message: cartItem.name + ' added to cart!',
      duration: 2000,
    });
    toast.present();
  }
  onCategoryCategory(event){
   this.icategory = event.detail.value;
    if(this.icategory !="All")
    {
      this.result = this.cartList.filter(p => p.category.includes(this.icategory));
    }
    else{
      this.result = this.cartList;  
    }
    console.log(this.icategory);
  }
  async openCart() {
    this.animateCSS('bounceOutLeft', true);
    let modal = await this.modalCtrl.create({
      component: CartviewPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }
  async openSignIn() {
    this.animateCSS('bounceOutLeft', true);
    let modal = await this.modalCtrl.create({
      component: ContactPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }

  onProductClick(product){
    this.router.navigate(['view-product']);
  }
  goLogin(){
    this.router.navigateByUrl('sidemenu/tabs/profile-tab');
  }
}
