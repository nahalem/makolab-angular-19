import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../../common/material.module';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { ConcurrentFetchService } from '../../services/concurrent-fetch.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-concurrency-excercise',
   imports: [
    CommonModule,
    ToastrModule,
    MaterialModule,
    RouterModule,
    FormsModule
  ],
  providers:
  [
    { provide: ToastrService, useValue: ToastrService },
    { provide: NotificationService, useValue: NotificationService },
  ],
  templateUrl: './concurrency-excercise.component.html',
  styleUrl: './concurrency-excercise.component.scss'
})
export class ConcurrentExcerciseComponent {
  responses: any[] = [];
  maxConcurrency = 1;
  urls: string[] = [];

  constructor(
    private service: ConcurrentFetchService
  ) {}

  run() {
    this.urls = [
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/posts/2'
    ];
    this.service.fetchWithConcurrency(this.urls, this.maxConcurrency).then(res => this.responses = res);
  }
}
