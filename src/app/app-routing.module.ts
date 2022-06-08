import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'log-user',
    pathMatch: 'full',
  },
  // {
  //   path: 'sign-in',
  //   loadChildren: () =>
  //     import('./auth/sign-in/sign-in.module').then((m) => m.SignInPageModule),
  //   // canActivate: [AuthGuard],
  // },
  // {
  //   path: 'sign-up',
  //   loadChildren: () =>
  //     import('./auth/sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  //   // canActivate: [AuthGuard],
  // },
  {
    path: 'log-user',
    loadChildren: () =>
      import('./auth/log-user/log-user.module').then(
        (m) => m.LogUserPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
