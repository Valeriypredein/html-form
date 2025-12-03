import FormWidget from "../widget";

test("widget should render", () => {
  document.body.innerHTML = '<div class="container"></div>';
  const container = document.querySelector(".container");
  const widget = new FormWidget(container);

  widget.bindToDOM();

  expect(container.innerHTML).toEqual(FormWidget.markup);
});

test("widget should show popover", async () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector(".container");
  const widget = new FormWidget(container);

  widget.bindToDOM();

  widget.btn.click();

  await new Promise((resolve) => setTimeout(resolve, 100));

  const popover = container.querySelector(".popover");
  expect(popover).toBeTruthy();
});
