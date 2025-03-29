import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent {
  @Input() isDisabled = false;
  @Input() placeholder = 'Type your message...';
  @Output() sendMessage = new EventEmitter<string>();
  
  messageText = '';
  
  onSendMessage(): void {
    if (this.messageText.trim() && !this.isDisabled) {
      this.sendMessage.emit(this.messageText);
      this.messageText = '';
    }
  }
}
