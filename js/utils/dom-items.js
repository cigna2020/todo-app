export class DomItems {

  static getMainBlock() {
    return document.getElementById('main-block');
  }

  static getBlockTaskInProgress() {
    return document.getElementById('progress-wrapper');
  }

  static getBlockDoneTask() {
    return document.getElementById('done-wrapper');
  }

  static getListTaskInProgress() {
    return document.getElementById('progress-list-id');
  }

  static getListDoneTask() {
    return document.getElementById('list-done-id');
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

  static getChildElem(e, tagName) {
    return e.target.parentElement.getElementsByTagName(tagName);
  }

  static renderListItem(parentElem, childElem) {
    parentElem.append(childElem);
  }

  // static copyChildtElem(e) {
  //   const childElem = e.target.parentElement.getElementsByTagName('label')[0];
  //   return childElem;
  // }
}