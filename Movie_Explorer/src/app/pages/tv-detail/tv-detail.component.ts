import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.css']
})
export class TvDetailComponent {

  constructor(private sanitizer:DomSanitizer, private route:ActivatedRoute,private movieservice:MovieApiService){}

  tvDetails:any;
  tvcast:any[]=[];
  tvVideos:any[]=[];
  providers:any[]=[];
  watchlink:string='';

  loading:boolean=true;
  private pendingRequests=3;

  safeVideoUrl!: SafeResourceUrl;

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id')!;
  if(id)
  {
    this.loading=true;
  
  this.getTvDetails(id);
  this.getcast(id);
  this.getTrailerTv(id);
  this.watchShow(id);
  }
  
}

  getTvDetails(id:string)
  {
    this.movieservice.getTVDetails(id).subscribe(res => {
    this.tvDetails = res;
    this.checkLoadingDone()
  });
  }

  getcast(id:string)
  {
    this.movieservice.getcreditsTv(id).subscribe((res:any)=>{
      this.tvcast=res.cast.slice(0,10);
      this.checkLoadingDone();
    })
  }

  watchShow(id:string)
  {
     this.movieservice.getwatchprovidersTV(id).subscribe((res: any) => {
    const countryData = res.results?.IN; 
    if (countryData?.flatrate) {
      this.providers = countryData.flatrate;
            this.watchlink = countryData.link;
    }
    });
  }

  getTrailerTv(id: string): void {
  this.movieservice.getvideosTv(id).subscribe((res: any) => {

        console.log('Trailer API response:', res); // 👈 Add this line

    this.tvVideos = res.results;

    const trailer = this.tvVideos.find(
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
