import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-data-insert',
  templateUrl: './data-insert.page.html',
  styleUrls: ['./data-insert.page.scss'],
})
export class DataInsertPage implements OnInit {

  typeForm = 'peso';
  formpeso: FormGroup;
  formcalorico: FormGroup;

  constructor(private storage: Storage, private router: Router, public formBuilder: FormBuilder) {
      this.formpeso = new FormGroup({
        peso: new FormControl,
        altura: new FormControl
      });

      this.formcalorico = new FormGroup({
        grasas: new FormControl,
        hidratos: new FormControl,
        proteinas: new FormControl
      });
  }

  ngOnInit() {
      //al iniciar
  }

  changeForm() {
      const pesoButtonActive = document.getElementById('peso-button').classList.contains('active');
      const caloricoButtonActive = document.getElementById('calorico-button').classList.contains('active');
      if (pesoButtonActive) {
          //desactivar boton peso
          //desactivar form peso
          //activar boton calorico
          //activar form calorico
      } else {
          //al contrario
      }
  }

  changeClassActive(item) {
      if (!document.getElementById(item).classList.contains('active')) {
          document.getElementById('recetas-button').classList.toggle('active');
          document.getElementById('usuarios-button').classList.toggle('active');

          this.changeForm();
      }
 }

}
