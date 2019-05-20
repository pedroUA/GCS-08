import { Receta } from '../receta';
import { Usuario } from '../usuario';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

//import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
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

  constructor(private storage: Storage,
              //public navCtrl: NavController,
              private router: Router) {
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

    /*
    // Or to get a key/value pair
    this.storage.get('recetas').then((val) => {
      if(val == null){
        this.recetas;
        this.storage.set('recetas',[])
      }else{
        this.recetas = val;
      }
      console.log('Recetas = ', this.recetas);
    });

    // Or to get a key/value pair
    this.storage.get('usuarios').then((val) => {
      if(val == null){
        this.inicializarUsuariosAleatorios();
      }else{
        this.usuarios = val;
      }
      
      console.log('Usuarios = ', this.usuarios);
    });
    */
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

  verUsuario(user:Usuario){
    //Tras guardar el usuario a ver en 'usuario' vamos a la pagina 'profile' para mostrarlo
    this.storage.set('usuario',user).then(()=>this.router.navigate(['profile']))
  }

  verReceta(rec:Receta){
    //Tras guardar la receta a ver en 'receta' vamos a la pagina 'mireceta' para mostrarla
    if(!this.storage.get('usuario'))
      this.storage.set('receta',rec).then(()=>{alert('Hay que ir a "mireceta"...');this.router.navigate(['mireceta'])})
  }

}
