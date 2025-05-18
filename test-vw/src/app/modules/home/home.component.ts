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
  page = 1;
  maxPage = 5;
  animDirection: 'left' | 'right' | null = null;

  constructor(private session: SessionService, private http: HttpClient) {}

  async ngOnInit() {
    await this.session.initSession();
    await this.loadMovies();
  }

  async loadMovies() {
    const token = this.session.getToken();
    if (!token) return;
    const movies = await getPopularMovies(this.http, token, String(this.page));
    this.movieIds = movies.map((movie: any) => String(movie.id));
  }

  async nextPage() {
    this.animDirection = 'left';
    this.page = this.page === this.maxPage ? 1 : this.page + 1;
    setTimeout(async () => {
      await this.loadMovies();
      this.animDirection = null;
    }, 400); // Duración de la animación
  }

  async prevPage() {
    this.animDirection = 'right';
    this.page = this.page === 1 ? this.maxPage : this.page - 1;
    setTimeout(async () => {
      await this.loadMovies();
      this.animDirection = null;
    }, 400); // Duración de la animación
  }
}