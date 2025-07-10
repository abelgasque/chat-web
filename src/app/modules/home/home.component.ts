import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public title: string;
  public description: string;
  public linkSwagger: string;
  public username: string;
  public password: string;

  constructor() {
    this.linkSwagger =  `${environment.baseUrlApi}/swagger`;
    this.title = environment.name;
    this.description = environment.description;
    this.username = "admin@admin.com";
    this.password = "12345678";
  }

}
