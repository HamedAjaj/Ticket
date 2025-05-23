import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'https://localhost:7130/api/Tickets';

  constructor(private http: HttpClient) {}

  getPaginatedTickets(page: number, size: number) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&pageSize=${size}`).pipe(shareReplay(1));
  }



createTicket(ticketData: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/create`, ticketData);
}

  handleTicket(ticketId: string) {
    return this.http.put(`${this.baseUrl}/handle/${ticketId}`, { status: 'Handled' });
  }
}