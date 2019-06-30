import { Component, OnInit, ElementRef, ViewChild, HostListener, AfterViewChecked } from '@angular/core';
import { APP_REDUCERS } from '../_store/app-reducers';
import { FEATURE } from '../_store/features';
import { Store } from '@ngrx/store';
import { APP_ACTIONS } from '../_store/app-actions';
import { NgrxStoreSubscription } from 'ngrx-helpers';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent extends NgrxStoreSubscription implements OnInit, AfterViewChecked {
  data: any = [];
  activeUser: number;
  dataState: string;
  conversation = [];
  // message box content
  message = '';
  @ViewChild('myScrollContainer', { static: false }) private myScrollContainer: ElementRef;
  constructor(private store: Store<any>, private route: ActivatedRoute, private chatService: ChatService) {
    super(store);
  }
  ngOnInit() {
    //getting user id from route params
    this.route.params.subscribe(params => {
      this.activeUser = params['id'];
      this.conversation = this.data ? this.data[this.activeUser - 1] : ''
    });
    // Fetching data from the store
    this.fetchUsersChat();
    this.subscribeUsersChat();
    this.scrollToBottom();
    this.getMsg();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  fetchUsersChat() {
    this.store.dispatch({
      type: APP_ACTIONS.FETCH_DATA
    });
  }
  subscribeUsersChat() {
    super.getState({
      feature: FEATURE.APP,
      reducer: APP_REDUCERS.APP_DATA,
      state: 'appData'
    })
      .subscribe((data) => {
        this.dataState = data.state;
        if (data.state === 'RESOLVED') {
          this.data = data.data.users;
          this.conversation = this.data[this.activeUser - 1];
        }
      });
  }
  getMsg() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        const msg = {
          id: this.activeUser,
          message: {
            'content': message['text'],
            'from': this.activeUser,
            'time': this.getTime()
          }
        };
        this.store.dispatch({
          type: APP_ACTIONS.STORE_MESSAGE_RESOLVED,
          payload: msg
        });
      });
  }
  sendMsg() {

    const msg = {
      id: this.activeUser,
      message: {
        'content': this.message,
        'from': 'me',
        'time': this.getTime()
      }
    }
    this.store.dispatch({
      type: APP_ACTIONS.STORE_MESSAGE_RESOLVED,
      payload: msg
    });
    this.chatService.sendMessage(this.message);
    this.message = '';
    console.log(msg);
  }
  getTime() {
    const today = new Date();
    const h = today.getHours();
    const m = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    return h + ':' + m
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log('scroll element not found');
    }
  }
  //send message when user presses enter
  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.message ? this.sendMsg() : '';
  }
}
