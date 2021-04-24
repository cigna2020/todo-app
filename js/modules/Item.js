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
          <input type="text" class="progress-input display-none" value="${value}">
          <button class="progress-btn done-btn" id="${Date.now()}" title="mark as done">&#10004;</button>
          <button class="progress-btn delete-task" title="delete task">&#10008;</button>
          <button class="progress-btn edit-task" title="edit your task">&#10002;</button>
          <button class="progress-btn save-task display-none" title="save your task">Save</button>
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

  removeItemFromList(e) {
    e.target.parentElement.remove();
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

  static toggleDisplayNone(element) {
    element.classList.toggle('display-none');
  }

  editElement(e) {
    const btns = Array.from(DomItems.getChildElem(e, 'button'));
    const inputElem = DomItems.getChildElem(e, 'input')[0];
    const labelElem = DomItems.getChildElem(e, 'label')[0];

    btns.forEach(btn => Item.toggleDisplayNone(btn));
    Item.toggleDisplayNone(inputElem);
    Item.toggleDisplayNone(labelElem);
  }

  saveEditedElement(e) {
    const btns = Array.from(DomItems.getChildElem(e, 'button'));
    const inputElem = DomItems.getChildElem(e, 'input')[0];
    const labelElem = DomItems.getChildElem(e, 'label')[0];

    Validator.checkLengthOfInputValue(inputElem.value);
    labelElem.textContent = `${inputElem.value}`;

    btns.forEach(btn => Item.toggleDisplayNone(btn));
    Item.toggleDisplayNone(inputElem);
    Item.toggleDisplayNone(labelElem);


  }

  setHandlerEditTask() {
    this.mainBlock.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-task')) this.editElement(e);
      if (e.target.classList.contains('save-task')) this.saveEditedElement(e);
    });
  }

  setHandlerDeleteTask() {
    this.mainBlock.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-task')) {
        this.removeItemFromList(e);
      };
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
    this.setHandlerEditTask();
  }
}