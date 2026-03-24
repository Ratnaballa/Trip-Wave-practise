import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting = false;
  submitted = false;

  topics = [
    { icon: '✈️', label: 'Booking Help' },
    { icon: '💰', label: 'Payments' },
    { icon: '🗺️', label: 'Trip Planning' },
    { icon: '🔄', label: 'Cancellations' },
    { icon: '🎁', label: 'Offers & Deals' },
    { icon: '🐛', label: 'Report a Bug' },
  ];
  selectedTopic = '';

  get f() { return this.contactForm.controls; }
  get msgLen() { return this.f['message'].value?.length || 0; }

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(3)]],
      email:   ['', [Validators.required, Validators.email]],
      phone:   ['', [Validators.pattern(/^[0-9]{10}$/)]],
      message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]]
    });
  }

  selectTopic(label: string) {
    this.selectedTopic = this.selectedTopic === label ? '' : label;
  }

  sendMessage() {
    if (this.contactForm.invalid) { this.contactForm.markAllAsTouched(); return; }
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitted = true;
      this.contactForm.reset();
      this.selectedTopic = '';
    }, 1800);
  }
}
