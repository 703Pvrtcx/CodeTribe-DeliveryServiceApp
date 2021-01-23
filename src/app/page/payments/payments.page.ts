
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//import { Stripe } from '@ionic-native/stripe/ngx';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  cardinfo: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  }
  stripe: any;
  constructor(//private stripe: Stripe,
              private alertCtrl: AlertController,
              public http: HttpClient,
              private router: Router) { }

  ngOnInit() {
  }
  pay() {
    
    const alert = this.alertCtrl.create({
      header: 'Order Success',
      message: 'We will deliver your order soon',
      buttons: ['OK']
    });
  }
  goToAddress(){
    this.pay();
   // this.router.navigateByUrl('sidemenu/tabs/profile-tab');
  }
  //   this.stripe.setPublishableKey('pk_test_xxxxxxxxxxx');
  //   this.stripe.createCardToken(this.cardinfo).then((token) => {

  //    console.log(token);
      
  //    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //    let paydata = { stripeToken: token, amount: 1, description: 'test payment' };
        

  //    let url = 'https://yourserver-middleware/charge'; 

  //     this.http.post(url, {headers: headers }).subscribe((res) => {
  //       if (res){
  //         const alert = this.alertCtrl.create({
  //           header: 'Order Success',
  //           message: 'We will deliver your order soon',
  //           buttons: ['OK']
  //         });
          
  //       }
      
  //     })
  //   })
  

}
