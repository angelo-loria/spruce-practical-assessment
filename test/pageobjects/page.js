import { promises as fs } from 'fs'

/**
 * Base page class including header and footer elements shown across all pages
 */
export default class Page {
    get headerSearchInput () { return $('#search').$('input[name="substring"]') }
    get headerSearchButton () { return $('#search').$('button[type="submit"]') }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async open (path) {
        await browser.url(path)
    }

    /**
     * Searches for items using search bar in header
     * @param {string} keyword keyword to search
     */
    async searchForItem (keyword) {
        await this.headerSearchInput.setValue(keyword)
        await this.headerSearchButton.click()
    }

    async appendFile (filePath, data = '') {
        await fs.appendFile(filePath, data)
    }    
}
