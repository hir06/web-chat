import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import {APP_ACTIONS} from '../app-actions';
import { NgrxEffect, HttpMethod } from 'ngrx-helpers';
import {ENDPOINT} from '../endpoints';

@Injectable()
export class AppEffects extends NgrxEffect {
  constructor(
    action$: Actions,
    httpClient: HttpClient
  ) {
    super(action$, httpClient);
  }

  @Effect() fetchAppData = super.effect({
    action: APP_ACTIONS.FETCH_DATA,
    type: HttpMethod.GET,
    endpoint: ENDPOINT.GET_DATA,
  });

}
