import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Receta } from '../receta';

@Component({
  selector: 'app-ver-receta',
  templateUrl: './ver-receta.page.html',
  styleUrls: ['./ver-receta.page.scss'],
})
export class VerRecetaPage implements OnInit {
  receta:Receta;

  constructor(private storage:Storage) {
    this.storage.get('receta').then( (rece:Receta) => this.receta = rece ).then(()=>this.storage.remove('receta'));
   }

  ngOnInit() {
  }

}
