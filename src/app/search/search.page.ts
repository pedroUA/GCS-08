import { Component, OnInit } from '@angular/core';
import { parseHostBindings } from '@angular/compiler';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  className: string = 'active';
  phSearchBar: string = 'Buscar ';

  updateSearchbarText() {
    let recetasButtonActive = document.getElementById('recetas-button').classList.contains("active")
    let usuariosButtonActive = document.getElementById('usuarios-button').classList.contains("active")

    if(!recetasButtonActive && !usuariosButtonActive){
      this.phSearchBar = 'Elige que buscar...'
      
    }else{
      this.phSearchBar = 'Buscar'
      this.phSearchBar += recetasButtonActive ? ' recetas' : ''
      this.phSearchBar += recetasButtonActive && usuariosButtonActive ? ' y': '';
      this.phSearchBar += usuariosButtonActive ? ' usuarios...' : '...';
    }
  }

  changeClassActive (item) {
    document.getElementById(item).classList.toggle("active");
    this.updateSearchbarText();
 }

  constructor() { }

  ngOnInit() {
    this.updateSearchbarText();
  }



}
