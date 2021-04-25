import {DomItems} from '../utils/dom-items.js';
import {Validator} from '../utils/validator.js';

export class Item {

  storage = [];

  addNewTaskBtn = DomItems.getNewTaskBtn();
  blockTaskInProgress = DomItems.getBlockTaskInProgress();
  listTaskInProgress = DomItems.getListTaskInProgress();
  inputNewTask = DomItems.getInputNewTask();
  listDoneTask = DomItems.getListDoneTask();
  mainBlock = DomItems.getMainBlock();
  blockDoneTask = DomItems.getBlockDoneTask();
  allLiElements = DomItems.getAllLiElements();
  iputFilter = DomItems.getInputFilter();

  constructor() {
    this.setHandler();
  }

  addNewItemInStorage(value) {
    this.storage.push({text: `${value}`, id: `${Date.now()}`, done: false});
  }

  createListItem() {
    this.listTaskInProgress = DomItems.getListTaskInProgress();
    if (this.listTaskInProgress) this.listTaskInProgress.remove()
    const newListItem = document.createElement('ul');
    newListItem.classList.add('list-progress');
    newListItem.id = 'progress-list-id';
    for (const item of this.storage) {
      if (!item.done) {
        newListItem.insertAdjacentHTML('beforeend', `
          <li class= "progress-item teg-li">
              <label class="label-progress">${item.text}</label>
              <input type="text" class="progress-input display-none" value="${item.text}">
              <button class="progress-btn done-btn" id="${item.id}" title="mark as done">&#10004;</button>
              <button class="progress-btn delete-task" title="delete task" data-btnid="${item.id}">&#10008;</button>
              <button class="progress-btn edit-task" title="edit your task">&#10002;</button>
              <button class="progress-btn save-task display-none" data-btnid="${item.id}" title="save your task">Save</button>
          </li>
        `);
      }
    }
    return newListItem;
  }

  createDoneItem() {
    this.listDoneTask = DomItems.getListDoneTask();
    if (this.listDoneTask) this.listDoneTask.remove();
    const newListItem = document.createElement('ul');
    newListItem.classList.add('list-done');
    newListItem.id = 'list-done-id';
    for (const item of this.storage) {
      if (item.done) {
        newListItem.insertAdjacentHTML('beforeend', `
          <li class="done-item teg-li">
           <label class="label-progress">${item.text}</label>
           <button button class= "progress-btn delete-task" title = "delete task" data-btnid="${item.id}">&#10008;</button >
          </li>
        `)
      }
    }
    return newListItem;
  }

  removeItemFromList(e) {
    e.target.parentElement.remove();
    for (const item of this.storage) {
      if (item.id === e.target.dataset.btnid) {
        const indexOfItem = this.storage.indexOf(item);
        this.storage.splice(indexOfItem, 1);
      }
    }
  }

  resetInputValue() {
    this.inputNewTask.value = '';
  }

  renderElement(value) {
    this.addNewItemInStorage(value);
    DomItems.renderListItem(this.blockTaskInProgress, this.createListItem());
  }

  renderDoneElement() {
    DomItems.renderListItem(this.blockDoneTask, this.createDoneItem());
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

    btns.forEach(btn => {
      Item.toggleDisplayNone(btn);
      for (const item of this.storage) {
        if (item.id === btn.dataset.btnid) item.text = inputElem.value;
      }
    });
    Item.toggleDisplayNone(inputElem);
    Item.toggleDisplayNone(labelElem);
  }

  hideListOfElements() {
    this.mainBlock.addEventListener('click', (e) => {
      if (e.target.id === 'hide-progress') {
        this.listTaskInProgress = DomItems.getListTaskInProgress();
        if (this.listTaskInProgress !== null) Item.toggleDisplayNone(this.listTaskInProgress);
      }
      if (e.target.id === 'hide-done') {
        this.listDoneTask = DomItems.getListDoneTask();
        if (this.listDoneTask !== null) Item.toggleDisplayNone(this.listDoneTask);
      }
    });
  }

  sortElements() {
    this.storage.sort((a, b) => {
      const textA = a.text.toUpperCase();
      const textB = b.text.toUpperCase();
      if (textA < textB) return -1;
      if (textA > textB) return 1;
      return 0;
    });
    this.createListItem();
    this.createDoneItem();
    this.renderDoneElement();
    DomItems.renderListItem(this.blockTaskInProgress, this.createListItem());
  }

  filterElements(e) {
    this.allLiElements = DomItems.getAllLiElements();
    this.allLiElements.forEach(liElem => {
      const labelELem = liElem.getElementsByTagName('label');
      if (!labelELem[0].innerText.includes(e.target.value)) liElem.classList.add('display-none');
      else liElem.classList.remove('display-none')
    })
  }

  setHandlerFilterElements() {
    this.iputFilter.addEventListener('input', (e) => {
      this.filterElements(e);
    })
  }

  setHandlerSortElements() {
    this.mainBlock.addEventListener('click', (e) => {
      if (e.target.classList.contains('sort-btn')) this.sortElements();
    })
  }

  setHandlerEditTask() {
    this.mainBlock.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-task')) this.editElement(e);
      if (e.target.classList.contains('save-task')) this.saveEditedElement(e);
    });
  }

  setHandlerDeleteTask() {
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
    this.blockTaskInProgress.addEventListener('click', (e) => {
      if (e.target.classList.contains('done-btn')) {
        for (const item of this.storage) {
          if (item.id === e.target.id) item.done = true;
        }
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
    this.hideListOfElements();
    this.setHandlerSortElements();
    this.setHandlerFilterElements();
  }
}