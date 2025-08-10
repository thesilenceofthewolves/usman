async function getDailyAyah() {
  const totalAyahs = 6236;

  // Create a consistent number based on today’s date
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const ayahNum = (hash * 17) % totalAyahs + 1;

  async function fetchVerse(num) {
    const url = `https://cdn.jsdelivr.net/npm/quran-cloud@1.0.0/dist/verses/${num}.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  }

  try {
    const verse = await fetchVerse(ayahNum);

    const surahName = verse.chapter_name_en || "Unknown Surah";
    const ayahNumber = verse.verse_number || "?";
    const arabic = verse.text || "";
    const translation = verse.translations?.en || "";

    const output = `📖 ${surahName} — Ayah ${ayahNumber}\n\n${arabic}\n\n${translation}`;

    const container = document.getElementById("ayah-text");
    if (container) {
      container.textContent = output;
    }
  } catch (err) {
    console.error("Error fetching ayah:", err);
    const container = document.getElementById("ayah-text");
    if (container) {
      container.textContent = "Unable to load daily reflection at the moment.";
    }
  }
}

getDailyAyah();
