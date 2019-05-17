import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuarios:Usuario[];

  username: string = "";
  password: string = "";
  password_repeat: string ="";
  email: string ="";

  constructor(private route: ActivatedRoute, private router: Router,
    public alertController: AlertController,
    private storage: Storage) {
      this.storage.get('usuarios').then( (users:Usuario[]) => {
        this.usuarios = users;
      })
     }

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
          if(this.usuarios[i]._username == this.username) {
            existe = true;
          }
        }

        if(existe == false) {
          var newUser:Usuario = {
            _id: this.usuarios.length,
            _name: this.username,
            _username: this.username,
            _password: this.password,
            _email: this.email
          }

          //Añadimos el usuario registrado
          this.usuarios.push(newUser);
          //Guardamos el nuevo array de usuarios
          this.storage.set('usuarios',this.usuarios);
          //Logueamos como el nuevo usuario
          this.storage.set('userLogged', newUser);
          this.router.navigate(['home']);
          
        }
        else {
          this.presentAlertUser();
        }
        
      }
    }
  }

}
