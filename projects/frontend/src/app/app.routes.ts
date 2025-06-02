import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'makolab',
    pathMatch: 'full',
    //component: AppComponent
  },
  {
    path: 'makolab',
    loadChildren: () =>
        import('./../modules/makolab/makolab.routes')
            .then(m => m.makolabRoutes)
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
