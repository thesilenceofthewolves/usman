async function getDailyAyah() {
  const totalAyahs = 6236;
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const globalAyahNum = (hash * 17) % totalAyahs + 1;

  try {
    // Fetch Arabic
    const arabicRes = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/ar`);
    const arabicJson = await arabicRes.json();
    if (arabicJson.code !== 200) throw new Error("Arabic verse not found");

    const arabic = arabicJson.data.text;
    const surahName = arabicJson.data.surah.englishName;
    const ayahNumber = arabicJson.data.numberInSurah;

    // Fetch English (Clear Quran)
    const engRes = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/en.clear`);
    const engJson = await engRes.json();
    if (engJson.code !== 200) throw new Error("English verse not found");

    const translation = engJson.data.text;

    // Display
    const container = document.getElementById("ayah-text");
    if (container) {
      container.textContent = `📖 ${surahName} — Ayah ${ayahNumber}\n\n${arabic}\n\n${translation}`;
    }
  } catch (err) {
    console.error("Error fetching Ayah:", err);
    const container = document.getElementById("ayah-text");
    if (container) {
      container.textContent = "Unable to load daily reflection.";
    }
  }
}

getDailyAyah();
