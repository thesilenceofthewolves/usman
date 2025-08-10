const ayahCounts = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109,
  123, 111, 43, 52, 99, 128, 111, 110, 98, 135,
  112, 78, 118, 64, 77, 227, 93, 88, 69, 60,
  34, 30, 73, 54, 45, 83, 182, 88, 75, 85,
  54, 53, 89, 59, 37, 35, 38, 29, 18, 45,
  60, 49, 62, 55, 78, 96, 29, 22, 24, 13,
  14, 11, 11, 18, 12, 12, 30, 52, 52, 44,
  28, 28, 20, 56, 40, 31, 50, 40, 46, 42,
  29, 19, 36, 25, 22, 17, 19, 26, 30, 20,
  15, 21, 11, 8, 8, 19, 5, 8, 8, 11,
  11, 8, 3, 9, 5, 4, 7, 3, 6, 3,
  5, 4, 5, 6
];

// ✅ Convert global ayah number to surah and ayah
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

// ✅ Get surah name
async function fetchSurahName(surahNumber) {
  const res = await fetch(`https://api.quran.com/api/v4/chapters/${surahNumber}`);
  const data = await res.json();
  return data.chapter?.english_name || `Surah ${surahNumber}`;
}

// ✅ Fetch ayah (Mustafa Khattab translation only)
async function fetchAyah(surah, ayah) {
  const key = `${surah}:${ayah}`;
  const url = `https://api.quran.com/api/v4/verses/by_key/${key}?language=en&translations=131&words=false`;

  const res = await fetch(url);
  const data = await res.json();
  
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

// ✅ Fetch ayah from AlQuran Cloud (fallback if Quran.com fails)
async function fetchAlQuranAyah(globalAyahNum) {
  const res = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/ar.en.kat`);
  const data = await res.json();
  if (data.code !== 200 || !data.data) throw new Error("AlQuran API error");
  return data.data;
