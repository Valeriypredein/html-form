import puppeteer from "puppeteer";
import { fork } from "child_process";

// Устанавливаем общий таймаут для всех тестов в файле
jest.setTimeout(30000);

describe("FormWidget E2E Tests", () => {
  let browser;
  let page;
  let serverProcess;
  const baseUrl = "http://localhost:8080";

  beforeAll(async () => {
    // Запускаем серверное приложение
    serverProcess = fork("e2e/e2e.server.js");

    const isCI = process.env.CI === "true";
    browser = await puppeteer.launch({
      headless: isCI,
      slowMo: isCI ? 0 : 200,
      args: isCI ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
      // Аргументы для CI/CD
    });
    page = await browser.newPage(); // Создаем новую страницу
  });

  afterAll(async () => {
    await browser.close();
    serverProcess.kill();
  });

  
  test("should toggle popover on button click", async () => {
    await page.goto("http://localhost:8080");

    // Ожидаем, пока кнопка не станет доступной
    await page.waitForSelector(".btn-popover");

    // Кликаем по кнопке, чтобы показать поповер
    await page.click(".btn-popover");

    // Ожидаем, пока поповер не станет видимым
    await page.waitForSelector(".popover", { visible: true });

    // Проверяем содержимое поповера
    const popoverContent = await page.$eval(".popover", (el) => el.textContent);
    expect(popoverContent).toContain(
      "And here's some amazing content. It's very engaging. Right?",
    );
    expect(popoverContent).toContain("Title");

    // Кликаем по кнопке снова, чтобы скрыть поповер
    await page.click(".btn-popover");

    // Ожидаем, пока поповер не исчезнет
    await page.waitForSelector(".popover", { hidden: true });
  });
});
