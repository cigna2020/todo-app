import {DomItems} from '../utils/dom-items.js';
import {Validator} from '../utils/validator.js';

export class Item {

  addNewTaskBtn = DomItems.getNewTaskBtn();
  listTaskInProgress = DomItems.getListTaskInProgress();
  inputNewTask = DomItems.getInputNewTask();
  listDoneTask = DomItems.getListDoneTask();
  mainBlock = DomItems.getMainBlock();

  constructor() {
    this.setHandler();
  }

  createListItem(value) {
    const newListItem = document.createElement('li');
    newListItem.classList.add('progress-item');
    newListItem.insertAdjacentHTML('beforeend', `
          <label class="label-progress">${value}</label>
          <input type="text" class="progress-input" placeholder="${value}">
          <button class="progress-btn done-btn" id="${Date.now()}" title="mark as done">&#10004;</button>
          <button class="progress-btn delete-task" title="delete task">&#10008;</button>
          <button class="progress-btn" id="edit-task" title="edit your task">&#10002;</button>
          `)
    return newListItem;
  }

  createDoneItem(value) {
    const newListItem = document.createElement('li');
    newListItem.classList.add('progress-item');
    newListItem.append(DomItems.copyChildtElem(value));
    newListItem.insertAdjacentHTML('beforeend', `
          <button class="progress-btn delete-task" title="delete task">&#10008;</button>
          `)
    return newListItem;
  }

  removeItemFromList(event) {
    event.target.parentElement.remove();
  }

  resetInputValue() {
    this.inputNewTask.value = '';
  }

  renderElement(value) {
    DomItems.renderListItem(this.listTaskInProgress, this.createListItem(value));
  }

  renderDoneElement(value) {
    DomItems.renderListItem(this.listDoneTask, this.createDoneItem(value));
  }

  setHandlerDeleteTask() {
    // console.log(this.mainBlock)
    this.mainBlock.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-task')) this.removeItemFromList(e);
    })
  }

  setHandlerAddNewTask() {
    this.addNewTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const inputValue = this.inputNewTask.value;
      Validator.checkLengthOfInputValue(inputValue);
      this.renderElement(inputValue);
      this.resetInputValue();
    })
  }

  setHandlerMakeTaskDone() {
    this.listTaskInProgress.addEventListener('click', (e) => {
      if (e.target.classList.contains('done-btn')) {
        this.removeItemFromList(e);
        this.renderDoneElement(e)
      };
    })
  }

  setHandler() {
    this.setHandlerAddNewTask();
    this.setHandlerMakeTaskDone();
    this.setHandlerDeleteTask();
  }
}