import { StoreUtil, DATA_STATE, NgrxObject} from 'ngrx-helpers';
import { APP_ACTIONS } from '../app-actions';
import clonedeep from 'lodash.clonedeep';
import { isNgTemplate } from '@angular/compiler';
export interface AppState {
  readonly appData: NgrxObject<any>;
  readonly ansData: NgrxObject<any>;
}

export const defaultAppState: AppState = {
  appData: {
    data: {
      "users" : []
    },
    state: DATA_STATE.INITIAL,
  },
  ansData: {
    data: {},
    state: DATA_STATE.INITIAL
  }
};

export function appDataReducer(state = defaultAppState, action) {
  switch (action.type) {
    case APP_ACTIONS.FETCH_DATA_RESOLVING:
      return StoreUtil.setResolving(state, 'appData', {});

    case APP_ACTIONS.FETCH_DATA_RESOLVED:
      return StoreUtil.setResolved(state, 'appData', action.payload.data);

    case APP_ACTIONS.FETCH_DATA_ERROR:
      return StoreUtil.setError(state, 'appData', action.payload.data);

    case APP_ACTIONS.STORE_MESSAGE_RESOLVED:
      let users = clonedeep(state);
      const {id,message} = action["payload"]
      users = users.appData.data.users.map((item) => {
        if(item.id === parseInt(id)) {
          item.messages.push(message);
        }
        return item;
      })
      return StoreUtil.setResolved(state, 'appData', {users: users});

    case APP_ACTIONS.STORE_MESSAGE_RESOLVING:
        return StoreUtil.setResolving(state, 'appData', {});
    default:
      return state;
  }
}
