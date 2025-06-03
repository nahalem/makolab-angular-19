import { RouterModule, Routes } from "@angular/router";
import { MainViewComponent } from "./components/pages/main-view/main-view.component";
import { NgModule } from "@angular/core";

export const makolabRoutes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: MainViewComponent
    },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(makolabRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
