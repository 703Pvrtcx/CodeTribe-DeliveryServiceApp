import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase/app';
import { UserInfoService } from 'src/app/services/user-info.service';
import { AuthenticationService } from "./../../../services/authentication.service";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  user = {} as UserInfo;
  constructor(
    public authService: AuthenticationService,private asf: AngularFirestore,
    public router: Router, private addess: UserInfoService,
     public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {}
  signUp(email, password,  name){

    this.authService.RegisterUser(email.value, password.value)
    .then((res) => {
      let userID = this.asf.createId();
      this.user.userID = firebase.auth().currentUser.uid.toString();
      this.user.name = name.value;
      this.user.email = email.value

      console.log(this.user.name);
      this.addess.adduserAddress(this.user);
      this.presentLoading();
      this.router.navigate(['profile-tab']);
    }).catch((error) => {
      window.alert(error.message);
    })
}
async presentLoading() {
  const loader = this.loadingCtrl.create({
    message: "Signing in....",
    duration: 5000
  });
  (await loader).present();
  
}
}
