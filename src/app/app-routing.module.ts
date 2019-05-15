import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'creareceta', loadChildren: './creareceta/creareceta.module#CrearecetaPageModule' },
  { path: 'personal-progress', loadChildren: './personal-progress/personal-progress.module#PersonalProgressPageModule' },
  { path: 'graphics', loadChildren: './graphics/graphics.module#GraphicsPageModule' },
  { path: 'data-insert', loadChildren: './data-insert/data-insert.module#DataInsertPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
