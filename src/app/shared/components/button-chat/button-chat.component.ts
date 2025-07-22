import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-button-chat',
  templateUrl: './button-chat.component.html',
  styleUrls: ['./button-chat.component.scss']
})
export class ButtonChatComponent implements OnInit {

  constructor(
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
  }

}
