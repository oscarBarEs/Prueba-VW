import { HttpClient, HttpHeaders } from '@angular/common/http';

export const getMovieInfo = (http: HttpClient, token: string, movieId: string): Promise<any> => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const headers = new HttpHeaders({
    'Authorization': token,
    'accept': 'application/json'
  });
  return http.get(url, { headers }).toPromise();
};


export const getChangedMovieIds = async (http: HttpClient, token: string): Promise<string[]> => {
  const url = 'https://api.themoviedb.org/3/movie/changes?page=1';
  const headers = new HttpHeaders({
    'Authorization': token,
    'accept': 'application/json'
  });
  const response: any = await http.get(url, { headers }).toPromise();
  // El array de cambios está en response.results y cada objeto tiene un id numérico
  return (response?.results ?? []).map((item: any) => String(item.id));
};

export const getPopularMovies = async (http: HttpClient, token: string): Promise<any[]> => {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const headers = new HttpHeaders({
    'Authorization': token,
    'accept': 'application/json'
  });
  const response: any = await http.get(url, { headers }).toPromise();
  // El array de películas populares está en response.results
  return response?.results ?? [];
};