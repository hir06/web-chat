import { Component, OnInit } from '@angular/core';
import { APP_REDUCERS } from './_store/app-reducers';
import { FEATURE } from './_store/features';
import { Store } from '@ngrx/store';
import { APP_ACTIONS } from './_store/app-actions';
import { NgrxStoreSubscription, DATA_STATE } from 'ngrx-helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends NgrxStoreSubscription implements OnInit {
  title = 'Chat Web';
  dataState: string;
  usersList: any;
  lastMsg: any;
  activeUser = 1;
  constructor(private store: Store<any>,
    private router: Router) {
    super(store);
  }


  ngOnInit() {
    // Fetching data from the API for questions
    this.store.dispatch({
      type: APP_ACTIONS.FETCH_DATA
    });
    super.getState({
      feature: FEATURE.APP,
      reducer: APP_REDUCERS.APP_DATA,
      state: 'appData'
    }).subscribe((data) => {
      this.dataState = data.state;
      if (data.state == 'RESOLVED') {
        this.usersList = data.data.users;
      }
    });
  }
  loadChatWindow(id) {
    this.activeUser = id;
    this.router.navigate(['/chat/', id])
  }

}
