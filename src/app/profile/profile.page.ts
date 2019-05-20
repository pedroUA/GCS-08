
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { Receta } from '../receta';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  perfil: Usuario;
  profile: Usuario;
  recetas: Receta[];

  constructor(private storage:Storage, private route:Router) {
    //Obtenemos recetas
    this.storage.get('recetas').then((rec:Receta[])=>{this.recetas=rec})

    //Si se introduce un usuario en el Storage es el que se verá
    this.storage.get('userLogged').then( (usuario:Usuario) => {
      this.profile = usuario;

    }).then(()=> //Usuario logueado o perfil?
      this.storage.get('usuario').then((user:Usuario) => this.perfil = user || this.profile )

    //Eliminamos el usuario parametrizado si había
    ).then(()=>this.storage.remove('usuario'));

  }

  cuantasRecetas() {
    return this.recetas.filter(elem => { return elem._author == this.perfil._id }).length
  }

  verRecetas(){
    this.storage.set('autor',this.perfil)
    this.route.navigate(['mireceta'])
  }

  verSeguidores(){
    this.storage.set('verSeguidos',false)
    this.route.navigate(['following'])
  }
  verSeguidos(){
    this.storage.set('verSeguidos',true)
    this.route.navigate(['following'])
  }

  cerrarSesion() {
    this.storage.remove('userLogged');
    this.route.navigate(['login']);
  }

  ngOnInit() {
  }

}
