async function getDailyAyah() {
  const totalAyahs = 6236;
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const globalAyahNum = (hash * 17) % totalAyahs + 1;

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/ar.saheeh`);
    const json = await res.json();
    if (json.code !== 200 || !json.data) throw new Error("Verse not found");

    const data = json.data;
    const surahName = data.surah.englishName;
    const ayahNumber = data.numberInSurah;
    const arabicText = data.text;

    const container = document.getElementById("ayah-text");
    if (container) {
      container.textContent = `${surahName} — Ayah ${ayahNumber}\n\n${arabicText}`;
    }
  } catch (err) {
    console.error("Error loading ayah:", err);
    const container = document.getElementById("ayah-text");
    if (container) container.textContent = "Unable to load daily ayah.";
  }
}

getDailyAyah();
