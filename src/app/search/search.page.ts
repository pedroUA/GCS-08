import { Receta } from '../receta';
import { Usuario } from '../usuario';
import { Component, OnInit, NgModule } from '@angular/core';
import { parseHostBindings } from '@angular/compiler';
import { Storage } from '@ionic/storage';
import { FormControl } from '@angular/forms';
import { NavController, IonVirtualScroll } from '@ionic/angular';
import { async } from '@angular/core/testing';

import { debounceTime, debounce } from 'rxjs/operators';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
//import { Observable } from 'rxjs';

//import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchTerm: string = '';
  searchControl: FormControl;
  items: any[];
  searching: boolean = false;
  lastSearchTerm: String = '';

  myDebounceTime = Date.now();

  debouncer(timer):Boolean{
    let time = Date.now() - this.myDebounceTime;

    //LA BUSQUEDA HA CAMBIADO
    if(this.searchTerm != this.lastSearchTerm)
    {
      //Tiempo desde el ultimo cambio del dato a buscar
      this.myDebounceTime = Date.now();
    
      //Actualizamos el dato que habia anteriormente
      this.lastSearchTerm = this.searchTerm;

      //Activamos modo busqueda si el usuario esta escribiendo
      this.searching = true;

      return false;

    }else{ //LA BUSQUEDA NO HA CAMBIADO

      //ESTAMOS BUSCANDO
      if(this.searching){
        //SEGUIMOS BUSCANDO SI PASÓ POCO TIEMPO
        this.searching = time < timer;
        //SI PASO EL TIEMPO 'TIMER' ACTUALIZAMOS DATOS
        return time > timer;
      }else{
        //Tiempo desde el ultimo cambio del dato a buscar
        this.myDebounceTime = Date.now();
        //NO ESTAMOS BUSCANDO
        return false;
      }
    }
  }


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
    this.items = [];
  }

  changeClassActive(item) {
    if(!document.getElementById(item).classList.contains("active"))
    {
      document.getElementById('recetas-button').classList.toggle("active")
      document.getElementById('usuarios-button').classList.toggle("active")

      this.updateSearchbarText();
    }
 }

  constructor(private storage: Storage,public navCtrl: NavController) {
    //Rellenaremos los datos de forma asincrona
    
    this.inicializarRecetasAleatorios();
    this.inicializarUsuariosAleatorios();
  
    
    this.searchControl = new FormControl();
    this.ionViewDidLoad();
  }
  
  startSearching(){this.searching = true;}

  ionViewDidLoad() {
    this.setFilteredItems();

//    alert("OH 1")

    var timeout = setInterval(()=>{
      if(this.debouncer(700))
      {
        this.setFilteredItems();
      }
    },50)
//    this.searchControl.valueChanges().switchMap(value => alert(value))
    /*
    subscribe( search => {
      alert("OH 2")
      this.setFilteredItems(search);
      this.searching = false;
    });*/
    
  }
   
  alerta = (elem) => alert(JSON.stringify(elem));
  

   setFilteredItems(){
    var search = this.searchTerm.toLowerCase()
    this.items = [];

    if(search && search != '')
    {
      //alert("Buscando: " + search)
      if(document.getElementById('usuarios-button').classList.contains("active"))
      {
        this.items = this.usuarios.filter( (elem) => { return elem._username.toLowerCase().indexOf(search) >= 0 } );
      }else{
        this.items = this.recetas.filter( (elem) => { return elem._name.toLowerCase().indexOf(search) >= 0 } ); 
      //PARA FILTRAR TAMBIEN DESCRIPCIONES|| elem._description.toLowerCase().indexOf(search) >= 0*/ } );
      }
      //alert("ITEMS = " + JSON.stringify(this.items))
    }
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
    this.usuarios = [];
    var size = 50 + Math.abs(Math.floor(Math.random() * 150))
        for(var i=0; i<size ;i++){
          
          var name = this.wordGenerator();
          var sex = i % 2 == 0 ? 'male' : 'female';
          var years = 12 + Math.abs(Math.floor(Math.random() * 77))
          
          var user : Usuario = {
            _id : this.usuarios.length,
            _name : name,
            _username:this.wordGenerator(),
            _password:this.wordGenerator(),
            _sex: sex,
            _years:years,
            _address:this.wordGenerator(),
            _email:this.wordGenerator(),
            _followers:[],
            _following:[],
            //Guardar las imagenes en /images/usuarios/[USERNAME].ext (/images/usuarios/francisco.png)
            _imageURL:'http://lorempixel.com/500/500/people',
          }
          this.usuarios.push(user)
        }
        this.storage.set('usuarios',this.usuarios)
  }
  inicializarRecetasAleatorios(){
    this.recetas = [];
    var size = 50 + Math.abs(Math.floor(Math.random() * 150))
    for(var i=0; i<size ;i++){
      var protein = Math.abs(Math.floor(Math.random() * 10000)/1000);
      var carbohydrates = Math.abs(Math.floor(Math.random() * 10000)/1000);
      var fat = Math.abs(Math.floor(Math.random() * 10000)/1000);

      var receta : Receta = {
        _id : this.recetas.length,
        _name : this.wordGenerator(),
        _description:this.wordGenerator(),
        _ingredientes: ["uno","dos","tres"],
        _author: Math.abs(Math.floor(Math.random() * this.usuarios.length))-1,
        _protein:protein,
        _carbohydrates:carbohydrates,
        _fat:fat,
        _kcals:protein*4 + carbohydrates*4 + fat*9,
        _likes:[],
        _imageURL:'http://lorempixel.com/500/500/food'
      }
      this.recetas.push(receta)
    }
    this.recetas.push()
    this.storage.set('recetas',[])
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



}
