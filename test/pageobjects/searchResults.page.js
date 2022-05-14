import Page from './page'

class SearchResultsPage extends Page {
  get bottomPager () { return $('.list-pager.list-pager-bottom') }
  get nextPageButton () { return this.bottomPager.$$('a[title="Next page"]') }
  get numberOfProducts () { return $('.pager-items-range').$('.records-count') }
  get productElements () { return this.productGrid.$$('.product-cell.box-product') }
  get productGrid () { return $('.products-grid.grid-list') }

  async open () {
    await super.open('/?target=search&mode=search&including=all')
  }

  /**
     * Gets name, price, url attributes from product element and creates object
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

  async isLastPage () {
    return (await this.nextPageButton).length === 0
  }

  async openNextPage () {
    await browser.setupInterceptor()
    await this.nextPageButton[0].click()
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
