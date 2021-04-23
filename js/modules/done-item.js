import {DomItems} from '../utils/dom-items.js';
import {DeletedItem} from './deleted-item.js';

export class DoneItem {

  doneBtns = DomItems.getAllDoneBtns();

  constructor() {
    this.setHandler();
  }

  copyParentElem(event) {
    const parentElem = event.target.parentElement;
    return parentElem;
  }

  setHandler() {
    this.doneBtns.forEach(el => el.addEventListener('click', (event) => {
      this.copyParentElem(event)
      console.log(this.copyParentElem(event));
      DeletedItem.removeItemFromLis(event)
    }))
  }

}