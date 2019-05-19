import { Component, OnInit } from '@angular/core';
import { Receta } from '../receta';
import { Usuario } from '../usuario';
import { Storage } from '@ionic/storage';
import { FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchTerm: string = '';
  searchControl: FormControl;
  items: any[];
  allItems: any[];
  searching: boolean = false;

  className: string = 'active';
  phSearchBar: string = 'Buscar ';
  recetas: Receta[] = [];
  usuarios: Usuario[] = [];


  updateSearchbarText() {
    let recetasButtonActive = document.getElementById('recetas-button').classList.contains("active")
    let usuariosButtonActive = document.getElementById('usuarios-button').classList.contains("active")

    if(!recetasButtonActive && !usuariosButtonActive){
      this.phSearchBar = 'Elige que buscar...'
      
    }else{
      if(recetasButtonActive)
      {
        this.phSearchBar = 'Buscar recetas...';
      }else{
        this.phSearchBar = 'Buscar usuarios...';
      }
    }
    this.setFilteredItems();
  }

  changeClassActive(item) {
    if(!document.getElementById(item).classList.contains("active"))
    {
      document.getElementById('recetas-button').classList.toggle("active")
      document.getElementById('usuarios-button').classList.toggle("active")

      this.updateSearchbarText();
    }
 }

  constructor(private storage: Storage,public navCtrl: NavController, private router: Router) {
    //Rellenaremos los datos de forma asincrona
    
    this.inicializarRecetasAleatorios();
    this.inicializarUsuariosAleatorios();
    
    this.searchControl = new FormControl();
    this.ionViewDidLoad();
  }
  
  startSearching(){this.searching = true;}

  ionViewDidLoad() {
    this.setFilteredItems();
  }
   
  alerta = (elem) => alert(JSON.stringify(elem));
  

   setFilteredItems(){
    var search = this.searchTerm.toLowerCase()
    this.items = [];
    this.allItems = [];

    if(search && search != '')
    {
      //alert("Buscando: " + search)
      if(document.getElementById('usuarios-button').classList.contains("active"))
      {
        this.allItems = this.usuarios.filter( (elem) => { return elem._username.toLowerCase().indexOf(search) >= 0 } );
      }else{
        this.allItems = this.recetas.filter( (elem) => { return elem._name.toLowerCase().indexOf(search) >= 0 } ); 
      //PARA FILTRAR TAMBIEN DESCRIPCIONES|| elem._description.toLowerCase().indexOf(search) >= 0*/ } );
      }

      for(var i=0;i<20 && i<this.allItems.length;i++)
        this.items.push(this.allItems[i]);
      //alert("ITEMS = " + JSON.stringify(this.items))
    }

    this.searching = false;
  }

  wordGenerator(){
    var palabra:String = '';
    var length = 5 + Math.abs(Math.floor(Math.random() * 7))

    for(let i = 0; i <= length; i++){   
      let numero = Math.abs(Math.floor(Math.random() * 25)); 
      palabra += String.fromCharCode(97 + numero);
    }

    return palabra;
  }
  
  inicializarUsuariosAleatorios(){
    this.storage.get('usuarios').then((users:Usuario[])=>{
      this.usuarios = users;
    })
  }
  inicializarRecetasAleatorios(){
    this.storage.get('recetas').then((reces:Receta[])=>{
      this.recetas = reces;
    })
  }


  ngOnInit() {
    this.updateSearchbarText();
  }


  addItems(count){
    
    //Pausa ficticia de descarga de datos
    setTimeout(()=>{
      //Si habia 1 elemento [0] entobnces se añade el [1]
      var lastCount = this.items.length;
      
      for(var i=lastCount;i<lastCount+count && i<this.allItems.length; i++){
        this.items.push(this.allItems[i]);
      }
    }, 800);

  }

  ver(item){
    if(item._username){
      this.verUsuario(item);
    }else{
      this.verReceta(item);
    }
  }

  verUsuario(user){
    this.storage.set('verUsuario',user)
    alert("Ver usuario " + user._username)
    
    
    this.router.navigateByUrl('/profile/'+user._id);
  }

  verReceta(rec){
    //Si ya vamos a ver un usuario no vamos a receta, esto es util cuando clickamos en @usuario en una receta
    if(this.storage.get('verUsuario'))
      return;

    this.storage.set('verReceta',rec);
    alert("Ver receta " + rec._name)
  }

}
