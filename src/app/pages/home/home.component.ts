import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedRegion: 'india' | 'worldwide' = 'worldwide';
  trendingmovies: any[] = [];
  trendingtv: any[] = [];
  toprated: any[] = [];
  result: any[] = [];
  isSearching = false;
  query: string = '';
  indiaTrendingMovies: any[] = [];
  indiaTrendingTV: any[] = [];
  indiaTopRatedMovies: any[] = [];
  indiaTopRatedTV: any[] = [];

  private searchSubject = new Subject<string>();

  switchRegion(region: 'india' | 'worldwide') {
    this.selectedRegion = region;
    this.loadContent();
  }


  constructor(private router: Router, private movieservice: MovieApiService) { }

  loading:boolean=true;

  loadContent() {
    this.loading=true;
    if (this.selectedRegion === 'india') {
      Promise.all([
      this.loadIndiaTrendingMovies(),
      this.loadIndiaTrendingTV(),
      this.loadIndiaTopRatedMovies(),
      this.loadIndiaTopRatedTV()
      ]).then(()=>{this.loading=false;});
    } else {
      Promise.all([
      this.loadmovies(),
      this.loadtvshows(),
      this.loadtoprated()
      ]).then(()=>{this.loading=false;
         });
    }
  }


  ngOnInit(): void {
    this.loadContent();

    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(query => {
      if (query.trim()) {
        this.isSearching = true;
        this.movieservice.search(query).subscribe((res: any) => {
          this.result = res.results.slice(0, 6); // Top 6 results only
        });
      } else {
        this.isSearching = false;
        this.result = [];
      }
    });
  }

  loadmovies(): Promise<void> {
    return new Promise((resolve) =>
      this.movieservice.getTrendingmovies().subscribe((res: any) => {
        this.trendingmovies = res.results;
        resolve();
      })
    );
  }

  loadtvshows(): Promise<void> {
    return new Promise((resolve) =>
      this.movieservice.getTrendingtv().subscribe((res: any) => {
        this.trendingtv = res.results;
        resolve();
      })
    );
  }

  loadtoprated():Promise<void> {
    return new Promise((resolve) =>
    this.movieservice.getToprated().subscribe((res: any) => { this.toprated = res.results; 
      resolve();
    })
    );
  }
  
  onSearch() {
    if (this.query.trim()) {
      this.isSearching = true;
      this.movieservice.search(this.query).subscribe((res: any) => {
        this.result = res.results

      });
    }
    else {
      this.isSearching = false;
      this.result = [];
    }
  }

  goToDetails(item: any) {
    if (item.media_type === 'movie') {
      this.router.navigate(['/movie', item.id]);
    } else if (item.media_type === 'tv') {
      this.router.navigate(['/tv', item.id]);
    }
    else if (item.media_type === 'person') {
      this.router.navigate(['/person', item.id]);
    }
  }
  loadIndiaTrendingMovies():Promise<void>{
    return new Promise((resolve) =>
    this.movieservice.getTrendingMovieIndia().subscribe((res: any) => {
      this.indiaTrendingMovies = res.results;
      resolve();
    })
  );
  }

  loadIndiaTrendingTV():Promise<void> {
     return new Promise((resolve) =>
    this.movieservice.getTrendingTvIndia().subscribe((res: any) => {
      this.indiaTrendingTV = res;
      resolve();

    })
  );
  }

  loadIndiaTopRatedMovies():Promise<void> {
     return new Promise((resolve) =>
    this.movieservice.getTopRatedMovieIndia().subscribe((res: any) => {
      this.indiaTopRatedMovies = res.results;
      resolve();

    })
  );
  }

  loadIndiaTopRatedTV():Promise<void> {
     return new Promise((resolve) =>
    this.movieservice.getTopRatedTvIndia().subscribe((res: any) => {
      this.indiaTopRatedTV = res.results;
      resolve();
    })
  );
  }

}
