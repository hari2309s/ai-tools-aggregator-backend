import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AddServiceDialogComponent } from '../services/add-service-dialog/add-service-dialog.component';
import { ChatService } from '../../services/chat.service';
import { AIService } from '../../models/chat.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    MatSnackBarModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() newChat = new EventEmitter<void>();
  isCollapsed = false; // Track sidebar collapse state
  
  availableServices: AIService[] = [];
  
  // Sample data for chat history
  chatHistory: any[] = [
    { id: '1', title: 'Website design', timestamp: new Date() },
    { id: '2', title: 'Marketing strategy', timestamp: new Date(Date.now() - 86400000) },
    { id: '3', title: 'Product roadmap', timestamp: new Date(Date.now() - 172800000) }
  ];
  
  constructor(
    private dialog: MatDialog,
    private chatService: ChatService,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit() {
    this.loadAvailableServices();
  }

  loadAvailableServices() {
    this.chatService.getAvailableServices().subscribe({
      next: (services) => {
        this.availableServices = services;
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.showError('Failed to load services');
      }
    });
  }
  
  onNewChat(): void {
    this.newChat.emit();
  }
  
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  
  openAddServiceDialog(): void {
    const dialogRef = this.dialog.open(AddServiceDialogComponent, {
      width: '350px',
      panelClass: 'custom-dialog'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.chatService.addService(result).subscribe({
          next: (newService) => {
            this.loadAvailableServices();
            this.showSuccess('Service added successfully');
          },
          error: (error) => {
            console.error('Error adding service:', error);
            this.showError('Failed to add service');
          }
        });
      }
    });
  }
  
  getIconForProvider(provider: string): string {
    switch(provider.toLowerCase()) {
      case 'openai': return 'smart_toy';
      case 'anthropic': return 'psychology';
      case 'google': return 'cloud';
      case 'cohere': return 'bubble_chart';
      case 'huggingface': return 'face';
      case 'replicate': return 'repeat';
      default: return 'api';
    }
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
