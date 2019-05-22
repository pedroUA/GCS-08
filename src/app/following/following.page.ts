import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

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
  profile: Usuario;


  updateSearchbarText() {
    let seguidoresButtonActive = document.getElementById('seguidores-button').classList.contains("active")
    let seguidosButtonActive = document.getElementById('seguidos-button').classList.contains("active")

    if (!seguidoresButtonActive && !seguidosButtonActive) {
      this.phSearchBar = 'Elige que buscar...';

    } else {
      if (seguidoresButtonActive) {
        this.phSearchBar = 'Buscar entre seguidores...';
      } else {
        this.phSearchBar = 'Buscar entre seguidos...';
      }
    }
    this.setFilteredItems();
  }
  verTipo(){
    return document.getElementById('seguidores-button').classList.contains("active") ? 'seguidores' : 'seguidos';
  }

  changeClassActive(item) {
    if (!document.getElementById(item).classList.contains("active")) {
      document.getElementById('seguidores-button').classList.toggle("active");
      document.getElementById('seguidos-button').classList.toggle("active");

      this.updateSearchbarText();
    }
  }

  constructor(private storage: Storage, 
    private router: Router,
    private aRouter: ActivatedRoute, 
    public navCtrl:NavController) {
  }



  ionViewDidEnter(){
    this.storage.get('verSeguidos')
    .then(ver => { if (ver){this.changeClassActive('seguidos-button')} }).then(()=>this.load())
  }
  ionViewWillUnload(){
    
  }
  ionViewDidLoad(){
  }

  load(){
    this.profile = this.perfil = null;
    this.seguidores = this.seguidos = this.allItems = this.items = [];
    this.storage.get('userLogged')
    .then( (user:Usuario) => this.profile = user)
    .then(() => this.storage.get('usuarios')
      .then(users => { this.usuarios = users; this.perfil=users[this.aRouter.snapshot.paramMap.get('id')]})
      .then(() => {
        this.perfil = this.perfil || this.profile;
        this.seguidores = this.usuarios.filter(elem => this.perfil._followers.includes(elem._id));
        this.seguidos = this.usuarios.filter(elem => this.perfil._following.includes(elem._id));
      }).then(()=>this.setFilteredItems()))
  }

  startSearching() { this.searching = true; }


  setFilteredItems() {
    var search = this.searchTerm.toLowerCase();
    this.items = [];
    this.allItems = [];

    if (document.getElementById('seguidores-button').classList.contains("active")) {
      if (search && search != '') {
        this.allItems = this.seguidores.filter((elem) => { return elem._username.toLowerCase().indexOf(search) >= 0 });
      } else { this.allItems = this.seguidores; }
    } else {
      if (search && search != '') {
        this.allItems = this.seguidos.filter((elem) => { return elem._name.toLowerCase().indexOf(search) >= 0 });
      } else { this.allItems = this.seguidos; }
      //PARA FILTRAR TAMBIEN DESCRIPCIONES|| elem._description.toLowerCase().indexOf(search) >= 0*/ } );
    }

    for (var i = 0; i < 20 && i < this.allItems.length; i++)
      this.items.push(this.allItems[i]);
    //alert("ITEMS = " + JSON.stringify(this.items))


    this.searching = false;
  }

  wordGenerator() {
    var palabra: String = '';
    var length = 5 + Math.abs(Math.floor(Math.random() * 7))

    for (let i = 0; i <= length; i++) {
      let numero = Math.abs(Math.floor(Math.random() * 25));
      palabra += String.fromCharCode(97 + numero);
    }

    return palabra;
  }


  ngOnInit() {
    this.updateSearchbarText();
  }



  addItems(count) {

    //Pausa ficticia de descarga de datos
    setTimeout(() => {
      //Si habia 1 elemento [0] entobnces se añade el [1]
      var lastCount = this.items.length;

      for (var i = lastCount; i < lastCount + count && i < this.allItems.length; i++) {
        this.items.push(this.allItems[i]);
      }
    }, 800);

  }


  verUsuario(user: Usuario) {
    //Tras guardar el usuario a ver en 'usuario' vamos a la pagina 'profile' para mostrarlo
    this.router.navigate(['profile/'+user._id]);
  }

  seguir(user: Usuario) {
    //Modificamos datos
    this.profile._following.push(user._id);
    user._followers.push(this.profile._id);
    this.usuarios[user._id.valueOf()] = user;
    this.usuarios[this.profile._id.valueOf()] = this.profile;
    this.seguidos.push(user);

    //Guardamos datos
    this.storage.set('userLogged', this.profile);
    this.storage.set('usuarios', this.usuarios);
  }

  noSeguir(user: Usuario) {
    //Modificamos datos
    this.profile._following.splice(this.profile._following.indexOf(user._id), 1);
    user._followers.splice(user._followers.indexOf(this.profile._id), 1);
    this.usuarios[user._id.valueOf()] = user;
    this.usuarios[this.profile._id.valueOf()] = this.profile;
-
    
    this.storage.set('userLogged', this.profile);
    this.storage.set('usuarios', this.usuarios);
  }

}