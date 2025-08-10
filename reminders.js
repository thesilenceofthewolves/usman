async function getDailyAyah() {
  const totalAyahs = 6236;

  // Generate consistent daily verse number
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const globalAyahNum = (hash * 17) % totalAyahs + 1;

  try {
    const response = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/en.kat`);
    const json = await response.json();
    if (json.code !== 200 || !json.data) throw new Error("Verse not found");

    const data = json.data;
    const surahName = data.surah.englishName;
    const ayahNumber = data.numberInSurah;
    const arabic = data.text;        // Arabic verse
    const translation = data.text;   // Khattab translation (same field)

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
