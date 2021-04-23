import {DomItems} from '../utils/dom-items.js';
import {DeletedItem} from './deleted-item.js';

export class DoneItem {

  doneBtns = DomItems.getAllDoneBtns();
  listTaskInProgress = DomItems.getListTaskInProgress();


  constructor() {
    this.setHandler();
  }

  copyParentElem(event) {
    const parentElem = event.target.parentElement;
    return parentElem;
  }

  setHandler() {

    this.listTaskInProgress.addEventListener('click', (e) => {
      if (e.target.classList.contains('done-btn')) {
        this.copyParentElem(e)
        console.log(this.copyParentElem(e));
        DeletedItem.removeItemFromLis(e)
      };
    })
  }

}