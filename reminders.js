async function getDailyAyah() {
  const totalAyahs = 6236;
  const today = new Date();

  // Seed as day-month-year (with +1 for month)
  const seed = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  let globalAyahNum = (hash * 17) % totalAyahs + 1;

  const container = document.getElementById("ayah-text");
  if (container) {
    container.textContent = "📖 Loading today's reflection...";
  }

  try {
    // Fetch first Ayah Arabic
    const arabicRes = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/ar`);
    const arabicJson = await arabicRes.json();
    if (arabicJson.code !== 200) throw new Error("Arabic verse not found");

    let arabicText = arabicJson.data.text;
    const surahName = arabicJson.data.surah.englishName;
    const surahArabicName = arabicJson.data.surah.name;
    const ayahNumber = arabicJson.data.numberInSurah;

    // Count words in Arabic text
    const wordCount = arabicText.trim().split(/\s+/).length;

    let combinedArabic = arabicText;
    let combinedEnglish = "";
    let combinedAyahNumbers = `Ayah ${ayahNumber}`;

    // Fetch first English translation (Sahih International)
    const engRes1 = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/en.sahih`);
    const engJson1 = await engRes1.json();
    if (engJson1.code !== 200) throw new Error("English verse not found");
    combinedEnglish = engJson1.data.text;

    // If short verse (<10 words), fetch the next ayah and combine
    if (wordCount < 10 && globalAyahNum < totalAyahs) {
      const nextAyahNum = globalAyahNum + 1;

      // Fetch next Ayah Arabic
      const arabicRes2 = await fetch(`https://api.alquran.cloud/v1/ayah/${nextAyahNum}/ar`);
      const arabicJson2 = await arabicRes2.json();
      if (arabicJson2.code !== 200) throw new Error("Next Arabic verse not found");
      const arabicText2 = arabicJson2.data.text;

      // Fetch next Ayah English
      const engRes2 = await fetch(`https://api.alquran.cloud/v1/ayah/${nextAyahNum}/en.sahih`);
      const engJson2 = await engRes2.json();
      if (engJson2.code !== 200) throw new Error("Next English verse not found");
      const englishText2 = engJson2.data.text;

      combinedArabic += "\n" + arabicText2;
      combinedEnglish += " " + englishText2;

      combinedAyahNumbers = `Ayah ${ayahNumber} and ${arabicJson2.data.numberInSurah}`;
    }

    // Display
    if (container) {
      container.textContent = `📖 ${surahArabicName} (${surahName}) — ${combinedAyahNumbers}\n\n${combinedArabic}\n\n${combinedEnglish}`;
    }
  } catch (err) {
    console.error("Error fetching Ayah:", err);
    if (container) {
      container.textContent = "⚠️ Unable to load today's reflection. Please try again later.";
    }
  }
}

getDailyAyah();
