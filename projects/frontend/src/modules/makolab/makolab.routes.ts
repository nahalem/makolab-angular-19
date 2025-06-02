import { RouterModule, Routes } from "@angular/router";
import { MainViewComponent } from "./components/pages/main-view/main-view.component";
import { NgModule } from "@angular/core";

export const makolabRoutes: Routes = [
    {
      path: '',
      // redirectTo: 'main-view',
      pathMatch: 'full',
      component: MainViewComponent
    },
    // {
    //   path: 'rxjs-main-view',
    //   loadComponent: () => import('./components/rxjs-main-view/rxjs-main-view.component').then((mod) =>mod.RxjsMainViewComponent),
    // },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(makolabRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
