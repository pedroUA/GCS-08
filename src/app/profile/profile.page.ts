
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
  autor: Usuario;
  profile: Usuario;
  recetas: Receta[];

  constructor(private storage:Storage, private route:Router) {
    //Obtenemos recetas
    this.storage.get('recetas').then((rec:Receta[])=>{this.recetas=rec})

    //Si se introduce un usuario en el Storage es el que se verá
    this.storage.get('userLogged').then( (usuario:Usuario) => {
      this.profile = usuario;

    }).then(()=> //Usuario logueado o perfil?
      this.storage.get('usuario').then((user:Usuario) => this.autor = user || this.profile )

    //Eliminamos el usuario parametrizado si había
    ).then(()=>this.storage.remove('usuario'));

  }

  cuantasRecetas() {
    return this.recetas.filter(elem => { return elem._author == this.autor._id }).length
  }

  verRecetas(){
    this.storage.set('autor',this.autor)
    this.route.navigate(['mireceta'])
  }

  cerrarSesion() {
    this.storage.remove('userLogged');
    this.route.navigate(['login']);
  }

  ngOnInit() {
  }

}
