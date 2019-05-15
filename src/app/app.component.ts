import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  usuario_logueado : string


  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Personal progress',
      url: '/personal-progress',
      //icon: 'list'
    },
    {
      title: 'Graphics',
      url: '/graphics',
      //icon: 'list'
    },
    {
      title: 'Data insert',
      url: '/data-insert',
      //icon: 'list'
    },
    {
      title: 'Profile',
      url: '/profile',
      //icon: 'list'
    },
    {
      title: 'Search',
      url: '/search',
      //icon: 'list'
    },
    {
      title: 'Cerrar sesion',
      url: '/login',
      color: "red"
      //icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.storage.get('userLogged').then((userLogged) => {
      this.usuario_logueado = userLogged;
    });
  }
}
