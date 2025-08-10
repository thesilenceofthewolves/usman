// ✅ Fetch ayah (Mustafa Khattab translation only)
async function fetchAyah(surah, ayah) {
  const key = `${surah}:${ayah}`;
  const url = `https://api.quran.com/api/v4/verses/by_key/${key}?language=en&translations=131&words=false`;

  const res = await fetch(url);
  const data = await res.json();
  
  // Debug the API response
  console.log("API Response:", data);

  // Ensure that both Arabic and translation exist
  if (!data.verse || !data.verse.text_uthmani || !data.verse.translations?.[0]?.text) {
    throw new Error("Invalid verse data");
  }

  return {
    arabic: data.verse.text_uthmani,
    translation: data.verse.translations[0].text,
    surah: data.verse.chapter_id,
    ayah: data.verse.verse_number
  };
}

// ✅ Display daily ayah
async function getDailyAyah() {
  const totalAyahs = 6236;
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const globalAyahNum = (hash * 17) % totalAyahs + 1;

  try {
    const { surah, ayah } = getSurahAyah(globalAyahNum);
    const verse = await fetchAyah(surah, ayah);
    const surahName = await fetchSurahName(surah);

    let output = `${verse.arabic}\n${verse.translation}\n(${surahName} ${ayah})`;

    // If short, append next ayah
    const wordCount = verse.translation.trim().split(/\s+/).length;
    if (wordCount < 5 && ayah < ayahCounts[surah - 1]) {
      const nextVerse = await fetchAyah(surah, ayah + 1);
      output += `\n\n${nextVerse.arabic}\n${nextVerse.translation}\n(${surahName} ${ayah + 1})`;
    }

    document.getElementById("ayah-text").textContent = output;
  } catch (error) {
    console.error("❌ Error loading reflection:", error);
    document.getElementById("ayah-text").textContent = "Unable to load daily reflection.";
  }
}

// Call the function to get the daily ayah
getDailyAyah();
