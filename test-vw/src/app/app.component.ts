import { Component, OnInit } from '@angular/core';
import { SessionService } from './core/services/session.service';
import { MovieGridComponent } from './modules/movie-grid/movie-grid.component';
import { getPopularMovies } from './data/api/movie-api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieGridComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
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