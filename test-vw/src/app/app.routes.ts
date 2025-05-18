import { Routes } from '@angular/router';
import { MovieDetailComponent } from './modules/movie-detail/movie-detail.component';

import { HomeComponent } from './modules/home/home.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailComponent }
];