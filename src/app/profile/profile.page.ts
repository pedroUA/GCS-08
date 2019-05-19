
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  usuario: Usuario;

  constructor(private storage:Storage) {
    //Si se introduce un usuario en el Storage es el que se verá
    this.storage.get('usuario').then( user => {
      alert("getting: " + user)
      this.usuario = user;
      this.storage.remove('usuario').then(user=>{alert("eliminado el usuario: " + user._username)})
    })

    //Si no se insertó usuario es por que se desean ver los datos del perfil
    if(!this.usuario){
      alert("Vamos a ver la cuenta personal")
    }else{
      alert("Vamos a ver otra cuenta")
    }
  }

  ngOnInit() {
  }

}
