import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FormsModule, FormBuilder,FormControl, ReactiveFormsModule, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, ToastController,LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  login = {} as Login;

  constructor(private authDao: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    public loadingCtrl: LoadingController,) { }
    
    async ngOnInit() {

      this.form = this.fb.group({
        username: ['', Validators.email],
        password: ['', Validators.required]
      });
  
    }
      logIn(email, password) {
  
     this.authDao.SignIn(email.value, password.value)
      .then((res) => {
          this.presentLoading();
        this.router.navigate(['profile-tab']); 
      }).catch((error) => {
        window.alert(error.message);
      })
  }
  async onSubmit() {   
      this.loginInvalid = false;
      this.formSubmitAttempt = false;
      if (this.form.valid) {
        try {
          const username = this.form.get('username').value;
          const password = this.form.get('password').value;
          this.presentLoading();
          await this.authDao.SignIn(username, password);
        } catch (err) {
         
          this.loginInvalid = true;
        }
      } else {
        this.formSubmitAttempt = true;
      }
    }
  googlesignin()
  {
    this.authDao.GoogleAuth();
  }
  async presentLoading() {
    const loader = this.loadingCtrl.create({
      message: "Signing in....",
      duration: 5000
    });
    (await loader).present();
    
  }
  }
 


