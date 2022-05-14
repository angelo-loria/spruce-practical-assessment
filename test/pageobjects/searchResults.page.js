import Page from './page'

class SearchResultsPage extends Page {
  get numberOfProducts () { return $('.pager-items-range').$('.records-count') }
  get perPageValue () { return $('.per-page-box').$('.per-page-value') }
  get perPageValueList () { return $('.display-per-page.grid-list') }
  get productGrid () { return $('.products-grid.grid-list') }
  get productElements () { return this.productGrid.$$('.product-cell.box-product') }

  async open () {
    await super.open('/?target=search&mode=search&including=all')
  }

  /**
     * Gets name, price, and url attributes from product element
     * @param {Promise<WebdriverIO.Element>} productElement
     * @returns Object containing product name, price, and url
     */
  async createProductObject (productElement) {
    const product = {
      name: await productElement.$('.product-name').getText(),
      price: await productElement.$('.price.product-price').getText(),
      url: browser.options.baseUrl +
                '/' + await productElement.$('.product-thumbnail').getAttribute('href')
    }
    return product
  }

  async getNumberOfProductsFound () {
    return await this.numberOfProducts.getText()
  }

  /**
     * Updates number of products displayed on page, waits for update request to complete
     * @param {number} numberOfProducts
     */
  async updateNumberOfProductsDisplayed (numberOfProducts) {
    await browser.setupInterceptor()
    await this.perPageValue.moveTo()
    await this.perPageValueList.$(`li=${numberOfProducts}`).click()
    await browser.waitUntil(async () =>
      await browser.hasPendingRequests() === false
    )
  }

  /**
     * Creates array of product objects, writes array to txt file
     * @param {string} filePath
     */
  async writeProductDetailsToFile (filePath) {
    const productArray = []
    for (const element of await this.productElements) {
      productArray.push(await this.createProductObject(await element))
    }
    await super.appendFile(filePath, JSON.stringify(productArray, null, 2))
  }
}

export default new SearchResultsPage()
