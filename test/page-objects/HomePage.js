//@ts-check

import { expect } from "@playwright/test";

export class HomePage {

  /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;
        this.searchField = page.getByPlaceholder("Search books or authors");
        this.searchAutosuggestOptions = page.locator("div#mat-autocomplete-0>mat-option>span");
        this.cartBtn = page.locator("button.mdc-icon-button.mat-mdc-icon-button");
        this.loginBtn = page.locator("button[mattooltip='Login']");
        this.allCategoriesFilter = page.getByText("All Categories");
        this.biographyCategoryFilter = page.locator("//a[contains(text(),'Biography')]");
        this.romanceCategoryFilter = page.locator("//a[contains(text(),'Romance')]");
        this.selectContentFirstResult = page.locator("(//div[@class='p-1 ng-star-inserted'])[1]");
        this.titleOfContentFirstResult = page.locator("div[class='card-title my-2'] a strong");
        this.searchFieldAutoSuggestion = page.locator("(//span[@class='mdc-list-item__primary-text'])");
    }

    async verifyCleanSearchField() {
        await this.searchField.clear();
        await expect(this.searchField).toBeEmpty();
    }

    async verifyTitle() {
        await expect(this.page).toHaveTitle("BookCart");
    }

    async verifyUrl() {
        await expect(this.page).toHaveURL("https://bookcart.azurewebsites.net/");
    }

    async searchBook(title) {
        await this.searchField.fill(title);
        await this.page.keyboard.press("ArrowDown")
        await this.page.keyboard.press("Enter");
    }
    

    async verifySearchAutosuggestOptions(bookTitle) {
        await this.searchField.fill(bookTitle);
        let titles = await this.searchAutosuggestOptions.allTextContents();
        for (let title of titles) {
            expect(title).toContain(bookTitle);
        }
    }

    async clicOnCartBtn() {
        await this.cartBtn.click();
    }

    async selectCategory(category) {
        if (category === "Biography") {
            await this.biographyCategoryFilter.click();
        } else if (category === "Romance") {
            await this.romanceCategoryFilter.click();
        }
        await this.selectContentFirstResult.click();
    }

    async verifySearchResult(title) {
        await expect(this.selectContentFirstResult).toBeVisible();
        await expect(this.titleOfContentFirstResult).toContainText(title);
    }

}