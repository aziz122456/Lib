import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookDeleteComponent } from './components/book-delete/book-delete.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'book-search', component: BookSearchComponent },
  { path: 'book-add', component: BookAddComponent },
  { path: 'book-delete', component: BookDeleteComponent },
  { path: 'cart-list', component: CartListComponent },
  { path: 'cart-list', component: CartListComponent },
  { path: 'user', component: UserComponent },

  { path: 'order-list', component: OrderListComponent },
  { path: '', redirectTo: '/test', pathMatch: 'full' }, // Redirect to Test Component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
