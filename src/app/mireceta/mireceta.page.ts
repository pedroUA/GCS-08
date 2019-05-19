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

  constructor(private storage: Storage, private route:Router) {
    //NOTA: se puede omitir la asincronía con await pero me indica que no son funciones asincronas
    //Pero en otra pagina me hizo algo bastante raro si no lo ponia asi...... OwO...
    
    //Primero obtenemos nuestro perfil por si fuera necesario
    this.storage.get('userLogged')
    .then( (usuario:Usuario) => this.perfil = usuario)
    //La siguiente linea es por el llamado "INFIERNO DE LOS THEN", provocado por la asincronía de JS
    .then(()=>
      //Luego obtenemos el perfil de usuario del que son las recetas (si no enviamos nada somos nosotros)
      this.storage.get('autor')
      .then( usuario => { this.autor = usuario!=undefined ? usuario : this.perfil })
      //La siguiente linea es por el llamado "INFIERNO DE LOS THEN", provocado por la asincronía de JS
      .then(()=>
        //Luego recibimos y filtramos las recetas
        this.storage.get('recetas').then( (todas:Receta[]) => { 
          //Recibimos solo las que creamos nosotros
          this.misRecetas = todas.filter( una => { return una._author ==  this.autor._id})
          console.log(this.misRecetas)
          alert(JSON.stringify(this.autor))
          this.storage.remove('autor')
        })  
      )
    )
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
    alert("rece: " + JSON.stringify(receta))
    
    this.storage.set('receta',receta).then(() => {

      this.route.navigate(['ver-receta']).catch(err=>alert("AJ COÑO:"+err))

    }).catch(err=>alert(err))
  }

  ngOnInit() {
  }

}
