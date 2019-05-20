import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss'],
})
export class FollowingPage implements OnInit {
  searchTerm: string = '';
  items: Usuario[];
  allItems: Usuario[];
  searching: boolean = false;

  className: string = 'active';
  phSearchBar: string = 'Buscar ';
  usuarios: Usuario[] = [];
  seguidores: Usuario[] = [];
  seguidos: Usuario[] = [];
  perfil: Usuario;


  updateSearchbarText() {
    let recetasButtonActive = document.getElementById('seguidores-button').classList.contains("active")
    let usuariosButtonActive = document.getElementById('seguidos-button').classList.contains("active")

    if(!recetasButtonActive && !usuariosButtonActive){
      this.phSearchBar = 'Elige que buscar...'
      
    }else{
      if(recetasButtonActive)
      {
        this.phSearchBar = 'Buscar entre seguidores...';
      }else{
        this.phSearchBar = 'Buscar entre seguidos...';
      }
    }
    this.setFilteredItems();
  }

  changeClassActive(item) {
    if(!document.getElementById(item).classList.contains("active"))
    {
      document.getElementById('seguidores-button').classList.toggle("active")
      document.getElementById('seguidos-button').classList.toggle("active")

      this.updateSearchbarText();
    }
 }

  constructor(private storage: Storage, private router: Router,) {

    this.getStorage();
    
    this.ionViewDidLoad();
  }
  
  getStorage = async()=>{
    await this.storage.get('userLogged').then( user => this.perfil = user );
    await this.storage.get('usuarios').then( users => this.usuarios = users );
    this.seguidores = this.usuarios.filter( elem => this.perfil._followers.includes(elem._id));
    this.seguidos = this.usuarios.filter( elem => this.perfil._following.includes(elem._id));
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

    //alert("Buscando: " + search)
    if(document.getElementById('seguidores-button').classList.contains("active"))
    {
      
      if(search && search != ''){
        this.allItems = this.seguidores.filter( (elem) => { return elem._username.toLowerCase().indexOf(search) >= 0 } );
      }else{ this.allItems = this.seguidores; }
    }else{
      if(search && search != ''){
        this.allItems = this.seguidos.filter( (elem) => { return elem._name.toLowerCase().indexOf(search) >= 0 } ); 
      }else{ this.allItems = this.seguidos; }
      //PARA FILTRAR TAMBIEN DESCRIPCIONES|| elem._description.toLowerCase().indexOf(search) >= 0*/ } );
    }

    for(var i=0;i<20 && i<this.allItems.length;i++)
      this.items.push(this.allItems[i]);
    //alert("ITEMS = " + JSON.stringify(this.items))
  

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

  verUsuario(user:Usuario){
    //Tras guardar el usuario a ver en 'usuario' vamos a la pagina 'profile' para mostrarlo
    this.storage.set('usuario',user).then(()=>this.router.navigate(['profile']))
  }

}