import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  form!: FormGroup;

  @Input() senderId: string = '';
  @Input() contact: any = undefined;
  @Input() messages: any[] = [];

  @Output() eventSendMessage = new EventEmitter<any>();
  @Output() eventCloseContact = new EventEmitter<any>();
  
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private fb: FormBuilder) { }

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
