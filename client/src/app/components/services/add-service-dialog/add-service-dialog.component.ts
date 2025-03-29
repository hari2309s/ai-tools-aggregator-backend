import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ServiceDialogData {
  provider?: string;
  apiKey?: string;
  model?: string;
}

@Component({
  selector: 'app-add-service-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-service-dialog.component.html',
  styleUrls: ['./add-service-dialog.component.scss']
})
export class AddServiceDialogComponent {
  serviceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceDialogData
  ) {
    this.serviceForm = this.fb.group({
      provider: [data?.provider || '', Validators.required],
      apiKey: [data?.apiKey || '', Validators.required],
      model: [data?.model || '']
    });
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      this.dialogRef.close(this.serviceForm.value);
    }
  }
}