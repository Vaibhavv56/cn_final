const API_KEY = "5896b68bb69640b8935ba4789caa29c2";
const url = "https://newsapi.org/v2/everything?q=";

// Simulated JSON response (for local testing purposes)
const sampleData = {
    "status": "ok",
    "totalResults": 28398,
    "articles": [
        {
            "source": { "id": "wired", "name": "Wired" },
            "author": "Matt Burgess, Lily Hay Newman",
            "title": "These Guys Hacked AirPods to Give Their Grandmas Hearing Aids",
            "description": "Three technologists in India used a homemade Faraday cage and a microwave oven to get around Apple’s location blocks.",
            "url": "https://www.wired.com/story/apple-airpods-hearing-aid-hack/",
            "urlToImage": "https://media.wired.com/photos/6734befbaa3b60c51ba80929/191:100/w_1280,c_limit/airpod-hearindaid-sec-2170417864.jpg",
            "publishedAt": "2024-11-13T19:07:15Z",
            "content": "The group members, who have a mix of hardware and software skills..."
        },
        {
            "source": { "id": null, "name": "BBC News" },
            "title": "India and China agree to de-escalate border tensions",
            "description": "The two countries have reached a patrolling agreement after several clashes between their troops since 2020.",
            "url": "https://www.bbc.com/news/articles/ckg0gwy0nlyo",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/f629/live/0c4624b0-8f94-11ef-9750-53a86a1c5c17.jpg",
            "publishedAt": "2024-10-21T11:06:40Z",
            "content": "India and China have agreed on patrolling arrangements..."
        },
        {
            "source": { "id": null, "name": "BBC News" },
            "author": null,
            "title": "Ten newborns killed in hospital fire in northern India",
            "description": "The fire broke out in a neonatal ward at a hospital in Jhansi, Uttar Pradesh, on Friday night.",
            "url": "https://www.bbc.com/news/articles/ckglzvq294eo",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/6761/live/0bd568d0-a3dd-11ef-bdf5-b7cb2fa86e10.jpg",
            "publishedAt": "2024-11-16T06:31:24Z",
            "content": "At least 10 newborns have died in a fire at a hospital in northern India..."
        },
        {
            "source": { "id": null, "name": "BBC News" },
            "author": null,
            "title": "Is this tiny Mauritian island a confidential spy station?",
            "description": "India has built a 3km-long runway on Agalega and no-one has fully explained why, angering residents.",
            "url": "https://www.bbc.com/news/articles/cvg47274y4no",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/9681/live/d1016790-9b94-11ef-b820-9d6a9f778374.jpg",
            "publishedAt": "2024-11-09T01:10:41Z",
            "content": "Arnaud Poulay never wanted to leave the tiny Indian Ocean island of Agalega..."
        },
        {
            "source": { "id": null, "name": "BBC News" },
            "author": null,
            "title": "Jets intercept plane after 'bomb threat' made",
            "description": "Residents say they heard a loud sonic boom as Typhoon jets scrambled.",
            "url": "https://www.bbc.com/news/articles/czxdzq0d9vyo",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/6177/live/49ec2740-8c8f-11ef-ab1d-79f5630c944f.jpg",
            "publishedAt": "2024-10-17T17:00:21Z",
            "content": "Typhoon jets from RAF Coningsby in Lincolnshire sped to the Air India flight..."
        }
    ]
};

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    // Simulate API response with static data (for testing)
    const data = sampleData;
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name || "Unknown"} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
