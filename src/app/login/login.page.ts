import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  usuarios = ["pepe14", "manolete15","pedroUA"];
  passwords = ["123123", "123123","123123"];

  username: string = "";
  password: string = "";

  constructor(private route: ActivatedRoute, private router: Router,
    public alertController: AlertController,
    private storage: Storage) { }

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
    var existe = false;

    for(var i= 0; i < this.usuarios.length; i++) {
      if(this.usuarios[i] == this.username && this.passwords[i] == this.password) {
        existe = true;
      }
    }

    if(existe) {
      this.router.navigate(['home']);
      this.storage.set('userLogged', this.username);
    }
    else {
      this.presentAlert();
    }


  }

}
