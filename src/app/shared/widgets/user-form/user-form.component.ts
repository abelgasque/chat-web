import { Component, Input, OnInit } from '@angular/core';

import { User } from '../../models/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() data: User;

  constructor() { }

  ngOnInit(): void {
  }

}
