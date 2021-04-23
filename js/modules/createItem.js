import {DomItems} from '../utils/dom-items.js';
import {Validator} from '../utils/validator.js';

export class Item {

  ADD_NEW_TASK_BTN = DomItems.addNewTaskBtn();
  LIST_TASK_IN_PROGRESS = DomItems.listTaskInProgress();
  INPUT_NEW_TASK = DomItems.inputNewTask();

  constructor() {
    this.setHandler();
  }

  createListElement(value) {
    this.LIST_TASK_IN_PROGRESS.insertAdjacentHTML('beforeend', `
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
    this.INPUT_NEW_TASK.value = '';
  }

  setHandler() {
    this.ADD_NEW_TASK_BTN.addEventListener('click', (e) => {
      e.preventDefault();
      const inputValue = this.INPUT_NEW_TASK.value;
      Validator.checkLengthOfInputValue(inputValue);
      this.createListElement(inputValue);
      this.resetInputValue();
    })
  }
}