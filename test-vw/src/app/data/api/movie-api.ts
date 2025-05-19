import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SessionService} from '../../core/services/session.service';


export const getMovieInfo = (http: HttpClient, token: string, movieId: string): Promise<any> => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const headers = new HttpHeaders({
    'Authorization': token,
    'accept': 'application/json'
  });
  return http.get(url, { headers }).toPromise();
};


export const getTopMovies = async (http: HttpClient, token: string): Promise<string[]> => {
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';
  const headers = new HttpHeaders({
    'Authorization': token,
    'accept': 'application/json'
  });
  const response: any = await http.get(url, { headers }).toPromise();
  // El array de cambios está en response.results y cada objeto tiene un id numérico
  return (response?.results ?? []).map((item: any) => String(item.id));
};



export const getPopularMovies = async (http: HttpClient, token: string,page:string): Promise<any[]> => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  const headers = new HttpHeaders({
    'Authorization': token,
    'accept': 'application/json'
  });
  const response: any = await http.get(url, { headers }).toPromise();
  // El array de películas populares está en response.results
  return response?.results ?? [];
};

export const getMovieRecommendations = async (http: HttpClient, token: string, movieId: string): Promise<any[]> => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`;
  const headers = new HttpHeaders({
    'Authorization': token,
    'accept': 'application/json'
  });
  const response: any = await http.get(url, { headers }).toPromise();
  return response?.results ?? [];
};

export const searchMovieBySlug = async (http: HttpClient, token: string, slug: string): Promise<any | null> => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(slug.replace(/-/g, ' '))}&language=en-US&page=1`;
  const headers = new HttpHeaders({
    'Authorization': token,
    'accept': 'application/json'
  });
  const response: any = await http.get(url, { headers }).toPromise();
  // Busca la coincidencia exacta por slug
  return (response?.results ?? []).find((m: any) =>
    m.title && m.title.replace(/\s+/g, '-').toLowerCase() === slug
  ) || null;
};

export const discoverMovies = async (
  http: HttpClient,
  token: string,
  page: string = '1',
  sortBy: string = 'popularity.desc',
  voteAverageGte: string = '',
  voteAverageLte: string = '',
  year: string = ''
): Promise<any[]> => {
  let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}&vote_count.gte=150`;

  if (voteAverageGte) {
    url += `&vote_average.gte=${voteAverageGte}`;
  }
  if (voteAverageLte) {
    url += `&vote_average.lte=${voteAverageLte}`;
  }
  if (year) {
    url += `&primary_release_year=${year}`;
  }

  const headers = new HttpHeaders({
    'Authorization': token,
    'accept': 'application/json'
  });
  const response: any = await http.get(url, { headers }).toPromise();
  return response?.results ?? [];
};

export const getGenresMap = async (http: HttpClient, token: string): Promise<{ [id: number]: string }> => {
  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
  const headers = new HttpHeaders({
    'Authorization': token,
    'accept': 'application/json'
  });
  const response: any = await http.get(url, { headers }).toPromise();
  return (response.genres ?? []).reduce((acc: any, genre: any) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});
};

export const getUpcomingMovies = async (
  http: HttpClient,
  token: string,
  page: string = '1'
): Promise<any[]> => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
  const headers = new HttpHeaders({
    'Authorization': token,
    'accept': 'application/json'
  });
  const response: any = await http.get(url, { headers }).toPromise();
  return response?.results ?? [];
};

export const searchMovies = async (
  http: HttpClient,
  token: string,
  query: string,
  year: string,
  page: string = '1'
): Promise<any[]> => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&primary_release_year=${year}&page=${page}`;
  const headers = new HttpHeaders({
    'Authorization': token,
    'accept': 'application/json'
  });
  const response: any = await http.get(url, { headers }).toPromise();
  return response?.results ?? [];
};