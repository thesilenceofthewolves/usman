async function getDailyDataNews() {
  const container = document.getElementById("data-news");
  const rssUrl = "https://news.google.com/rss/search?q=data+science&hl=en-US&gl=US&ceid=US:en";
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

  if (container) {
    container.textContent = "📡 Loading today’s data news...";
  }

  try {
    const res = await fetch(proxyUrl);
    const data = await res.json();

    // Parse the raw RSS XML string
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, "text/xml");

    const items = xmlDoc.querySelectorAll("item");
    if (!items.length) throw new Error("No news found");

    // Pick one based on date hash
    const today = new Date().toISOString().split("T")[0];
    const hash = [...today].reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const idx = hash % items.length;
    const item = items[idx];

    const title = item.querySelector("title").textContent;
    const description = item.querySelector("description").textContent;
    const link = item.querySelector("link").textContent;

    if (container) {
      container.innerHTML = `
        <strong>🗞️ ${title}</strong><br><br>
        ${description}<br><br>
        <a href="${link}" target="_blank">Read full article →</a>
      `;
    }
  } catch (err) {
    console.error("Error fetching data news:", err);
    if (container) {
      container.textContent = "⚠️ Unable to load data news. Try again later.";
    }
  }
}

getDailyDataNews();
