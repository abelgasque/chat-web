import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  form!: FormGroup;
  messages: { sender: string; text: string }[] = [];

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      message: ['', Validators.required]
    });
  }

  selectContact(contact: any) {
    // Lógica para carregar mensagens do contato
    console.log('Selecionado:', contact);
  }

  sendMessage() {
    if (this.form.valid) {
      const text = this.form.value.message;
      this.messages.push({ sender: 'me', text });
      this.form.reset();

      // Exemplo: resposta automática
      setTimeout(() => {
        this.messages.push({ sender: 'bot', text: 'Received: ' + text });
        this.scrollToBottom();
      }, 500);

      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    });
  }

}
