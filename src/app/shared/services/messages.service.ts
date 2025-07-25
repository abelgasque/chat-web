import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SharedService } from './shared.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private notificationService: NotificationService,
    private sharedService: SharedService
  ) { }

  success(title: string, description: string) {
    console.log(title, description);
    this.sharedService.closeSpinner();
    this.notificationService.success(description);
  }

  error(title: string, description: string) {
    console.log(title, description);
    this.sharedService.closeSpinner();
    this.notificationService.error(description);
  }

  public errorHandler(error: any) {
    let msg: string = 'Error processing remote service. Try again.';

    if (error instanceof HttpErrorResponse && error.status >= 400 && error.status <= 499) {
      msg = 'There was an error processing your request';

      if (error.status === 401 || error.status === 403) {
        msg = 'You do not have permission to perform this action.';
      }
    }

    if ('error' in error.error) {
      msg = error.error.error;
    }

    console.error('An error has occurred', error);
    this.error('Error', msg);
  }
}
