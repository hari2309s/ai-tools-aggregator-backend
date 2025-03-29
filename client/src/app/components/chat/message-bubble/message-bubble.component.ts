import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Message } from '../../../models/chat.model';
import { MessageOptionsMenuComponent } from '../message-options-menu/message-options-menu.component';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule, MessageOptionsMenuComponent],
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss']
})
export class MessageBubbleComponent {
  @Input() message!: Message;
}
