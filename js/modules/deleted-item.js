export class DeletedItem {

  static removeItemFromLis(event) {
    event.target.parentElement.remove();
  }
}