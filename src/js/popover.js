export default class Popover {
  constructor(element) {
    this.element = element;
  }

  static get markup() {
    return `
            <div class="popover-header"></div>
            <div class="popover-body"></div>
            <div class="arrow"></div>
        `;
  }

  createPopover() {
    this.popover = document.createElement("div");
    this.popover.classList.add("popover");
    this.popover.innerHTML = Popover.markup;
    this.element.insertAdjacentElement("afterend", this.popover);
    return this.popover;
  }

  show(message, title) {
    if (!this.popover) {
      this.createPopover();

      const popoverTitle = this.popover.querySelector(".popover-header");
      const popoverContent = this.popover.querySelector(".popover-body");
      popoverContent.textContent = message;
      popoverTitle.textContent = title;

      const { left, top, width } = this.element.getBoundingClientRect();
      const popoverWidth = this.popover.offsetWidth;
      const popoverHeight = this.popover.offsetHeight;
      this.popover.style.left = `${left + width / 2 - popoverWidth / 2}px`;
      this.popover.style.top = `${top - popoverHeight - 10}px`;
    }
  }
}
