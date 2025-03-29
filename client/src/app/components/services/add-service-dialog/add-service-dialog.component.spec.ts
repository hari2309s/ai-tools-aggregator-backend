import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { AddServiceDialogComponent } from './add-service-dialog.component';

describe('AddServiceDialogComponent', () => {
  let component: AddServiceDialogComponent;
  let fixture: ComponentFixture<AddServiceDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AddServiceDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        AddServiceDialogComponent,
        ReactiveFormsModule,
        MatDialogModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an invalid form', () => {
    expect(component.serviceForm.valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const providerControl = component.serviceForm.get('provider');
    const apiKeyControl = component.serviceForm.get('apiKey');
    
    expect(providerControl?.valid).toBeFalsy();
    expect(apiKeyControl?.valid).toBeFalsy();
    
    providerControl?.setValue('openai');
    apiKeyControl?.setValue('test-api-key');
    
    expect(providerControl?.valid).toBeTruthy();
    expect(apiKeyControl?.valid).toBeTruthy();
    expect(component.serviceForm.valid).toBeTruthy();
  });

  it('should not require the model field', () => {
    const modelControl = component.serviceForm.get('model');
    expect(modelControl?.valid).toBeTruthy();
  });

  it('should close the dialog with form value when submitted', () => {
    // Set valid form values
    component.serviceForm.setValue({
      provider: 'openai',
      apiKey: 'test-api-key',
      model: 'gpt-4'
    });
    
    component.onSubmit();
    
    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      provider: 'openai',
      apiKey: 'test-api-key',
      model: 'gpt-4'
    });
  });

  it('should not close the dialog if form is invalid', () => {
    // Form is invalid by default
    component.onSubmit();
    
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should close the dialog when cancel button is clicked', () => {
    const cancelButton = fixture.debugElement.query(By.css('.cancel-button'));
    cancelButton.triggerEventHandler('click', null);
    
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should disable the add button when form is invalid', () => {
    const addButton = fixture.debugElement.query(By.css('.add-button'));
    
    expect(addButton.nativeElement.disabled).toBeTruthy();
    
    // Make form valid
    component.serviceForm.setValue({
      provider: 'openai',
      apiKey: 'test-api-key',
      model: ''
    });
    fixture.detectChanges();
    
    expect(addButton.nativeElement.disabled).toBeFalsy();
  });
});
