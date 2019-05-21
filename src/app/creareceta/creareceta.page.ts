import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Receta } from '../receta';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-creareceta',
  templateUrl: './creareceta.page.html',
  styleUrls: ['./creareceta.page.scss'],
})


export class CrearecetaPage implements OnInit {
 // private storage: Storage,
  
 
 datos: FormGroup;
 ausuarios:Usuario[] = [];
 perfil: Usuario;
 arecetas:Receta[]  = [];

 
  constructor(private storage: Storage,private router: Router, public formBuilder: FormBuilder, public alertController: AlertController) {
    this.storage.get('userLogged').then( (usuario:Usuario) => this.perfil=usuario );
    this.storage.get('usuarios').then( (arrayUsers:Usuario[]) => { this.ausuarios = arrayUsers; } );
    this.storage.get('recetas').then( (arrayRecetas:Receta[]) => { this.arecetas = arrayRecetas; } );
  }

 
  ngOnInit() {
    this.datos = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2000)]],
      descripcion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20000)]],
      ingredientes: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20000)]],
      proteinas: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      carbos: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      grasa: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  onSubmitTemplate(){
    console.log('Form submit');
    console.log(this.datos);
  }

  openDetailsWithState(){
    let navigationExtras:NavigationExtras ={
      state: {
        receta : this.datos
      }    
    }
    this.router.navigate(['mireceta'],navigationExtras);
  }

  public enviar() {
    this.router.navigate(['mireceta'])
  }

  async presentAlertNombre() {
    const alert = await this.alertController.create({
      header: 'Error en el nombre',
      message: 'Introduce una nombre de receta válido',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async presentAlertDescripcion() {
    const alert = await this.alertController.create({
      header: 'Error en la elaboración',
      message: 'Introduce una elaboración de receta válida',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async presentAlertIngredientes() {
    const alert = await this.alertController.create({
      header: 'Error en los ingredientes',
      message: 'Introduce unos ingredientes válidos',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async presentAlertProteinas() {
    const alert = await this.alertController.create({
      header: 'Error en las proteinas',
      message: 'Introduce una cantidad de gramos de proteinas válida',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async presentAlertCarbos() {
    const alert = await this.alertController.create({
      header: 'Error en los hidratos',
      message: 'Introduce una cantidad de gramos de hidratos válida',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async presentAlertGrasa() {
    const alert = await this.alertController.create({
      header: 'Error en las grasas',
      message: 'Introduce una cantidad de gramos de grasas válida',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  public guardarReceta(){
    if(this.datos.get('nombre').valid &&
       this.datos.get('descripcion').valid &&
       this.datos.get('ingredientes').valid &&
       this.datos.get('proteinas').valid &&
       this.datos.get('carbos').valid &&
       this.datos.get('grasa').valid) {
        var fat = Number(this.datos.get('grasa').value);
        var hc = Number(this.datos.get('carbos').value);
        var prot = Number(this.datos.get('proteinas').value);
        var receta:Receta={
        _id : this.arecetas.length,
        _name : this.datos.get('nombre').value,
        _description:this.datos.get('descripcion').value,
        _ingredientes: String(this.datos.get('ingredientes').value).split(','),
        _author: this.perfil._id,
        _protein: prot,
        _carbohydrates: hc,
        _fat: fat,
        _kcals: 4*hc + 4*prot + 9*fat,
        _likes:[],
        _imageURL:'http://lorempixel.com/500/500/food'
      };
      this.arecetas.push(receta);
      this.storage.set('recetas',this.arecetas);
      this.router.navigate(['mireceta']);
    } else {
      if(!this.datos.get('nombre').valid) {
        this.presentAlertNombre();
      } else {
        if(!this.datos.get('descripcion').valid) {
          this.presentAlertDescripcion();
        } else {
          if (!this.datos.get('ingredientes').valid) {
            this.presentAlertIngredientes();
          } else {
            if (!this.datos.get('proteinas').valid) {
              this.presentAlertProteinas();
            } else {
              if (!this.datos.get('carbos').valid) {
                this.presentAlertCarbos();
              } else {
                if (!this.datos.get('grasa').valid) {
                  this.presentAlertGrasa();
                }
              }
            }
          }
        }
      }
    }
 }
    
  

  

  public saveData() {
    //this.storage.set('receta',this.receta)
  }
  
  public loadData() {
    this.storage.get('datos').then((val) => {
      console.log('Your is' , val.nombre);
    });
  }


}
