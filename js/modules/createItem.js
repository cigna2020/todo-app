import {DomItems} from '../utils/dom-items.js'

export class Item {

  ADD_NEW_TASK_BTN = DomItems.addNewTaskBtn();
  LIST_TASK_IN_PROGRESS = DomItems.listTaskInProgress();
  INPUT_NEW_TASK = DomItems.inputNewTask();

  constructor() {
    this.setHandler();
  }

  createListElement(value) {
    let newTaskItem = document.createElement('li');
    this.LIST_TASK_IN_PROGRESS.append(newTaskItem);
    newTaskItem.classList.add('progress-item');
    newTaskItem.innerHTML = `
          <label class="label-progress">${value}</label>
          <input type="text" class="progress-input" placeholder="${value}">
          <button class="progress-btn" id="done-task" title="mark as done">&#10004;</button>
          <button class="progress-btn" id="delete-task" title="delete task">&#10008;</button>
          <button class="progress-btn" id="edit-task" title="edit your task">&#10002;</button>
          `
  }

  checkLengthOfInputValue(value) {
    const lengthOfValue = (value.length < 80 && value.trim().length > 0);
    if (!lengthOfValue) throw new Error('The value is incorrect.')
  }

  resetInputValue() {
    this.INPUT_NEW_TASK.value = '';
  }

  setHandler() {
    this.ADD_NEW_TASK_BTN.addEventListener('click', (e) => {
      e.preventDefault();
      const inputValue = this.INPUT_NEW_TASK.value;
      this.checkLengthOfInputValue(inputValue);
      this.createListElement(inputValue);
      this.resetInputValue();
    })
  }
}