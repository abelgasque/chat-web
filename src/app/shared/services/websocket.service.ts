import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket | null = null;
  private messageSubject = new Subject<string>();

  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('🔌 WebSocket conectado');
    };

    this.socket.onmessage = (event) => {
      console.log('📩 Mensagem recebida:', event.data);
      this.messageSubject.next(event.data);
    };

    this.socket.onerror = (error) => {
      console.error('❌ Erro WebSocket:', error);
    };

    this.socket.onclose = () => {
      console.warn('🔌 WebSocket desconectado');
    };
  }

  sendMessage(msg: string): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(msg);
    } else {
      console.warn('⛔ WebSocket não está conectado.');
    }
  }

  onMessage(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    this.socket?.close();
  }
}