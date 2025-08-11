async function getDailyAyah() {
  const totalAyahs = 6236;

  // Create a consistent daily verse using today's date
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const globalAyahNum = (hash * 17) % totalAyahs + 1;

  try {
    // Fetch using QuranHive API
    const res = await fetch(`https://api.quranhive.com/v1/ayah/${globalAyahNum}?translations=131`); // 131 = Mustafa Khattab
    const json = await res.json();

    const verse = json.data;
    const arabic = verse.text;
    const translation = verse.translations[0].text;
    const surahName = verse.surah.name;
    const ayahNumber = verse.numberInSurah;

    const container = document.getElementById("ayah-text");
    if (container) {
      container.textContent = `📖 ${surahName} — Ayah ${ayahNumber}\n\n${arabic}\n\n${translation}`;
    }
  } catch (err) {
    console.error("Error loading ayah:", err);
    const container = document.getElementById("ayah-text");
    if (container) container.textContent = "Unable to load daily reflection.";
  }
}

getDailyAyah();
