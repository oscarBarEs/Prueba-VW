import { Routes } from '@angular/router';

import { MovieDetailComponent } from './modules/movie-detail/movie-detail.component';
import { HomeComponent } from './modules/home/home.component';
import { DataTableComponent } from './modules/data-table/data-table.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  {path: 'data-table', component: DataTableComponent},
];

