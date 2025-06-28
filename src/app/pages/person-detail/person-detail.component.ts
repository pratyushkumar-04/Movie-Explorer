import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent {

  private pendingRequests=2;
  loading:boolean=true;
personName:string='';
person:any;
work:any[]=[];

constructor(private router:Router, private moviesercive:MovieApiService, private route:ActivatedRoute){}
ngOnInit()
{

  const pid:number = +this.route.snapshot.paramMap.get('id')!;
  if(pid){
  this.moviesercive.getPersonCredits(pid).subscribe((res:any)=>{this.work=res.cast;
  if(res.cast.length>0)
  {
    this.personName=res.cast[0].name;
  }
  this.checkLoadingDone();
  this.moviesercive.getPersonDetails(pid).subscribe(data=>{this.person=data});
  this.checkLoadingDone();
});
  }
}

goToDetails(item: any) {
  if (item.media_type === 'movie' || item.title) {
    this.router.navigate(['/movie', item.id]);
  } else if (item.media_type === 'tv' || item.name) {
    this.router.navigate(['/tv', item.id]);
  }
}
checkLoadingDone() {
  this.pendingRequests--;
  if (this.pendingRequests === 0) {
    this.loading = false;
  }
}
}
