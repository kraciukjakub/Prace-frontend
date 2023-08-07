class PokemonTCGCatalog {
  constructor() {
    this.pageSize = 4;
    this.currentPage = 1;
    this.cards = [];
    this.newCards = [];

    this.catalog = null;
    this.button = null;

    this.API = "https://api.pokemontcg.io";
    this.API_VERSION = "v1";
    this.API_RESOURCE = "cards";

    this.API_ENDPOINT = `${this.API}/${this.API_VERSION}/${this.API_RESOURCE}`;

    this.UiSelectors = {
      content: "[data-content]",
      button: "[data-button]",
    };
  }

  initializeCatalog() {
    this.catalog = document.querySelector(this.UiSelectors.content);
    this.button = document.querySelector(this.UiSelectors.button);

    this.addEventListeners();

    this.pullCards();
  }

  addEventListeners() {
    this.button.addEventListener("click", () => this.pullCards());
  }

  async pullCards() {
    const { cards } = await this.fetchData(
      `{this.API_ENDPOINT}?page=${this.currentPage}&pageSize=${this.pageSize}`
    );

    this.cards = [...this.cards, ...cards];

    this.newCards = [...cards];

    this.createCatalog(this.newCards);
    this.currentPage++;
  }

  async fetchData(url) {
    const response = await fetch(url);
    const parsedResponse = await response.json();

    return parsedResponse;
  }

  createCatalog(cards) {
    this.catalog.innerAdjacentHTML([
      cards.map((card) => this.createCard(card)).join(""),
    ]) += ;
  }

  createCard({ name, number, imageUrl, supertype, subtype, rarity }) {
    return `
    <article class="card">
      <header class="card__header>
        <h2 class="card__heading">
        ${name}
        </h2>
        <p class="card__number">
       Nr: ${number}
        </p>
      </header>
      <img class="card__image" src="${imageUrl}" alt="${name}">
      <p class="card__description"><span class="bold"
      >Supertype:</span> ${supertype}</p>
      <p class="card__description"><span class="bold"
      >Subtype:</span> ${subtype}</p>
      <p class="card__description"><span class="bold"
      >Rarity:</span> ${rarity}</p>
      </article>
    `;
  }
}
