import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Calorias } from '../calorias';

@Component({
  selector: 'app-data-insert',
  templateUrl: './data-insert.page.html',
  styleUrls: ['./data-insert.page.scss'],
})

export class DataInsertPage implements OnInit {

  typeForm: string;
  formpeso: FormGroup;
  formcalorico: FormGroup;
  pesos:number[];
  calorico:Calorias[];

  constructor(private storage: Storage, public navCtrl: NavController, private router: Router, public fb: FormBuilder) {
      this.storage.get('pesos').then( (result:number[]) => this.pesos = result );
      this.storage.get('calorico').then( (result:Calorias[]) => this.calorico = result );
  }

  ngOnInit() {
    this.typeForm = 'peso';
    this.formpeso = this.fb.group({
      peso: ['', [Validators.required, Validators.min(0), Validators.max(400)]],
      altura: ['', [Validators.required, Validators.min(0), Validators.max(2.5)]]
    });
    this.formcalorico = this.fb.group({
      grasas: ['', [Validators.required, Validators.min(0), Validators.max(10000)]],
      hidratos: ['', [Validators.required, Validators.min(0), Validators.max(10000)]],
      proteinas: ['', [Validators.required, Validators.min(0), Validators.max(10000)]]
    });
  }

  changeForm(item) {
    if (!document.getElementById(item).classList.contains('active')) {
      document.getElementById('peso-button').classList.toggle('active');
      document.getElementById('calorico-button').classList.toggle('active');

      if (this.typeForm === 'peso') {
        this.typeForm = 'calorico';
      } else {
        this.typeForm = 'peso';
      }
    }
 }

  guardarPesoDiario() {
    const peso = this.formpeso.get('peso').value;
    const altura = this.formpeso.get('altura').value;
    for(let i=0;i<this.pesos.length-1;i++) {
      this.pesos[i] = this.pesos[i+1]
    }
    this.pesos[211] = peso;
    this.storage.set('pesos', this.pesos).then( () => this.router.navigate(['graphics']) );
  }

  guardarCaloricoDiario() {
    const h = this.formcalorico.get('hidratos').value;
    const g = this.formcalorico.get('grasas').value;
    const p = this.formcalorico.get('proteinas').value;
    const calorias: Calorias = { hidratos: h, proteinas: p, grasas: g };
    for(let i=0;i<this.calorico.length-1;i++) {
      this.calorico[i] = this.calorico[i+1]
    }
    this.calorico[6] = calorias;
    this.storage.set('calorico', this.calorico).then( () => this.router.navigate(['graphics']) );
  }
}
