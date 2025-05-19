import { Component, OnInit } from '@angular/core';
import { MovieGridComponent } from '../movie-grid/movie-grid.component';
import { SessionService } from '../../core/services/session.service';
import { getPopularMovies,getTopMovies,getUpcomingMovies } from '../../data/api/movie-api';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MoviePosterComponent } from '../movie-poster/movie-poster.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieGridComponent,MoviePosterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movieIds: string[] = [];
  topMovieIds: string[] = [];

  page = 1;
  maxPage = 5;
  animating = false;
  token: string | null = null;
  loading = true; // Add this
  poster: { id: string, url: string, title: string } ={id: "", url: "", title: ""} ;
 
  posterUpcoming: { id: string, url: string, title: string }[] =[] ;

  posterUrl = 'https://image.tmdb.org/t/p/w500';

  private moviesCache: { [page: number]: string[] } = {};

  constructor(private http: HttpClient, private session: SessionService) {}
// HomeComponent
async ngOnInit() {
  this.loading = true;

  try {
    this.token = await this.session.getToken();

    if (!this.token) {
      console.warn('No token found');
      return;
    }

    await this.loadMovies();
    await this.loadTopMovies();
    await this.getPoster();
    await this.getPosterUpcoming();
  } catch (err) {
    console.error('Error loading movies', err);
  } finally {
    this.loading = false;
  }
}

  
  async loadMovies() {
    if (this.moviesCache[this.page]) {
      this.movieIds = this.moviesCache[this.page];
      return;
    }
    if (!this.token) return;
    const movies = await getPopularMovies(this.http, this.token, String(this.page));
    const ids = movies.map((movie: any) => String(movie.id));
    this.moviesCache[this.page] = ids;
    this.movieIds = ids;
  }
  async loadTopMovies() {
    if (!this.token) return;
    const topMovies = await getTopMovies(this.http, this.token);
    this.topMovieIds = topMovies;
  }

  async getPoster() {
    if (!this.token) return;
    //generate random number btween 6 and 30
    const randomNumber = Math.floor(Math.random() * (30 - 6 + 1)) + 6;

    const movies = await getPopularMovies(this.http, this.token, String(randomNumber));

    //get a random movie from the list
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    if (randomMovie) {
    const imagePath = randomMovie.backdrop_path ? randomMovie.backdrop_path : randomMovie.poster_path;

      this.poster = {
        id: randomMovie.id,
        url: this.posterUrl + imagePath,
        title: randomMovie.title
      };
    }


  }

  async getPosterUpcoming() {
    //Get only the 3 upcoming movies
    if (!this.token) return;
    const movies = await getUpcomingMovies(this.http, this.token, String(this.page));
    this.posterUpcoming = movies.map((movie: any) => ({
      id: movie.id,
      url: this.posterUrl + movie.backdrop_path,
      title: movie.title
    })).splice(0, 3);
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

  async onPageChange(page: number) {
    this.page = page;
    await this.loadMovies();
  }

}