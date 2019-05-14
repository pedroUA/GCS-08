import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuarios = ["pepe14", "manolete15","pedroUA"];
  passwords = ["123123", "123123","123123"];

  username: string = "";
  password: string = "";
  password_repeat: string ="";
  email: string ="";

  constructor(private route: ActivatedRoute, private router: Router,
    public alertController: AlertController,
    private storage: Storage) { }

  ngOnInit() {
  }

  async presentAlertPassword() {
    const alert = await this.alertController.create({
      header: 'Las constraseñas no coinciden',
      message: 'Introduce los datos correctamente',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertEmail() {
    const alert = await this.alertController.create({
      header: 'Error en el email',
      message: 'Introduce un email válido',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertUser() {
    const alert = await this.alertController.create({
      header: 'Error en los datos',
      message: 'El usuario introducido ya está registrado',
      buttons: ['OK']
    });

    await alert.present();
  }

  registro() {
    if(this.password != this.password_repeat) {
      this.presentAlertPassword();
    }
    else {
      if(!this.email.includes("@")) {
        this.presentAlertEmail();
      }
      else {
        var existe = false;

        for(var i= 0; i < this.usuarios.length; i++) {
          if(this.usuarios[i] == this.username && this.passwords[i] == this.password) {
            existe = true;
          }
        }

        if(existe == false) {
          this.storage.set('userLogged', this.username);
          this.router.navigate(['home']);
          
        }
        else {
          this.presentAlertUser();
        }
        
      }
    }
  }

}
