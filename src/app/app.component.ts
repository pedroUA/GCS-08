import { Usuario } from './usuario';
import { Receta } from './receta';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  usuarios : Usuario[] = [];
  recetas : Receta[] = [];
  usuario : Usuario;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Crear Receta',
      url: '/creareceta',
      //icon: 'list'
    },
    {
      title: 'Mi Receta',
      url: '/mireceta',
      //icon: 'list'
    },
    {
      title: 'Personal progress',
      url: '/personal-progress',
      //icon: 'list'
    },
    {
      title: 'Graphics',
      url: '/graphics',
      //icon: 'list'
    },
    {
      title: 'Data insert',
      url: '/data-insert',
      //icon: 'list'
    },
    {
      title: 'Profile',
      url: '/profile',
      //icon: 'list'
    },
    {
      title: 'Search',
      url: '/search',
      //icon: 'list'
    },/*
    {
      title: 'Cerrar sesion',
      url: '/login',
      color: "red"
      //icon: 'list'
    }*/
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private route: Router
  ) {
    this.initializeApp();
  }

  nav(page:string){    
    this.route.navigate([page]);
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    
    
    this.storage.get('userLogged').then((user:Usuario)=>{
      this.usuario = user
    });

    //alert("Iniciando datos en Storage...")
    //DE MOMENTO VOY A FORZAR QUE SE INCIIALICE SIEMPRE PARA TESTEO
    
    if(!this.storage.get('usuarios') || true){
      this.storage.set('usuarios',this.iniciarUsuarios());
    }

    if(!this.storage.get('recetas') || true){
      this.storage.set('recetas',this.iniciarRecetas());
    }
  }
  wordRecetaGenerator(){
    var a = ["tornillos","macarrones","sandwich","ensalada","pizza","lasaña"]
    var b = [" de "," con "]
    var c = ["tomate","atún","espinacas","mayonesa","frutos secos","salmón","jamón","queso"]
    
    var eleccionA = a[ Math.abs(Math.floor(Math.random() * a.length))];
    var eleccionB = b[ Math.abs(Math.floor(Math.random() * b.length))];
    var eleccionC = c[ Math.abs(Math.floor(Math.random() * c.length))];

    return eleccionA + eleccionB + eleccionC
  }

  wordUsuarioGenerator(){
    var nombre = ["Pedro","Marta","Juan","Francisco","Paco","Pepe","Manuel","Samuel","Maria","Carla","Sandra"]
    var apellido = [" Gómez"," Lozano"," López"," Sánchez"," Santiago"," Llorca", " Pacheco", " García"," Martínez"," Serrano"," Pérez"," Soriano"]

    
    var eleccionA = nombre[ Math.abs(Math.floor(Math.random() * nombre.length))];
    var eleccionB = apellido[ Math.abs(Math.floor(Math.random() * apellido.length))];
    var eleccionC = apellido[ Math.abs(Math.floor(Math.random() * apellido.length))];

    return eleccionA + eleccionB + eleccionC
  }

  iniciarUsuarios = ():Usuario[] => { 
    var a = ["Tornillos","Macarrones","Sandwich","Ensalada","Pizza","Lasaña"]
    var b = ["de","con"]
    var c = ["tomate","atún","espinacas","mayonesa","frutos secos","salmón","jamón","queso"]

    this.usuarios = [];
    
    var admin:Usuario = {
      _id: 0,
      _name: 'Administrador',
      _username: 'admin',
      _password: 'admin',
      _email:'admin@admin.com',
      _address: 'Calle que te importa 123',
      _imageURL: 'https://thispersondoesnotexist.com/image',
    }

    this.usuarios.push(admin)

    //Iniciaremos 50 alimentos
    for(var i=0; i<50 ;i++){
          
      var name = this.wordUsuarioGenerator();
      var sex = i % 2 == 0 ? 'male' : 'female';
      var years = 12 + Math.abs(Math.floor(Math.random() * 77))
      
      var user : Usuario = {
        _id : this.usuarios.length,
        _name : name,
        _username:name.replace(' ', '').replace(' ',''),
        _password:"contraseña",
        _sex: sex,
        _years:years,
        _address:'Calle de los inventos Piso 95 Z',
        _email:name.replace(' ','').replace(' ','')+'@gmail.com',
        _followers:[],
        _following:[],
        //Guardar las imagenes en /images/usuarios/[USERNAME].ext (/images/usuarios/francisco.png)
        _imageURL:'http://lorempixel.com/200/200/people',
      }
      this.usuarios.push(user)
    }

    return this.usuarios;
  }

  iniciarRecetas = ():Receta[] => { 
    var a = ["tornillos","macarrones","sandwich","ensalada","pizza","lasaña"]
    var b = ["de","con"]
    var c = ["tomate","atún","espinacas","mayonesa","frutos secos","salmón","jamón","queso"]

    this.recetas = [];
    //Iniciaremos 50 alimentos
    for(var i=0; i<50 ;i++){
      var protein = Math.abs(Math.floor(Math.random() * 10000)/1000).toFixed(3);
      var carbohydrates = Math.abs(Math.floor(Math.random() * 10000)/1000).toFixed(3);
      var fat = Math.abs(Math.floor(Math.random() * 10000)/1000).toFixed(3);


      var receta : Receta = {
        _id : this.recetas.length,
        _name : this.wordRecetaGenerator(),
        _description:"Descripción  detallada del alimento...",
        _ingredientes: ["Por","Ejemplo","Los","Del","Titulo"],
        _author: Math.abs(Math.floor(Math.random() * this.usuarios.length-1)),
        _protein:Number(protein),
        _carbohydrates:Number(carbohydrates),
        _fat:Number(fat),
        _kcals:Number(protein)*4 + Number(carbohydrates)*4 + Number(fat)*9,
        _likes:[],
        _imageURL:'http://lorempixel.com/200/200/food'
      }
      this.recetas.push(receta)
    }

    return this.recetas;
  }
}