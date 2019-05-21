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
  { path: 'profile/:id', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'creareceta', loadChildren: './creareceta/creareceta.module#CrearecetaPageModule' },
  { path: 'mireceta', loadChildren: './mireceta/mireceta.module#MirecetaPageModule' },
  { path: 'mireceta/:id', loadChildren: './mireceta/mireceta.module#MirecetaPageModule' },
  { path: 'personal-progress', loadChildren: './personal-progress/personal-progress.module#PersonalProgressPageModule' },
  { path: 'graphics', loadChildren: './graphics/graphics.module#GraphicsPageModule' },
  { path: 'data-insert', loadChildren: './data-insert/data-insert.module#DataInsertPageModule' },
  { path: 'ver-receta', loadChildren: './ver-receta/ver-receta.module#VerRecetaPageModule' },
  { path: 'ver-receta/:id', loadChildren: './ver-receta/ver-receta.module#VerRecetaPageModule' },
  { path: 'following', loadChildren: './following/following.module#FollowingPageModule' },
  { path: 'following/:id', loadChildren: './following/following.module#FollowingPageModule' },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
