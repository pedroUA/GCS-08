import { AppComponent } from './../app.component';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { Receta } from '../receta';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { destroyView } from '@angular/core/src/view/view';

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

  constructor(private storage:Storage, 
    private route:Router, 
    public navCtrl: NavController, 
    private menuCtrl: MenuController,
    private aRoute:ActivatedRoute,) {
    this.load();
    this.menuCtrl.close();
  }


  cuantasRecetas() {
    return this.recetas.filter(elem => { return elem._author == this.perfil._id }).length
  }

  verRecetas(){
    this.route.navigate(['mireceta/'+this.perfil._id])
  }

  verSeguidores(){
    this.storage.set('verSeguidos',false)

//    location.replace('following');
    this.route.navigate(['following/'+this.perfil._id])
  }
  verSeguidos(){
    this.storage.set('verSeguidos',true)
      
    this.route.navigate(['following/'+this.perfil._id])
//    location.replace('following');
    this.route.ngOnDestroy();
  }


  cerrarSesion() {
    this.storage.remove('userLogged');
    this.route.navigate(['login']);
    location.replace('');
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
//    var id = Number.isNaN(Number(this ? Number(this.aRoute.snapshot.paramMap.get('id')) : -1 ;
    //Obtenemos recetas
    this.storage.get('recetas').then(rec=>this.recetas=rec)
    this.storage.get('usuarios').then(users=>this.usuarios=users)

    //Si se introduce un usuario en el Storage es el que se verá
    this.storage.get('userLogged').then(usuario => this.profile = usuario)
    .then(()=> //Usuario logueado o perfil?
      this.storage.get('usuarios').then((users:Usuario) => this.perfil = users[this.aRoute.snapshot.paramMap.get('id')] || this.profile )
      //Eliminamos el usuario parametrizado si había
      .then(()=>this.storage.remove('usuario'))
    )
  }
}
