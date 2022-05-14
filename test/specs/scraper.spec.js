import homePage from '../pageobjects/home.page'
import searchResultsPage from '../pageobjects/searchResults.page'

describe('product search and scrape', () => {
  it('searches for product', async () => {
    await homePage.open()
    await homePage.searchForItem('product')
    await expect(searchResultsPage.productGrid).toBeDisplayed()
  })

  it('scrapes search results', async () => {
    const numberOfProductsFound = await searchResultsPage.getNumberOfProductsFound()

    // default number of items displayed === 12
    if (await numberOfProductsFound > 12) {
      await searchResultsPage.updateNumberOfProductsDisplayed(96)
    }

    const timestamp = new Date().toISOString().substring(0, 19).replace(/:/g, '')
    const filePath = `productDetails_${timestamp}.txt`
    console.log(`scraping ${numberOfProductsFound} products to ${filePath}`)
    await searchResultsPage.writeProductDetailsToFile(filePath)
  })
})
