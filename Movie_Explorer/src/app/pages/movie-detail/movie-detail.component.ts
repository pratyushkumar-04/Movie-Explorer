import { Component , OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {

  movieId!:string;
  moviedetails:any;
  movieVideos:any[]=[];
  cast:any[]=[];
  providers:any[]=[];
  watchlink:string='';

  safeVideoUrl!: SafeResourceUrl;

  private pendingRequests = 3;

  constructor(private sanitizer:DomSanitizer,private route:ActivatedRoute, private movieservice: MovieApiService) { }

  loading:boolean=true;

  ngOnInit():void{
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    if(this.movieId)
    {
      this.loading=true;
      this.getdetails(this.movieId);
      this.getTrailer(this.movieId);
      this.getcast(this.movieId);
      this.watchMovie(this.movieId);
    }

  }

  getdetails(id:string)
  {
    this.movieservice.getdata(id).subscribe((data)=>{this.moviedetails=data;
      this.checkLoadingDone();
      
    })
  }

  getcast(id:string)
  {
    this.movieservice.getcredits(id).subscribe((data:any)=>{this.cast=data;
      this.cast = data.cast.slice(0, 10);// top 10 cast members
      this.checkLoadingDone(); 

    })
  }

  watchMovie(id:string)
  {
      this.movieservice.getWatchProviders(id).subscribe((res: any) => {
    const countryData = res.results?.IN; 
    if (countryData?.flatrate) {
      this.providers = countryData.flatrate;
      this.watchlink = countryData.link;

    }
  });

  }

  getTrailer(id: string): void {
  this.movieservice.getvideos(id).subscribe((res: any) => {
    this.movieVideos = res.results;

    const trailer = this.movieVideos.find(
      (v: any) => v.site === 'YouTube' && v.type === 'Trailer'
    );

    if (trailer) {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + trailer.key
      );
    } else {
      console.warn('No YouTube trailer found for this movie.');
    }
    this.checkLoadingDone();
  });
}

checkLoadingDone() {
  this.pendingRequests--;
  if (this.pendingRequests === 0) {
    this.loading = false;
  }
}
}
