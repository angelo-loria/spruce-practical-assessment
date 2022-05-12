/**
 * Base page class containing functionality shared across all pages
 */
export default class Page {
    get headerSearchInput () { return $('#search').$('input[name="substring"]') }
    get headerSearchButton () { return $('#search').$('button[type="submit"]') }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async open (path) {
        return await browser.url(path)
    }

    async searchForItem (keyword) {
        await this.headerSearchInput.setValue(keyword)
        await this.headerSearchButton.click()
    }
}
