import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { TvDetailComponent } from './pages/tv-detail/tv-detail.component';
import { PersonDetailComponent } from './pages/person-detail/person-detail.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'movie/:id',component:MovieDetailComponent},
  {path:'tv/:id',component:TvDetailComponent},
  {path:'person/:id',component:PersonDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
