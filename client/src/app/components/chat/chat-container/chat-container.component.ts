import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from '../message-list/message-list.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { Message } from '../../../models/chat.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [CommonModule, MessageListComponent, MessageInputComponent, MatSnackBarModule, MatButtonModule, MatIconModule],
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent {
  messages: Message[] = [];
  chatTitle: string = 'New Conversation';
  
  constructor(private snackBar: MatSnackBar) {}
  
  /**
   * Handle sending a message
   */
  onSendMessage(text: string): void {
    if (text.trim()) {
      // Add user message
      this.messages.push({
        id: Date.now().toString(),
        content: text,
        sender: 'user',
        timestamp: new Date(),
        status: 'sent'
      });
      
      // Simulate AI response
      setTimeout(() => {
        this.messages.push({
          id: (Date.now() + 1).toString(),
          content: `You said: ${text}`,
          sender: 'ai',
          timestamp: new Date(),
          status: 'sent'
        });
      }, 1000);
    }
  }
}
