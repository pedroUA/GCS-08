import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
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

 
 constructor(private storage: Storage,private router: Router, public formBuilder: FormBuilder) {
    this.storage.get('userLogged').then( (usuario:Usuario) => this.perfil=usuario );
    this.storage.get('usuarios').then( (arrayUsers:Usuario[]) => { this.ausuarios = arrayUsers; } );
    this.storage.get('recetas').then( (arrayRecetas:Receta[]) => { this.arecetas = arrayRecetas; } );

    this.datos = new FormGroup({
      nombre: new FormControl,
      descripcion: new FormControl,
      ingredientes: new FormControl,
      proteinas: new FormControl,
      carbos: new FormControl,
      grasa: new FormControl
   })
   

   }

 
  ngOnInit() {
    this.datos = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      ingredientes: ['', Validators.required],
      proteinas: ['',Validators.required],
      carbos: ['', Validators.required],
      grasa: ['', Validators.required],




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

  public guardarReceta(){
    var receta:Receta={
    _id : this.arecetas.length,
    _name : this.datos.get('nombre').value,
    _description:this.datos.get('descripcion').value,
    _ingredientes: String(this.datos.get('ingredientes').value).split(','),
    _author: this.perfil._id,
    _protein: this.datos.get('proteinas').value,
    _carbohydrates:  this.datos.get('carbos').value,
    _fat: this.datos.get('grasa').value,
    _kcals:5,
    _likes:[],
    _imageURL:'http://lorempixel.com/500/500/food'
   
    
  };

  this.arecetas.push(receta);

  this.storage.set('recetas',this.arecetas);
  
  this.router.navigate(['mireceta'])
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
