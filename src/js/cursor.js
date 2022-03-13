export default class Cursor {
  constructor(document) {
    this.document = document;
    this.cursor = null;
  }

  start() {
    this.cursor = document.getElementsByClassName('cursor');
    this.document.addEventListener('mousemove', (event) => {
      const x = event.clientX;
      const y = event.clientY;
      this.cursor[0].style.left = `${x}px`;
      this.cursor[0].style.top = `${y}px`;
    });
  }
}
