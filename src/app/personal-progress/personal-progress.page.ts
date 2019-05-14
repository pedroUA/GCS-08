import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'app-personal-progress',
  templateUrl: './personal-progress.page.html',
  styleUrls: ['./personal-progress.page.scss'],
})
export class PersonalProgressPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  public dataInsert() {
    this.navCtrl.push('data-insert');
  }

  public graphics() {
    this.navCtrl.push('graphics');
  }

}
