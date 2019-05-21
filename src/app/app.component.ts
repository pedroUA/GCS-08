import { Usuario } from './usuario';
import { Receta } from './receta';
import { Calorias } from './calorias';
import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
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
      title: 'Inicio',
      url: '/home',
      //icon: 'home'
    },
    {
      title: 'Buscar',
      url: '/search',
      //icon: 'list'
    },
    {
      title: 'Mis recetas',
      url: '/mireceta',
      //icon: 'list'
    },
    {
      title: 'Crear receta',
      url: '/creareceta',
      //icon: 'list'
    },
    {
      title: 'Progreso - Insertar Datos',
      url: '/data-insert',
      //icon: 'list'
    },
    {
      title: 'Progreso - Histórico',
      url: '/graphics',
      //icon: 'list'
    },
    {
      title: 'Perfil',
      url: '/profile',
      //icon: 'list'
    },
    {
      title: 'Seguidores/Seguidos',
      url: '/following'
      //icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private route: Router,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  nav(page:string){    
    this.storage.get('userLogged').then( (user:Usuario) => this.route.navigate([page+user._id]));
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
    if (!this.storage.get('usuarios') || true){
      this.storage.set('usuarios', this.iniciarUsuarios());
    }
    if (!this.storage.get('recetas') || true){
      this.storage.set('recetas', this.iniciarRecetas());
    }
    if (!this.storage.get('pesos') || true) {
      this.storage.set('pesos', this.iniciarPesos());
    }
    if (!this.storage.get('calorico') || true) {
      this.storage.set('calorico', this.iniciarCalorico());
    }
  }

  wordRecetaGenerator(){
    var a = ["tornillos", "macarrones", "sandwich", "ensalada", "pizza", "lasaña"]
    var b = [" de ", " con "]
    var c = ["tomate", "atún", "espinacas", "mayonesa", "frutos secos", "salmón", "jamón", "queso"]

    var eleccionA = a[ Math.abs(Math.floor(Math.random() * a.length))];
    var eleccionB = b[ Math.abs(Math.floor(Math.random() * b.length))];
    var eleccionC = c[ Math.abs(Math.floor(Math.random() * c.length))];

    return eleccionA + eleccionB + eleccionC
  }

  wordUsuarioGenerator(){
    var nombre = ["Pedro", "Marta", "Juan", "Francisco", "Paco", "Pepe", "Manuel", "Samuel", "Maria", "Carla", "Sandra"]
    var apellido = [" Gómez", " Lozano", " López", " Sánchez", " Santiago", " Llorca", " Pacheco", " García", " Martínez", " Serrano", " Pérez", " Soriano"]

    var eleccionA = nombre[ Math.abs(Math.floor(Math.random() * nombre.length))];
    var eleccionB = apellido[ Math.abs(Math.floor(Math.random() * apellido.length))];
    var eleccionC = apellido[ Math.abs(Math.floor(Math.random() * apellido.length))];

    return eleccionA + eleccionB + eleccionC
  }

  iniciarUsuarios = (): Usuario[] => { 
    var a = ["Tornillos", "Macarrones", "Sandwich", "Ensalada", "Pizza", "Lasaña"]
    var b = ["de", "con"]
    var c = ["tomate", "atún", "espinacas", "mayonesa", "frutos secos", "salmón", "jamón", "queso"]

    this.usuarios = [];
    
    var admin: Usuario = {
      _id: 0,
      _name: 'Administrador',
      _username: 'admin',
      _password: 'admin',
      _email:'admin@admin.com',
      _address: 'Calle que te importa 123',
      _imageURL: 'https://thispersondoesnotexist.com/image',
      _followers: [],
      _following: []
    }

    this.usuarios.push(admin)

    //Iniciaremos 50 alimentos
    for (var i = 0; i < 50 ; i++){
          
      var name = this.wordUsuarioGenerator();
      var sex = i % 2 == 0 ? 'male' : 'female';
      var years = 12 + Math.abs(Math.floor(Math.random() * 77))
      
      var user : Usuario = {
        _id : this.usuarios.length,
        _name : name,
        _username: name.replace(' ', '').replace(' ', ''),
        _password: "contraseña",
        _sex: sex,
        _years: years,
        _address: 'Calle de los inventos Piso 95 Z',
        _email: name.replace(' ', '').replace(' ', '') + '@gmail.com',
        _followers: [],
        _following: [],
        //Guardar las imagenes en /images/usuarios/[USERNAME].ext (/images/usuarios/francisco.png)
        _imageURL:'http://lorempixel.com/200/200/people',
      }
      this.usuarios.push(user)
    }

    return this.usuarios;
  }

  iniciarRecetas = (): Receta[] => { 
    var a = ["tornillos", "macarrones", "sandwich", "ensalada", "pizza", "lasaña"]
    var b = ["de", "con"]
    var c = ["tomate", "atún", "espinacas", "mayonesa", "frutos secos", "salmón", "jamón", "queso"]

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

  iniciarPesos = (): number[] => {
    let data: number[] = [];
    const num = Math.abs(Math.floor(Math.random()*4+5))*1000;
    for (let i = 0; i < 212; i++) {
      data.push(Math.abs(Math.floor(Math.random()*600+num))/100);
    }
    return data;
  }

  iniciarCalorico = (): Calorias[] => {
    let data: Calorias[] = [];
    let calorias: Calorias;
    let h: number;
    let p: number;
    let g: number;
    for (let i = 0; i < 7; i++) {
      h = Math.abs(Math.floor(Math.random()*552+644));
      p = Math.abs(Math.floor(Math.random()*552+644));
      g = Math.abs(Math.floor(Math.random()*552+644));
      calorias = { hidratos: h, proteinas: p, grasas: g };
      data.push(calorias);
    }
    return data;
  }

}