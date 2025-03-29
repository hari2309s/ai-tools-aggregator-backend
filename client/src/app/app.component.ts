import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { ChatContainerComponent } from './components/chat/chat-container/chat-container.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    RouterModule,
    ChatContainerComponent,
    SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AI Aggregator';

  constructor() {}

  // Handle new chat
  onNewChat() {
    // This event is now handled by the chat container
  }

  // Handle workspace item selection
  onWorkspaceItemSelect(item: string) {
    console.log('Selected workspace item:', item);
  }
}
