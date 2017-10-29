import {Component} from '@angular/core';

@Component({
  selector: 'pic-bubble',
  inputs: ['icon: pic'],
  template:
    `
  <div class="chatBubble">
    <img class="picBubble" src="{{icon.img}}">
  </div>
  `
})

export class PicBubble {
  icon : any;
  constructor() {
    this.icon = {
      pic :  'Am I dreaming?'
    }
  }


}
