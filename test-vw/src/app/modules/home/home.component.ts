import { Component, OnInit } from '@angular/core';
import { MovieGridComponent } from '../movie-grid/movie-grid.component';
import { SessionService } from '../../core/services/session.service';
import { getPopularMovies } from '../../data/api/movie-api';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieGridComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movieIds: string[] = [];

  constructor(private session: SessionService, private http: HttpClient) {}

  async ngOnInit() {
    await this.session.initSession();
    const token = this.session.getToken();
    if (!token) return;
    const movies = await getPopularMovies(this.http, token);
    this.movieIds = movies.map((movie: any) => String(movie.id));
  }
}