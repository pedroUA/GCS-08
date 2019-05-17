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



  public unareceta:Array<Receta> ;

  constructor(private storage: Storage, private route: ActivatedRoute, private router:Router) {
    

    this.storage.get('recetas').then( (arrayRecetas) => { 
      console.log(arrayRecetas)
      this.unareceta = arrayRecetas; } );  
  }


  leerStorage () {
  
  
  }

  ngOnInit() {
  }

}
