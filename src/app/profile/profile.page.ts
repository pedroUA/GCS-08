import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  usuario: Usuario = null;
  id: String;

  constructor(private storage:Storage, private route:ActivatedRoute) {    
    var id = this.route.snapshot.paramMap.get('id')

    if(id){
      alert("Vamos a ver el usuario " + this.storage.get('usuarios')[id]._username)
    }else{
      alert("Vamos a ver el perfil.")
    }
    
  }

  ngOnInit() {
  }

}
