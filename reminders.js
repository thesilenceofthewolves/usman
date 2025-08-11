async function getDailyAyah() {
  const totalAyahs = 6236;
  const today = new Date();

  // Correct month handling (JavaScript months are 0-based)
  const seed = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  // Simple hash function based on the seed
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const globalAyahNum = (hash * 17) % totalAyahs + 1;

  const container = document.getElementById("ayah-text");
  if (container) {
    container.textContent = "📖 Loading today's reflection...";
  }

  try {
    // Fetch Arabic
    const arabicRes = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/ar`);
    const arabicJson = await arabicRes.json();
    if (arabicJson.code !== 200) throw new Error("Arabic verse not found");

    const arabic = arabicJson.data.text;
    const surahName = arabicJson.data.surah.englishName;
    const surahArabicName = arabicJson.data.surah.name;
    const ayahNumber = arabicJson.data.numberInSurah;

    // Fetch English - Sahih International
    const engRes = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/en.sahih`);
    const engJson = await engRes.json();
    if (engJson.code !== 200) throw new Error("English verse not found");

    const translation = engJson.data.text;

    // Display result
    if (container) {
      container.textContent = `📖 ${surahArabicName} (${surahName}) — Ayah ${ayahNumber}\n\n${arabic}\n\n${translation}`;
    }
  } catch (err) {
    console.error("Error fetching Ayah:", err);
    if (container) {
      container.textContent = "⚠️ Unable to load today's reflection. Please try again later.";
    }
  }
}

// Call the function when the page loads
getDailyAyah();
