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
    const timestamp = new Date().toISOString().substring(0, 19).replace(/:/g, '')
    const filePath = `productDetails_${timestamp}.txt`

    console.log(`scraping ${numberOfProductsFound} products to ${filePath}`)
    await searchResultsPage.writeProductDetailsToFile(filePath)

    // default number of items shown is 12
    // if more than 12 items, go to next page
    if (numberOfProductsFound > 12) {
      while (!await searchResultsPage.isLastPage()) {
        await searchResultsPage.openNextPage()
        await searchResultsPage.writeProductDetailsToFile(filePath)
      }
    }

    expect(await searchResultsPage.fileExists(filePath)).toBe(true)
  })
})
