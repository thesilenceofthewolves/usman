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

async function getDailyAyah() {
  const totalAyahs = 6236;
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const globalAyahNum = (hash * 17) % totalAyahs + 1;

  function formatKey(surah, ayah) {
    return `${surah}:${ayah}`;
  }

  async function fetchAyah(key) {
    const response = await fetch(`https://api.quran.com/api/v4/verses/by_key/${key}?language=en&words=false`);
    if (!response.ok) throw new Error(`Failed to fetch ayah ${key}: ${response.statusText}`);
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
    if (!res.ok) throw new Error(`Failed to fetch surah ${surahNumber}: ${res.statusText}`);
    const data = await res.json();
    return data.chapter.english_name;
  }

  try {
    const { surah, ayah } = getSurahAyah(globalAyahNum);
    const key = formatKey(surah, ayah);
    const v1 = await fetchAyah(key);
    const surahName = await fetchSurahName(v1.surahNumber);
    const wordsCount = v1.translation.trim().split(/\s+/).length;

    let output = `${v1.arabic}\n${v1.translation}\n(${surahName} ${v1.ayahNumber})`;

    if (wordsCount < 5 && v1.ayahNumber < ayahCounts[v1.surahNumber - 1]) {
      const nextKey = formatKey(v1.surahNumber, v1.ayahNumber + 1);
      const v2 = await fetchAyah(nextKey);
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
