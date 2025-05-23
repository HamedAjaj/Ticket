import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../../core/ticket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
 ticketForm: FormGroup;
  tickets: any[] = [];
  currentPage = 1;
  pageSize = 10;

  constructor(private fb: FormBuilder, private ticketService: TicketService) {
    this.ticketForm = this.fb.group({
      phoneNumber: [''],
      governorate: [''],
      city: [''],
      district: [''],
    });
  }

  ngOnInit() {
    this.loadTickets();
    setInterval(() => this.autoHandleTickets(), 10000); // Check every 10 seconds
  }

  loadTickets() {
    this.ticketService.getPaginatedTickets(this.currentPage, this.pageSize).subscribe((response: any) => {
      this.tickets = response;
    });
  }

  createTicket() {
    const ticketData = this.ticketForm.value;
    this.ticketService.createTicket(ticketData).subscribe(() => {
      this.loadTickets();
    });
  }

  handleTicket(ticketId: string) {
    this.ticketService.handleTicket(ticketId).subscribe(() => {
      this.loadTickets();
    });
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.loadTickets();
  }

  autoHandleTickets() {
    const now = new Date();
    this.tickets.forEach(ticket => {
      const createdTime = new Date(ticket.creationTime);
      const diffMinutes = (now.getTime() - createdTime.getTime()) / 60000;
      if (diffMinutes >= 60 && ticket.status !== 'Handled') {
        this.handleTicket(ticket.id);
      }
    });
  }

  getTicketColor(creationTime: string): string {
    const now = new Date();
    const createdTime = new Date(creationTime);
    const diffMinutes = (now.getTime() - createdTime.getTime()) / 60000;

    if (diffMinutes < 15) return '';
    if (diffMinutes < 30) return 'yellow';
    if (diffMinutes < 45) return 'green';
    if (diffMinutes < 60) return 'blue';
    return 'red';
  }
}
 
 