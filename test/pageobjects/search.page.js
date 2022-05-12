import Page from "./page";

class SearchPage extends Page {
    async open () {
        await super.open('/?target=search&mode=search&including=all')
    }
}

export default new SearchPage