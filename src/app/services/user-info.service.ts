import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  
  constructor(private asf: AngularFirestore) { }

  adduserAddress(book){
    this.asf.collection('UserInfo').add(book).then(() => {
      //Successful
      alert('Account added successfully');
    }).catch(err => { 
      alert(err.message + ' account was unable to be added!');
    })
  }
  getUserInfo(userID){
    return this.asf.collection('UserInfo', ref => ref.where('userID','==', userID)).snapshotChanges();
  }
}