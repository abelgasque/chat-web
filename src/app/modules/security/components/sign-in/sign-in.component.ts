import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CoreService } from 'src/app/shared/services/core.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TokenDTO } from 'src/app/shared/models/DTO/token.dto';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private coreService: CoreService,
    private sharedService: SharedService,
    private tokenService: TokenService,
    private messagesService: MessagesService,
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email, Validators.maxLength(250)]],
      password: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.sharedService.openSpinner();
    this.tokenService.signIn(this.form.value).subscribe({
      next: (response: TokenDTO) => {
        this.coreService.setTokenLocalStorage(response);
        this.router.navigate(['/']);
        this.messagesService.success('Success', 'User logged in successfully!');
        this.sharedService.closeSpinner();
      },
      error: (e: any) => {
        this.messagesService.errorHandler(e);
        this.form.reset();
      }
    });
  }
}
