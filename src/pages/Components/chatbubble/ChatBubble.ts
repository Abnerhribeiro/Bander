import {Component} from '@angular/core';

@Component({
  selector: 'chat-bubble',
  inputs: ['msg: message'],
  template:
    `
  <div class="chatBubble">
    <img class="profile-pic {{msg.position}}" src="{{msg.img}}">
    <div class="chat-bubble {{msg.position}}">
      <div class="message">{{msg.content}}</div>
      <div class="message-detail">
          <span style="font-weight:bold;">{{msg.senderName}} </span>
          <span style="text-align: right;">{{msg.time}}</span>
      </div>
    </div>
  </div>
  `
})

export class ChatBubble {
  msg : any;
  constructor() {
    this.msg = {
      content : '',
      img : '',
      time : '',
      position : 'left'
    }
  }


}
