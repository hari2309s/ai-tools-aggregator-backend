import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-message-options-menu',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './message-options-menu.component.html',
  styleUrls: ['./message-options-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageOptionsMenuComponent {}
