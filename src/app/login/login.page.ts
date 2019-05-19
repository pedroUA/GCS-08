import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Usuario } from '../usuario';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuarios:Usuario[] = [];

  username: string = "";
  password: string = "";

  constructor(private route: ActivatedRoute, private router: Router,
    public alertController: AlertController,
    private storage: Storage) { 
      this.storage.get('usuarios').then( (users:Usuario[]) => {
        this.usuarios = users;
      })
      
    }

  ngOnInit() {
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error en los datos',
      message: 'Introduce usuario y contraseña válidos.',
      buttons: ['OK']
    });

    await alert.present();
  }
  
  login() {
    console.log(this.username)
    console.log(this.password)

    var userLogued:Usuario = null;

    for(var i= 0; i < this.usuarios.length; i++) {
      if(this.usuarios[i]._username == this.username && this.usuarios[i]._password == this.password) {
        userLogued = this.usuarios[i];
      }
    }

    if(userLogued) {
      this.storage.set('userLogged', userLogued);
      this.router.navigate(['home']);
    }
    else {
      this.presentAlert();
    }
  }

  registro() {
    this.router.navigate(['registro']);
  }

}
