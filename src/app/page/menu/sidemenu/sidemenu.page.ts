import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {


  pathsList  = [
    {
      name: 'Home',
      path: 'tabs/home',
      icon : 'home'
    },
    {
      name: 'Profile',
      path: 'tabs/profile-tab',
      icon : 'person'
    },
    {
      name: 'Address',
      path: 'tabs/contact',
      icon : 'call'
    },
    // {
    //   name: 'Directions',
    //   path: 'tabs/leaflet',
    //   icon : 'navigate'
    // },
    
    {
      name: 'Cartview',
      path: 'tabs/cartview',
      icon : 'cart'
    },
]
  constructor(private router: Router) { }
  ngOnInit() {
  }
  goLogin(){
    this.router.navigateByUrl('sidemenu/login');
  }
  goRegister(){
    this.router.navigateByUrl('sidemenu/register');
  }
  goProfileTab(){
    this.router.navigateByUrl('sidemenu/profile-tab');
  }
  goContact(){
    this.router.navigateByUrl('sidemenu/contact');
  }
  goMaps(){
    this.router.navigateByUrl('sidemenu/maps');
  }
  goLeaflet(){
    this.router.navigateByUrl('sidemenu/leaflet');
  }
  goDetail(){
    this.router.navigateByUrl('sidemenu/detail');
  }
  goCart(){
    this.router.navigateByUrl('sidemenu/cartview');
  }

  moveToPath(path){
      this.router.navigateByUrl('sidemenu/' + path.path);
  }

}
