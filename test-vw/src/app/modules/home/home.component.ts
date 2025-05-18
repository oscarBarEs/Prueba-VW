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
  animating = false;

  private moviesCache: { [page: number]: string[] } = {};

  constructor(private session: SessionService, private http: HttpClient) {}

  async ngOnInit() {
    await this.session.initSession();
    await this.loadMovies();
  }

  async loadMovies() {
    if (this.moviesCache[this.page]) {
      this.movieIds = this.moviesCache[this.page];
      return;
    }
    const token = this.session.getToken();
    if (!token) return;
    const movies = await getPopularMovies(this.http, token, String(this.page));
    const ids = movies.map((movie: any) => String(movie.id));
    this.moviesCache[this.page] = ids;
    this.movieIds = ids;
  }

  async nextPage() {
    this.animating = true;
    setTimeout(async () => {
      this.page = this.page === this.maxPage ? 1 : this.page + 1;
      await this.loadMovies();
      this.animating = false;
    }, 400);
  }

  async prevPage() {
    this.animating = true;
    setTimeout(async () => {
      this.page = this.page === 1 ? this.maxPage : this.page - 1;
      await this.loadMovies();
      this.animating = false;
    }, 400);
  }
}