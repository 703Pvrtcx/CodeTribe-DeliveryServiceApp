import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {


  address;
  constructor(private asf: AngularFirestore) { }


  adduserAddress(book){ 
    this.asf.collection('UAddress').add(book).then(() => {
   //  alert('New address was added successfully'); 
     return   this.address = book.name;
    }).catch(err => { 
     // alert(err.message + ' address was unable to be added!');
    })
  }
  
  // adduserAddress(book){ 
  //   let newId = this.asf.createId();
  //   this.asf.collection('UAddress').doc(newId).set({ book }).then(() => {
  //     //Successful
  //     alert('New address was added successfully');
  //   }).catch(err => { 
  //     alert(err.message + ' address was unable to be added!');
  //   })
  // }
  deleteAddress(key){
    this.asf.collection('UAddress').doc(key).delete().then(() => {
      alert(key + ' Successfully Deleted Clothing!');     
    }).catch(err => {
      alert(err.message + ' '+ ' Unable to delete clothing');
    });
    
  }
  getBooks(){
    return this.asf.collection('Address').snapshotChanges();
  }

  getUserAddress(userID){
    return this.asf.collection('UserAddress', ref => ref.where('userID','==', userID)).snapshotChanges();
  }
}