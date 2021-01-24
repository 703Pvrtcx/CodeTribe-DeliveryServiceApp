import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase/app';
import { UserInfoService } from 'src/app/services/user-info.service';
import { AuthenticationService } from "./../../../services/authentication.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  user = {} as UserInfo;
  signUpForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;

  validation_messages = {
    'username': [
      { type: 'required', message: 'Name is required.' },
     // { type: 'pattern', message: 'Name must not contain speacial characters or number' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };
  
  constructor(
    public authService: AuthenticationService,private asf: AngularFirestore,
    public router: Router, private addess: UserInfoService,
     public loadingCtrl: LoadingController,
  ) { 
    this.signUpForm = new FormGroup({
      'username': new FormControl('', Validators.compose([
        Validators.required,
        //Validators.pattern('^[a-zA-Z]')
      ])),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
  }

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

signUpWithEmail() {
  this.authService.RegisterUser(this.signUpForm.value['email'], this.signUpForm.value['password'])
  .then(user => {
    let userID = this.asf.createId();
    this.user.userID = firebase.auth().currentUser.uid.toString();
    this.user.name = this.signUpForm.value['username'],
    this.user.email = this.signUpForm.value['email']

    console.log(this.user.name);
    this.addess.adduserAddress(this.user);
    this.presentLoading();
    this.router.navigate(['profile-tab']);
  })
  .catch(error => {
    this.submitError = error.message;
  });
}

facebookSignUp() {
}

googleSignUp() {
}

twitterSignUp() {
}


}
