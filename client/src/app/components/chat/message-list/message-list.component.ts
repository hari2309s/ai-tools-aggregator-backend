import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MessageBubbleComponent } from '../message-bubble/message-bubble.component';
import { Message } from '../../../models/chat.model';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MessageBubbleComponent],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  @Input() messages: Message[] = [];
  @Input() chatTitle: string = '';
  @Input() userName: string = 'Hari';
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    // We're no longer initializing sample messages
    // to show the empty state by default
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  private initializeSampleMessages(): void {
    // Sample messages based on the design
    this.messages = [
      {
        id: '1',
        content: "Hi Darinka! I've found your profile on Dribbble. Please let me know: What is your work worth to a client? How much money or exposure will you generate for them?",
        sender: 'user',
        timestamp: new Date(2023, 9, 10, 19, 35),
        status: 'sent'
      },
      {
        id: '2',
        content: "Project_Brief.pdf",
        sender: 'user',
        timestamp: new Date(2023, 9, 10, 19, 35),
        status: 'sent',
        attachment: 'Project_Brief.pdf'
      },
      {
        id: '3',
        content: "Hey Taylor,\n\nThanks for the project brief mate. The inspiration sites you listed are great, you have good taste! For an ecommerce site of this size my quote is $15k usd. Which is 3 weeks of work on my end. Spread across 1.5 months from date of commencement.",
        sender: 'ai',
        timestamp: new Date(2023, 9, 10, 19, 55),
        status: 'sent'
      },
      {
        id: '4',
        content: "Yes, we need more UX designers for our remote team.",
        sender: 'user',
        timestamp: new Date(2023, 9, 10, 19, 58),
        status: 'sent'
      },
      {
        id: '5',
        content: "Can't wait to start this project!",
        sender: 'ai',
        timestamp: new Date(2023, 9, 10, 19, 55),
        status: 'sent'
      }
    ];
  }
}
