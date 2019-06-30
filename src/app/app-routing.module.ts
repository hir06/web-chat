import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

import { from } from 'rxjs';

const routes: Routes = [

  { path: 'chat/:id', component: ChatComponent },
  { path: '',
    redirectTo: '/chat/1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
