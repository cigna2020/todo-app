export class DomItems {

  static getListTaskInProgress() {
    return document.getElementById('list-progress');
  }

  static getListDoneTask() {
    return document.getElementById('list-done');
  }

  static getInputNewTask() {
    return document.getElementById('input-new-task');
  }

  static getNewTaskBtn() {
    return document.getElementById('add-btn');
  }

  static getAllDoneBtns() {
    return document.querySelectorAll('done-btn');
  }

  static renderListItem(parentElem, childElem) {
    parentElem.append(childElem);
  }
}