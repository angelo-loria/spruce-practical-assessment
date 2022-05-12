import Page from "./page";

class SearchResultsPage extends Page {
    async open () {
        await super.open('/?target=search&mode=search&including=all')
    }
}

export default new SearchResultsPage