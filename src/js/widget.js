import Popover from "./popover";

export default class FormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.bindToDOM();
  }

  static get markup() {
    return `
        <form class="form-widget">
            <button class="btn-popover">Click to toggle popover</button>
        </form>
        `;
  }

  static get btnSelector() {
    return ".btn-popover";
  }

  static get formSelector() {
    return ".form-widget";
  }

  bindToDOM() {
    this.parentEl.innerHTML = FormWidget.markup;
    this.element = this.parentEl.querySelector(FormWidget.formSelector);
    this.btn = this.element.querySelector(FormWidget.btnSelector);
    this.onClick();
  }

  onClick() {
    this.btn.addEventListener("click", (e) => {
      e.preventDefault();
      const popover = new Popover(this.btn);
      let popoverEl = document.querySelector(".popover");
      if (!popoverEl) {
        popover.show("And here's some amazing content. It's very engaging. Right?", "Title");
      } else {
        popoverEl.remove();
      }
    });
  }
}
