import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {NgrxHelperModule} from 'ngrx-helpers';
import {rootReducers, metaReducers} from './_store/meta-reducers';
import {FEATURE} from './_store/features';
import {appReducers} from './_store/app-reducers';
import {appEffects} from './_store/app-effects';
import {HttpClientModule} from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {environment} from '../environments/environment.prod';
import {ChatService} from './service/chat.service';
import {WebsocketService} from './service/websocket.service';
import { FilterPipe} from './filter.pipe';
import { filter } from 'minimatch';




@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    FilterPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(rootReducers, { metaReducers }),
    StoreModule.forFeature(FEATURE.APP, appReducers),
    EffectsModule.forRoot(appEffects),
    NgrxHelperModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store DevTools',
      logOnly: environment.production,
    }),

  ],
  providers: [
    ChatService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
