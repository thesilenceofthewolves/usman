async function getDailyAyah() {
  const totalAyahs = 6236;
  const today = new Date();
  const hash = [...`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`]
    .reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const ayahNum = (hash * 17) % totalAyahs + 1;

  async function fetchAyah(num) {
    const response = await fetch(`https://api.quran.com/api/v4/verses/by_key/${num}?language=en&words=false`);
    const json = await response.json();
    return {
      arabic: json.verse.text_uthmani,
      translation: json.translations?.[0]?.text || 'Translation missing',
      verseKey: json.verse.verse_key,
      surahNumber: json.verse.chapter_id,
      ayahNumber: json.verse.verse_number
    };
  }

  async function fetchSurahName(surahNumber) {
    const res = await fetch(`https://api.quran.com/api/v4/chapters/${surahNumber}`);
    const data = await res.json();
    return data.chapter.english_name;
  }

  try {
    const v1 = await fetchAyah(ayahNum);
    const surahName = await fetchSurahName(v1.surahNumber);
    const wordsCount = v1.translation.trim().split(/\s+/).length;

    let output = `${v1.arabic}\n${v1.translation}\n(${surahName} ${v1.ayahNumber})`;

    if (wordsCount < 5) {
      const nextVerseKey = `${v1.surahNumber}:${v1.ayahNumber + 1}`;
      const v2 = await fetchAyah(nextVerseKey);
      const surahName2 = await fetchSurahName(v2.surahNumber);

      output += `\n\n${v2.arabic}\n${v2.translation}\n(${surahName2} ${v2.ayahNumber})`;
    }

    document.getElementById("ayah-text").textContent = output;
  } catch (err) {
    console.error(err);
    document.getElementById("ayah-text").textContent = "Unable to load daily reflection.";
  }
}

getDailyAyah();
