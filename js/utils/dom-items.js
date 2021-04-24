export class DomItems {

  static getMainBlock() {
    return document.getElementById('main-block');
  }

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

  static copyChildtElem(event) {
    const childElem = event.target.parentElement.getElementsByTagName('label')[0];
    return childElem;
  }
}