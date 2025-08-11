async function getDailyDataNews() {
  const container = document.getElementById("data-news");
  const rssUrl = "https://news.google.com/rss/search?q=data+science&hl=en-US&gl=US&ceid=US:en";
  const proxyUrl = `https://rss2json.dev/api/?url=${encodeURIComponent(rssUrl)}`;

  if (container) {
    container.textContent = "📡 Loading today’s data news...";
  }

  try {
    const res = await fetch(proxyUrl);
    const json = await res.json();

    if (!json.items || json.items.length === 0) throw new Error("No news found");

    // Pick one article based on today's date
    const today = new Date().toISOString().split("T")[0];
    const hash = [...today].reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const idx = hash % json.items.length;
    const item = json.items[idx];

    if (container) {
      container.innerHTML = `
        <strong>🗞️ ${item.title}</strong><br><br>
        ${item.description ? item.description.split("...")[0] + "..." : ""}<br><br>
        <a href="${item.link}" target="_blank">Read full article →</a>
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
