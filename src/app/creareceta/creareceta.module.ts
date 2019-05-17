import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrearecetaPage } from './creareceta.page';

const routes: Routes = [
  {
    path: '',
    component: CrearecetaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CrearecetaPage]
})
export class CrearecetaPageModule {}
