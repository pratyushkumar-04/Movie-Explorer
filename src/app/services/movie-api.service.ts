import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private baseurl='https://api.themoviedb.org/3';
  private apikey='f8d8af9b93211b253d70ae529ad78ce1';

  constructor(private http:HttpClient) { }

  getTrendingmovies()
  {
    return this.http.get (`${this.baseurl}/trending/movie/week?api_key=${this.apikey}`);
  }

  getTrendingtv()
  {
    return this.http.get (`${this.baseurl}/trending/tv/week?api_key=${this.apikey}`);
  }

  getToprated()
  {
    return this.http.get (`${this.baseurl}/movie/top_rated?api_key=${this.apikey}`);
  }

  getTVDetails(id: string)
  {
  return this.http.get(`${this.baseurl}/tv/${id}?api_key=${this.apikey}`);
  } 

  getdata(id:string)
  {
    return this.http.get(`${this.baseurl}/movie/${id}?api_key=${this.apikey}`);
  }

  getvideos(id:string)
  {
    return this.http.get(`${this.baseurl}/movie/${id}/videos?api_key=${this.apikey}`);
  }

  getcredits(id:string)
  {
    return this.http.get(`${this.baseurl}/movie/${id}/credits?api_key=${this.apikey}`);
  }

  getcreditsTv(id:string)
  {
    return this.http.get(`${this.baseurl}/tv/${id}/credits?api_key=${this.apikey}`);
  }

   getvideosTv(id:string)
  {
    return this.http.get(`${this.baseurl}/tv/${id}/videos?api_key=${this.apikey}`);
  }
  getWatchProviders(id: string)
  {
    return this.http.get(`${this.baseurl}/movie/${id}/watch/providers?api_key=${this.apikey}`);
  }

  getwatchprovidersTV(id:string)
  {
    return this.http.get(`${this.baseurl}/tv/${id}/watch/providers?api_key=${this.apikey}`);

  }

  search(query:string)
  {
      return this.http.get(`${this.baseurl}/search/multi?api_key=${this.apikey}&query=${encodeURIComponent(query)}`);

  }

  getPersonCredits(id:number)
  {
    return this.http.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${this.apikey}`);

  }

getTrendingMovieIndia() {
  return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_original_language=hi&sort_by=popularity.desc`);
}
getTrendingTvIndia() {
  const prime = this.http.get(`${this.baseurl}/discover/tv?api_key=${this.apikey}&with_watch_providers=119&watch_region=IN&with_original_language=hi&first_air_date.gte=2020-01-01&sort_by=popularity.desc`);
  const netflix= this.http.get(`${this.baseurl}/discover/tv?api_key=${this.apikey}&with_watch_providers=8&watch_region=IN&with_original_language=hi&first_air_date.gte=2020-01-01&sort_by=popularity.desc`);
const hotstar = this.http.get(`${this.baseurl}/discover/tv?api_key=${this.apikey}&with_watch_providers=386&watch_region=IN&with_original_language=hi&first_air_date.gte=2020-01-01&sort_by=popularity.desc`);


  // Combine and return a single observable
  return forkJoin([netflix, prime, hotstar]).pipe(
    map(([netflixRes, primeRes, hotstarRes]: any[]) => {
      // Combine all results, remove duplicates by ID
      const all = [...netflixRes.results, ...primeRes.results, ...hotstarRes.results];

      const unique = all.filter(
        (item, index, self) => index === self.findIndex(t => t.id === item.id)
      );

      return unique;
    })
  );
}
getTopRatedMovieIndia() {
return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_original_language=hi&sort_by=vote_average.desc&vote_count.gte=100`);
}
getTopRatedTvIndia() {
  return this.http.get(
    `${this.baseurl}/discover/tv?api_key=${this.apikey}` +
    `&with_original_language=hi` +
    `&sort_by=popularity.desc` +
    `&watch_region=IN` +
    `&with_watch_providers=8|119|386`
  );}

  getPersonDetails(id:number)
  {
    return this.http.get(`${this.baseurl}/person/${id}?api_key=${this.apikey}`);
  }
}

