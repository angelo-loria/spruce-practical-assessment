import Page from "./page";

class HomePage extends Page {
    get banner () { return $('#banner-rotation-widget') }

    async open () {
        await super.open('/')
        await this.banner.waitForDisplayed()
    }
}

export default new HomePage