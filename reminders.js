async function getDailyAyah() {
  const totalAyahs = 6236;

  // Create a consistent daily number based on today's date
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const ayahNum = (hash * 17) % totalAyahs + 1;

  async function fetchVerse(num) {
    const res = await fetch(`https://cdn.jsdelivr.net/npm/quran-cloud@1.0.0/dist/verses/${num}.json`);
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  }

  try {
    const v1 = await fetchVerse(ayahNum);
    const wordsCount = v1.translations.en.trim().split(/\s+/).length;

    let output = `${v1.text}
${v1.translations.en}
(${v1.chapter_name_en} ${v1.verse_number})`;

    // If it's a short verse, add the next one too
    if (wordsCount < 5 && ayahNum < totalAyahs) {
      const v2 = await fetchVerse(ayahNum + 1);
      output += `\n\n${v2.text}
${v2.translations.en}
(${v2.chapter_name_en} ${v2.verse_number})`;
    }

    const container = document.getElementById("ayah-text");
    if (container) container.textContent = output;

  } catch (err) {
    console.error("Error fetching ayah:", err);
    const container = document.getElementById("ayah-text");
    if (container) container.textContent = "Unable to load daily reflection at the moment.";
  }
}

getDailyAyah();
