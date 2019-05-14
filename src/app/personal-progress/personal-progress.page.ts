import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-personal-progress',
  templateUrl: './personal-progress.page.html',
  styleUrls: ['./personal-progress.page.scss'],
})
export class PersonalProgressPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public dataInsert() {
    this.router.navigate(['data-insert']);
  }

  public graphics() {
    this.router.navigate(['graphics']);
  }
}
