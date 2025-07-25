import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  private show(message: string, panelClass: string, duration: number, verticalPosition: 'top' | 'bottom') {
    const config: MatSnackBarConfig = {
      duration,
      verticalPosition,
      horizontalPosition: 'end',
      panelClass: [panelClass]
    };
    this.snackBar.open(message, 'Fechar', config);
  }

  success(message: string, duration = 3000, position: 'top' | 'bottom' = 'top') {
    this.show(message, 'toast-success', duration, position);
  }

  error(message: string, duration = 4000, position: 'top' | 'bottom' = 'top') {
    this.show(message, 'toast-error', duration, position);
  }

  warning(message: string, duration = 4000, position: 'top' | 'bottom' = 'top') {
    this.show(message, 'toast-warning', duration, position);
  }
}