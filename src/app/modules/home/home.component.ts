import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  title: string;
  description: string;
  linkSwagger: string;

  constructor() {
    this.linkSwagger =  `${environment.baseUrlApi}/swagger`;
    this.title = environment.name;
    this.description = environment.description;
  }

}
