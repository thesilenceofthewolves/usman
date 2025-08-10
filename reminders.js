async function getDailyAyahTranslation() {
  const totalAyahs = 6236;
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const ayahNum = (hash * 17) % totalAyahs + 1;

  async function fetchVerse(num) {
    const res = await fetch(`https://cdn.jsdelivr.net/npm/quran-cloud@1.0.0/dist/verses/${num}.json`);
    if (!res.ok) throw new Error('Failed to fetch verse');
    return await res.json();
  }

  try {
    const v = await fetchVerse(ayahNum);
    const translation = v.translations.en;

    document.getElementById("ayah-text").textContent = translation;
  } catch (err) {
    console.error("Error fetching translation:", err);
    document.getElementById("ayah-text").textContent = "Unable to load translation.";
  }
}

getDailyAyahTranslation();
