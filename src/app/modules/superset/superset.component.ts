import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SupersetService } from 'src/app/shared/services/superset.service';

@Component({
  selector: 'app-superset',
  templateUrl: './superset.component.html',
  styleUrls: ['./superset.component.scss']
})
export class SupersetComponent implements OnInit {

  id: string;
  token: string;

  constructor(
    private route: ActivatedRoute,
    public supersetService: SupersetService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log('id acesso recebido:', this.id);
    this.guestToken(this.id, []);
  }

  guestToken(id: string, clauses: []) {
    this.supersetService.guestToken(id, clauses).subscribe({
      next: (response: any) => {
        console.log('Token guest recebido:', response);
        this.token = response.token;
      },
      error: (error) => {
        console.error('Erro ao buscar guest token:', error);
      }
    });
  }
}