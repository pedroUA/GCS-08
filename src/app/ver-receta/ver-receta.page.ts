import { Usuario } from '../usuario';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Receta } from '../receta';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ver-receta',
  templateUrl: './ver-receta.page.html',
  styleUrls: ['./ver-receta.page.scss'],
})
export class VerRecetaPage implements OnInit {
  receta:Receta;
  usuarios:Usuario[];

  constructor(private storage:Storage, private route:Router, private aRoute:ActivatedRoute) {
    this.storage.get('recetas').then( (recs:Receta[]) => this.receta=recs[this.aRoute.snapshot.paramMap.get('id')] )
    this.storage.get('usuarios').then( (users:Usuario[]) => this.usuarios=users )
  }

  ngOnInit() {
  }

  verUsuario(){
    this.route.navigate(['profile/'+this.receta._author]);
  }
}
