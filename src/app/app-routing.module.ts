// https://www.c-sharpcorner.com/article/introduction-to-routing-in-angular-8/
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {PlaygroundComponent} from './playground/playground.component';

const routes: Routes = [
  {path: 'playground', component: PlaygroundComponent},
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
