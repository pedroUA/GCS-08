import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Receta } from '../receta';
import { Usuario } from '../usuario';
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
    this.storage.get('recetas').then((recs:Receta[])=> this.receta=recs[Number(this.aRoute.snapshot.paramMap.get('id')).valueOf()])
   }

  ngOnInit() {
  }

  verUsuario(user:Usuario){
    this.storage.set('usuario',user).then(()=>this.route.navigate(['profile']))
  }
}
