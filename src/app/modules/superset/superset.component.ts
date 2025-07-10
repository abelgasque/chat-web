import { Component, OnInit } from '@angular/core';
import { SupersetService } from 'src/app/shared/services/superset.service';

@Component({
  selector: 'app-superset',
  templateUrl: './superset.component.html',
  styleUrls: ['./superset.component.scss']
})
export class SupersetComponent implements OnInit {

  id: string = "819810c9-c9e3-4a3f-817f-54622d4fae10";
  token: string;
  accessToken: string;

  constructor(public supersetService: SupersetService) { }

  ngOnInit(): void {
    this.getAccessToken();
  }

  getAccessToken() {
    this.supersetService.accessToken().subscribe({
      next: (response: any) => {
        console.log('Token acesso recebido:', response);
        this.accessToken = response.access_token;
        this.supersetService.guestToken(this.accessToken).subscribe({
          next: (response: any) => {
            console.log('Token guest recebido:', response);
            this.token = response.token;
          },
          error: (error) => {
            console.error('Erro ao buscar guest token:', error);
          }
        });
      },
      error: (error) => {
        console.error('Erro ao buscar access token:', error);
      }
    });
  }
}