
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { Receta } from '../receta';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  perfil: Usuario;
  profile: Usuario;
  recetas: Receta[];
  usuarios: Usuario[];

  constructor(private storage:Storage, private route:Router, public navCtrl: NavController) {
    this.load();
  }


  cuantasRecetas() {
    return this.recetas.filter(elem => { return elem._author == this.perfil._id }).length
  }

  verRecetas(){
    this.storage.set('autor',this.perfil)
    this.route.navigate(['mireceta'])
    this.route.ngOnDestroy();
  }

  verSeguidores(){
    this.storage.set('verSeguidos',false)
    
    if(this.perfil._id != this.profile._id)
      this.storage.set('usuario',this.perfil);

    this.route.navigate(['following'])
  }
  verSeguidos(){
    this.storage.set('verSeguidos',true)
    
    if(this.perfil._id != this.profile._id)
      this.storage.set('usuario',this.perfil);

    this.route.navigate(['following'])
    this.route.ngOnDestroy();
  }

  cerrarSesion() {
    this.storage.remove('userLogged');
    this.route.navigate(['login']);
    this.route.ngOnDestroy();
  }

  
  seguir() {
    //Modificamos datos
    this.profile._following.push(this.perfil._id);
    this.perfil._followers.push(this.profile._id);
    this.usuarios[this.perfil._id.valueOf()]=this.perfil;

    //Guardamos datos
    this.storage.set('userLogged',this.profile);
    this.storage.set('usuarios',this.usuarios);
  }

  noSeguir(){
    //Modificamos datos
    this.profile._following.splice(this.profile._following.indexOf(this.perfil._id),1);
    this.perfil._followers.splice(this.perfil._followers.indexOf(this.profile._id),1);
    this.usuarios[this.perfil._id.valueOf()] = this.perfil;

    //Guardamos datos
    this.storage.set('userLogged',this.profile);
    this.storage.set('usuarios',this.usuarios);
  }

  ngOnInit() {

  }

  load(){
    //Obtenemos recetas
    this.storage.get('recetas').then(rec=>this.recetas=rec)
    this.storage.get('usuarios').then(users=>this.usuarios=users)

    //Si se introduce un usuario en el Storage es el que se verá
    this.storage.get('userLogged').then(usuario => this.profile = usuario)
    .then(()=> //Usuario logueado o perfil?
      this.storage.get('usuario').then((user:Usuario) => this.perfil = user || this.profile )
      //Eliminamos el usuario parametrizado si había
      .then(()=>this.storage.remove('usuario'))
    )
  }
}
