import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { UserAddressService } from 'src/app/services/user-address.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Feature, MapboxService } from 'src/app/services/mapbox.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {

  user = {} as UserInfo;
addlocation: boolean;


 addresses = []

  userlist=[];
  bookList= []; 

  public now: any = (new Date()).toISOString();
  constructor(private userInfo: UserInfoService,private asf: AngularFirestore,
    private mapDoa: MapboxService,public router: Router, private address: UserAddressService,
    ) { }


    ngOnInit() 
    {
      this.addlocation = false;
      this.getuser();
    }
    searchaddress(){
      this.router.navigateByUrl('sidemenu/tabs/contact');
    }
  getuser(){
    let userID = firebase.auth().currentUser.uid.toString();
    this.userInfo.getUserInfo(userID).subscribe(data => {

      this.userlist = data.map(e => {
        return{
          key: e.payload.doc.id,
          ... e.payload.doc.data() as UserInfo
        } as UserInfo
      })
    });
  }
add(){
  this.addlocation = true;
}

}
