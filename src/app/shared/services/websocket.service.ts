import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket | null = null;
  private messageSubject = new Subject<string>();

  constructor(private notificationService: NotificationService) { }

  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      this.notificationService.success('🔌 WebSocket conectado');
    };

    this.socket.onmessage = (event) => {
      this.messageSubject.next(event.data);
    };

    this.socket.onerror = (error) => {
      console.error('❌ Erro WebSocket:', error);
      this.notificationService.error('❌ Erro WebSocket:');
    };

    this.socket.onclose = () => {
      this.notificationService.warning('🔌 WebSocket desconectado');
    };
  }

  sendMessage(msg: any): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(msg));
    } else {
      this.notificationService.warning('⛔ WebSocket não está conectado.');
    }
  }

  onMessage(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    this.socket?.close();
  }
}