import { promises as fs } from 'fs'

/**
 * Base page class including header and footer elements shown across all pages
 */
export default class Page {
  get headerSearchInput () { return $('#search').$('input[name="substring"]') }
  get headerSearchButton () { return $('#search').$('button[type="submit"]') }

  async appendFile (filePath, data = '') {
    await fs.appendFile(filePath, data)
  }

  async fileExists (filePath) {
    return (await fs.stat(filePath)).isFile()
  }

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
}
