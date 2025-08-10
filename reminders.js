async function getDailyAyah() {
  const totalAyahs = 6236;

  // Create a consistent "daily hash" based on today's date
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const ayahNum = (hash * 17) % totalAyahs + 1;

  // Fetch a verse using jsDelivr Quran Cloud JSON
  async function fetchVerse(num) {
    const res = await fetch(`https://cdn.jsdelivr.net/npm/quran-cloud@1.0.0/dist/verses/${num}.json`);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  }

  try {
    const v1 = await fetchVerse(ayahNum);
    const wordsCount = v1.translations.en.trim().split(/\s+/).length;

    let output = `${v1.text}\n${v1.translations.en}`;

    // If it's a short verse, include the next verse as well
    if (wordsCount < 5 && ayahNum < totalAyahs) {
      const v2 = await fetchVerse(ayahNum + 1);
      output += `\n\n${v2.text}\n${v2.translations.en}`;
    }

    // Place into the DOM
    const container = document.getElementById("ayah-text");
    if (container) container.textContent = output;

  } catch (err) {
    console.error("Error fetching ayah:", err);
    const container = document.getElementById("ayah-text");
    if (container) container.textContent = "Unable to load daily reflection at the moment.";
  }
}

getDailyAyah();

