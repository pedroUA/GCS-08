import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-data-insert',
  templateUrl: './data-insert.page.html',
  styleUrls: ['./data-insert.page.scss'],
})

export class DataInsertPage {

    typeForm = 'peso';
    formpeso = this.fb.group({
      peso: ['', [Validators.required, Validators.min(0), Validators.max(400)]],
      altura: ['', [Validators.required, Validators.min(0), Validators.max(2.5)]]
    });

    formcalorico = this.fb.group({
      grasas: ['', [Validators.required, Validators.min(0), Validators.max(10000)]],
      hidratos: ['', [Validators.required, Validators.min(0), Validators.max(10000)]],
      proteinas: ['', [Validators.required, Validators.min(0), Validators.max(10000)]]
    });

    constructor(private storage: Storage, private router: Router, public fb: FormBuilder) { }

    cambiarForm() {
        const pesoButton = document.getElementById('peso-button').classList.contains('active');
        const caloricoButton = document.getElementById('calorico-button').classList.contains('active');
        if (pesoButton && !caloricoButton) {
          this.typeForm = 'calorico';
        } else {
          this.typeForm = 'peso';
        }
        document.getElementById('peso-button').classList.toggle('active');
        document.getElementById('calorico-button').classList.toggle('active');
    }

    guardarPesoDiario() {
        this.router.navigate(['graphics']);
    }

    guardarCaloricoDiario() {
        this.router.navigate(['graphics']);
    }
}
