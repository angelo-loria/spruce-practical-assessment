import homePage from "../pageobjects/home.page";

describe('product search and scrape', () => {
    it('searches for product', async () => {
         await homePage.open()
         await homePage.searchForItem('product')
    })
})
