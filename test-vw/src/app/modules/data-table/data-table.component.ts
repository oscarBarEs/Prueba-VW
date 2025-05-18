import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../core/services/session.service';
import { getPopularMovies } from '../../data/api/movie-api';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent implements OnInit {
  movies: any[] = [];
  constructor(private http: HttpClient, private session: SessionService) {}
  async ngOnInit() {
    const token = this.session.getToken();
    if (!token) return;
    this.movies = await getPopularMovies(this.http, token,"1");
  }
}