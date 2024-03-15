import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';
import { ListRecipeComponent } from './components/list-recipe/list-recipe.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListRecipeComponent
  },
  {
    path: 'add',
    component: AddEditRecipeComponent
  },
  {
    path: 'edit/:id',
    component: AddEditRecipeComponent
  },
  {
    path: 'view/:id',
    component: AddEditRecipeComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
