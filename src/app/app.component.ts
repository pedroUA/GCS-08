import { Usuario } from './usuario';
import { Receta } from './receta';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  usuarios : Usuario[] = [];
  recetas : Receta[] = [];
  usuario_logueado : string;

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
      url: '/profile/:id',
      //icon: 'list'
    },
    {
      title: 'Search',
      url: '/search',
      //icon: 'list'
    },
    {
      title: 'Cerrar sesion',
      url: '/login',
      color: "red"
      //icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage
  ) {
    this.initializeApp();
  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    

    //alert("Iniciando datos en Storage...")
    //DE MOMENTO VOY A FORZAR QUE SE INCIIALICE SIEMPRE PARA TESTEO
    if(!this.storage.get('recetas') || true){
      this.storage.set('recetas',this.iniciarRecetas());
    }
    if(!this.storage.get('usuarios') || true){
      this.storage.set('usuarios',this.iniciarUsuarios());
    }
    if(!this.storage.get('pesos') || true) {
      this.storage.set('pesos', this.iniciarPesos());
    }
    if(!this.storage.get('calorico') || true) {
      this.storage.set('calorico', this.iniciarCalorico());
    }
    //alert("Datos en Storage!")

    this.storage.get('userLogged').then((userLogged) => {
      this.usuario_logueado = userLogged;
    });
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
        _imageURL:'http://lorempixel.com/50/50/people',
      }
      this.usuarios.push(user)
    }
    this.usuarios.push()

    return this.usuarios;
  }

  iniciarRecetas = ():Receta[] => { 
    var a = ["tornillos","macarrones","sandwich","ensalada","pizza","lasaña"]
    var b = ["de","con"]
    var c = ["tomate","atún","espinacas","mayonesa","frutos secos","salmón","jamón","queso"]

    this.recetas = [];
    //Iniciaremos 50 alimentos
    for(var i=0; i<50 ;i++){
      var protein = Math.abs(Math.floor(Math.random() * 10000)/1000);
      var carbohydrates = Math.abs(Math.floor(Math.random() * 10000)/1000);
      var fat = Math.abs(Math.floor(Math.random() * 10000)/1000);


      var receta : Receta = {
        _id : this.recetas.length,
        _name : this.wordRecetaGenerator(),
        _description:"Descripción  detallada del alimento...",
        _ingredientes: ["Por","Ejemplo","Los","Del","Titulo"],
        _author: Math.abs(Math.floor(Math.random() * this.usuarios.length-1)),
        _protein:protein,
        _carbohydrates:carbohydrates,
        _fat:fat,
        _kcals:protein*4 + carbohydrates*4 + fat*9,
        _likes:[],
        _imageURL:'http://lorempixel.com/50/50/food'
      }
      this.recetas.push(receta)
    }
    this.recetas.push()

    return this.recetas;
  }

  iniciarPesos = (): any[] => {
    return [65.2, 64.6, 67.3, 65.4, 63.2, 63.5, 61.4];
  }

  iniciarCalorico = (): any[] => {
    return [6843, 8492, 11532];
  }

}