import {DomItems} from '../utils/dom-items.js';
import {Validator} from '../utils/validator.js';

export class Item {

  addNewTaskBtn = DomItems.getNewTaskBtn();
  listTaskInProgress = DomItems.getListTaskInProgress();
  inputNewTask = DomItems.getInputNewTask();

  constructor() {
    this.setHandler();
  }

  createListElement(value) {
    this.listTaskInProgress.insertAdjacentHTML('beforeend', `
          <li class="progress-item">
          <label class="label-progress">${value}</label>
          <input type="text" class="progress-input" placeholder="${value}">
          <button class="progress-btn" id="done-task" title="mark as done">&#10004;</button>
          <button class="progress-btn" id="delete-task" title="delete task">&#10008;</button>
          <button class="progress-btn" id="edit-task" title="edit your task">&#10002;</button>
          </li>
          `)
  }

  resetInputValue() {
    this.inputNewTask.value = '';
  }

  setHandler() {
    this.addNewTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const inputValue = this.inputNewTask.value;
      Validator.checkLengthOfInputValue(inputValue);
      this.createListElement(inputValue);
      this.resetInputValue();
    })
  }
}