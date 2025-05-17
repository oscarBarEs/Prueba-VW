import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { getMovieInfo } from '../../data/api/movie-api';
import { SessionService } from '../../core/services/session.service';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MovieGridComponent implements OnChanges {
  @Input() movieIds: string[] = [];
  postersWithTitles: { url: string, title: string }[] = [];

  constructor(private http: HttpClient, private session: SessionService) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['movieIds'] && this.movieIds.length > 0) {
      const token = this.session.getToken();
      if (!token) return;
      const postersWithTitles: { url: string, title: string }[] = [];
      for (const id of this.movieIds.slice(0, 10)) { // Limita si quieres
        try {
          const data = await getMovieInfo(this.http, token, id);
          if (data?.poster_path) {
            postersWithTitles.push({
              url: 'https://image.tmdb.org/t/p/w500' + data.poster_path,
              title: data.title
            });
          }
        } catch (e) {
          console.error('Error fetching movie', id, e);
        }
      }
      this.postersWithTitles = postersWithTitles;
    }
  }
}