// Ayah counts per surah (114 surahs, total = 6236)
const ayahCounts = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111,
  43, 52, 99, 128, 111, 110, 98, 135, 112, 78, 118, 64,
  77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83,
  182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29,
  18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13,
  14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28,
  20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25,
  22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19,
  5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6,
  3, 5, 4, 5, 6
];

function getSurahAyah(globalAyahNum) {
  let count = 0;
  for (let i = 0; i < ayahCounts.length; i++) {
    if (globalAyahNum <= count + ayahCounts[i]) {
      return { surah: i + 1, ayah: globalAyahNum - count };
    }
    count += ayahCounts[i];
  }
  throw new Error("Invalid ayah number");
}

async function fetchSurahName(surahNumber) {
  const res = await fetch(`https://api.quran.com/api/v4/chapters/${surahNumber}`);
  const data = await res.json();
  return data.chapter.english_name;
}

async function fetchAyah(surah, ayah) {
  const key = `${surah}:${ayah}`;
  const res = await fetch(`https://api.quran.com/api/v4/verses/by_key/${key}?language=en&translations=131&words=false`);
  const data = await res.json();

  return {
    arabic: data.verse.text_uthmani,
    translation: data.verse.translations[0].text,
    surah: data.verse.chapter_id,
    ayah: data.verse.verse_number
  };
}

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

    // Append next verse if short
    const wordCount = verse.translation.trim().split(/\s+/).length;
    if (wordCount < 5 && ayah < ayahCounts[surah - 1]) {
      const nextVerse = await fetchAyah(surah, ayah + 1);
      output += `\n\n${nextVerse.arabic}\n${nextVerse.translation}\n(${surahName} ${ayah + 1})`;
    }

    document.getElementById("ayah-text").textContent = output;
  } catch (error) {
    console.error(error);
    document.getElementById("ayah-text").textContent = "Unable to load daily reflection.";
  }
}

getDailyAyah();
