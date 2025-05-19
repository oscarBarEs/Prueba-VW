import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { getMovieInfo, getMovieRecommendations } from '../../data/api/movie-api';
import { SessionService } from '../../core/services/session.service';
import { MovieGridComponent } from '../movie-grid/movie-grid.component';
import { switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Subscription } from 'rxjs'; 
@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, MovieGridComponent],
  templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent implements OnInit {
  movie: any = null;
  recommendations: string[] = [];
  notFound = false;
  private sub?: Subscription;
  token: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private session: SessionService
  ) {}


async ngOnInit() {
  this.token = await this.session.getToken();

  this.sub = this.route.paramMap
    .pipe(
      switchMap(params => {
        this.movie = null;
        this.recommendations = [];
        this.notFound = false;
        const movieId = params.get('id');
        if (!movieId) {
          this.notFound = true;
          return of(null);
        }
        return from(
          (async () => {
            if (!this.token) return;

            this.movie = await getMovieInfo(this.http, this.token, movieId);
            if (!this.movie) {
              this.notFound = true;
              return null;
            }
            console.log('Movie:', this.movie);
            const recs = await getMovieRecommendations(this.http, this.token, movieId);
            this.recommendations = recs.map((rec: any) => String(rec.id));
            return null;
          })()
        );
      })
    )
    .subscribe();
}

ngOnDestroy() {
  this.sub?.unsubscribe();
}
}