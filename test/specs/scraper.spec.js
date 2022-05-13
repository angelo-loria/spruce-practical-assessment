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

        // update to show more items on single page, default is 12 displayed
        if (await numberOfProductsFound > 12) {
            await searchResultsPage.updateNumberOfProductsDisplayed(96)
        }

        const filePath = `productDetails_${new Date().toISOString()}.txt`
        console.log(`scraping ${numberOfProductsFound} products to ${filePath}`)
        await searchResultsPage.writeProductDetailsToFile(filePath)
    })
})
