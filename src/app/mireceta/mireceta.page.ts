import { ProfilePage } from './../profile/profile.page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Receta } from '../receta';
import { Usuario } from '../usuario';
@Component({
  selector: 'app-mireceta',
  templateUrl: './mireceta.page.html',
  styleUrls: ['./mireceta.page.scss'],
})
export class MirecetaPage implements OnInit {
  misRecetas:Receta[] ;
  autor:Usuario;
  perfil:Usuario;

  constructor(private storage: Storage, private route:Router, private aRoute:ActivatedRoute,) {
    //NOTA: se puede omitir la asincronía con await pero me indica que no son funciones asincronas
    //Pero en otra pagina me hizo algo bastante raro si no lo ponia asi...... OwO...
    
    //Primero obtenemos nuestro perfil por si fuera necesario
    this.storage.get('userLogged')
    .then( (usuario:Usuario) => this.perfil = usuario)
    //La siguiente linea es por el llamado "INFIERNO DE LOS THEN", provocado por la asincronía de JS
    .then(()=>this.storage.get('usuarios').then((users:Usuario[])=>
      this.autor=users[Number(this.aRoute.snapshot.paramMap.get('id')).valueOf()]) || this.perfil)
    .then(()=>//Luego recibimos y filtramos las recetas
        this.storage.get('recetas').then( (todas:Receta[]) => { 
          //Recibimos solo las que creamos nosotros
          this.misRecetas = todas.filter( una => { return una._author ==  this.autor._id})
          console.log(this.misRecetas)
        }))
  
    /*
    //Asi seria si fuera sincrono
    //Primero obtenemos nuestro perfil por si fuera necesario
    this.storage.get('userLogged').then( (usuario:Usuario) => this.perfil = usuario)

    //Luego obtenemos el perfil de usuario del que son las recetas (si no enviamos nada somos nosotros)
    this.storage.get('autor').then( usuario => { this.autor =  usuario || this.perfil})

    //Luego recibimos y filtramos las recetas
    this.storage.get('recetas').then( (todas:Receta[]) => { 
      //Recibimos solo las que creamos nosotros
      this.misRecetas = todas.filter( una => { return una._author ==  this.autor._id})
      console.log(this.misRecetas)
    })*/

  }

  verReceta(receta:Receta){
    this.route.navigate(['ver-receta/'+receta._id.valueOf()]);
  }

  ngOnInit() {
  }

}
