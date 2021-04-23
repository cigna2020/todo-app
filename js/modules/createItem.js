import {LIST_TASK_IN_PROGRESS} from './consts.js';
import {INPUT_NEW_TASK} from './consts.js';
import {ADD_NEW_TASK_BTN} from './consts.js';

export class CreateItem {

  constructor() {
    this.setHandler()
  }

  static createListElement(value) {
    let newTaskItem = document.createElement('li');
    LIST_TASK_IN_PROGRESS.append(newTaskItem);
    newTaskItem.classList.add('progress-item');
    newTaskItem.innerHTML = `
          <label class="label-progress">${value}</label>
          <input type="text" class="progress-input" placeholder="${value}">
          <button class="progress-btn" id="done-task" title="mark as done">&#10004;</button>
          <button class="progress-btn" id="delete-task" title="delete task">&#10008;</button>
          <button class="progress-btn" id="edit-task" title="edit your task">&#10002;</button>
          `
  }

  static checkLengthOfInputValue(value) {
    const lengthOfValue = (value.length < 80 && value.trim().length > 0);
    if (!lengthOfValue) throw new Error('The value is incorrect.')
  }

  static resetInputValue() {
    INPUT_NEW_TASK.value = '';
  }

  setHandler() {
    ADD_NEW_TASK_BTN.addEventListener('click', (e) => {
      e.preventDefault();
      const inputValue = INPUT_NEW_TASK.value;
      // console.log(INPUT_NEW_TASK.value)
      CreateItem.checkLengthOfInputValue(inputValue);
      CreateItem.createListElement(inputValue);
      CreateItem.resetInputValue();
    })
  }
}