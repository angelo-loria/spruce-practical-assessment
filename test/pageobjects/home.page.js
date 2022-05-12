import Page from "./page";

class HomePage extends Page {
    async open () {
        await super.open('/')
    }
}

export default new HomePage