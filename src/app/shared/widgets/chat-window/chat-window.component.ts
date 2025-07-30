import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  form!: FormGroup;
  user: any;

  @Input() senderId: string = '';
  @Input() receiverId: string = '';
  @Input() avatar: string = './assets/images/avatar-default.png';
  @Input() username: string = 'Desconhecido';
  @Input() status: string = 'Offline';
  @Input() messages: any[] = [];

  @Output() eventSendMessage = new EventEmitter<any>();
  
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(
    private fb: FormBuilder,
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      message: ['', Validators.required]
    });
  }

  sendMessage() {
    if (this.form.valid) {
      this.eventSendMessage.emit(this.form.value.message);
      this.form.reset();
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    });
  }
}
