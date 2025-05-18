import { Component, OnInit } from '@angular/core';
import { SessionService } from './core/services/session.service';
import { MovieGridComponent } from './modules/movie-grid/movie-grid.component';
import { getPopularMovies } from './data/api/movie-api';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router'; 

// app.component.ts
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {}