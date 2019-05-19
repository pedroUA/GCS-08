import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Receta } from '../receta';
import { Usuario } from '../usuario';
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

  constructor(private storage: Storage, public navCtrl: NavController, private router: Router, public fb: FormBuilder) { }

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
    this.router.navigate(['graphics']);
  }

  guardarCaloricoDiario() {
    this.router.navigate(['graphics']);
  }
}
