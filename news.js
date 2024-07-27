const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY`;

const requestNews = async () => {
    try {
        const response = await fetch(API_URL);
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data.articles.length === 0) {
            document.getElementById('news-container').innerHTML = '<p>No news available.</p>';
            return;
        }

        let newsHtml = '';
        data.articles.forEach(article => {
            newsHtml += `
                <div class="news-item">
                    <h4><a href="${article.url}" target="_blank">${article.title}</a></h4>
                    <p>${article.description}</p>
                </div>
            `;
        });

        document.getElementById('news-container').innerHTML = newsHtml;
    } catch (err) {
        console.error('Error fetching news:', err);
        document.getElementById('news-container').innerHTML = `<p>Error fetching news: ${err.message}</p>`;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    if (navigator.onLine) {
        requestNews();
    } else {
        document.getElementById('news-container').innerHTML = "<p>No Internet Connection</p>";
    }
});

document.getElementById('refresh').addEventListener("click", () => {
    if (navigator.onLine) {
        requestNews();
    } else {
        document.getElementById('news-container').innerHTML = "<p>No Internet Connection</p>";
    }
});
