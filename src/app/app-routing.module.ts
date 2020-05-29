import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component'
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';

/*
Routing Module:
Has three routes,
1) /          - default which is the ContactList View
2) /add       - which goes to the ContactAdd View
3) /update    - to update an existing Contact
*/

const routes: Routes = [
  { path : '', component: ContactListComponent },
  { path : 'add', component: ContactAddComponent },
  { path : 'update', component: ContactUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
