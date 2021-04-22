import {listTasksInProgress} from './consts.js';
import {inputNewTask} from './consts.js';
import {addNewTaskBtn} from './consts.js';

export class CreateItem {

  constructor() {
    this.setHandler()
  }

  static createListElement(value) {
    let newTaskItem = document.createElement('li');
    listTasksInProgress.append(newTaskItem);
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
    inputNewTask.value = '';
  }

  setHandler() {
    addNewTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const inputValue = inputNewTask.value;
      // console.log(inputNewTask.value)
      CreateItem.checkLengthOfInputValue(inputValue);
      CreateItem.createListElement(inputValue);
      CreateItem.resetInputValue();
    })
  }
}