import {DomItems} from '../utils/dom-items.js';
import {DeletedItem} from './deleted-item.js';

export class DoneItem {

  listTaskInProgress = DomItems.getListTaskInProgress();
  listDoneTask = DomItems.getListDoneTask();

  constructor() {
    this.setHandler();
  }

  static copyChildtElem(event) {
    const childElem = event.target.parentElement.getElementsByTagName('label')[0];
    return childElem;
  }

  createListItem(value) {
    const newListItem = document.createElement('li');
    newListItem.classList.add('progress-item');
    newListItem.append(DoneItem.copyChildtElem(value));
    newListItem.insertAdjacentHTML('beforeend', `
          <button class="progress-btn" id="delete-task" title="delete task">&#10008;</button>
          `)
    return newListItem;
  }

  renderElement(value) {

    DomItems.renderListItem(this.listDoneTask, this.createListItem(value));

  }

  setHandler() {

    this.listTaskInProgress.addEventListener('click', (e) => {
      if (e.target.classList.contains('done-btn')) {
        // console.log(e.target)
        // DoneItem.copyParentElem(e)
        DeletedItem.removeItemFromLis(e);
        this.renderElement(e)
      };
    })
  }

}