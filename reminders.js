// ✅ Fetch ayah (Sahih International translation only)
async function fetchAyah(surah, ayah) {
  const key = `${surah}:${ayah}`;
  const url = `https://api.quran.com/api/v4/verses/by_key/${key}?language=en&translations=131&words=false`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    // Log the full API response for debugging
    console.log("API Response:", data);

    // Ensure that both Arabic and translation exist
    if (!data.verse || !data.verse.text_uthmani || !data.verse.translations?.[0]?.text) {
      throw new Error("Invalid verse data - Translation or Arabic text missing");
    }

    return {
      arabic: data.verse.text_uthmani,
      translation: data.verse.translations[0].text,
      surah: data.verse.chapter_id,
      ayah: data.verse.verse_number
    };
  } catch (error) {
    console.error("❌ Error fetching verse:", error);
    throw new Error("Error fetching verse");
  }
}

// ✅ Fetch Surah name based on the Surah ID
async function fetchSurahName(surahId) {
  const url = `https://api.quran.com/api/v4/chapters/${surahId}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.chapter || !data.chapter.name) {
      throw new Error("Surah name not found");
    }

    return data.chapter.name;
  } catch (error) {
    console.error("❌ Error fetching Surah name:", error);
    return "Unknown Surah";
  }
}

// ✅ Get Surah and Ayah number based on the global number (hash)
function getSurahAyah(globalAyahNum) {
  const surahAyahMap = [
    { surah: 1, ayahCount: 7 },
    { surah: 2, ayahCount: 286 },
    { surah: 3, ayahCount: 200 },
    { surah: 4, ayahCount: 176 },
    { surah: 5, ayahCount: 120 },
    { surah: 6, ayahCount: 165 },
    { surah: 7, ayahCount: 206 },
    { surah: 8, ayahCount: 75 },
    { surah: 9, ayahCount: 129 },
    { surah: 10, ayahCount: 109 },
    { surah: 11, ayahCount: 123 },
    { surah: 12, ayahCount: 111 },
    { surah: 13, ayahCount: 43 },
    { surah: 14, ayahCount: 52 },
    { surah: 15, ayahCount: 99 },
    { surah: 16, ayahCount: 128 },
    { surah: 17, ayahCount: 111 },
    { surah: 18, ayahCount: 110 },
    { surah: 19, ayahCount: 98 },
    { surah: 20, ayahCount: 135 },
    { surah: 21, ayahCount: 112 },
    { surah: 22, ayahCount: 78 },
    { surah: 23, ayahCount: 118 },
    { surah: 24, ayahCount: 64 },
    { surah: 25, ayahCount: 77 },
    { surah: 26, ayahCount: 227 },
    { surah: 27, ayahCount: 55 },
    { surah: 28, ayahCount: 88 },
    { surah: 29, ayahCount: 69 },
    { surah: 30, ayahCount: 37 },
    { surah: 31, ayahCount: 34 },
    { surah: 32, ayahCount: 30 },
    { surah: 33, ayahCount: 73 },
    { surah: 34, ayahCount: 54 },
    { surah: 35, ayahCount: 45 },
    { surah: 36, ayahCount: 27 },
    { surah: 37, ayahCount: 182 },
    { surah: 38, ayahCount: 88 },
    { surah: 39, ayahCount: 75 },
    { surah: 40, ayahCount: 85 },
    { surah: 41, ayahCount: 54 },
    { surah: 42, ayahCount: 53 },
    { surah: 43, ayahCount: 89 },
    { surah: 44, ayahCount: 59 },
    { surah: 45, ayahCount: 37 },
    { surah: 46, ayahCount: 35 },
    { surah: 47, ayahCount: 38 },
    { surah: 48, ayahCount: 29 },
    { surah: 49, ayahCount: 18 },
    { surah: 50, ayahCount: 45 },
    { surah: 51, ayahCount: 60 },
    { surah: 52, ayahCount: 49 },
    { surah: 53, ayahCount: 62 },
    { surah: 54, ayahCount: 55 },
    { surah: 55, ayahCount: 78 },
    { surah: 56, ayahCount: 96 },
    { surah: 57, ayahCount: 29 },
    { surah: 58, ayahCount: 22 },
    { surah: 59, ayahCount: 24 },
    { surah: 60, ayahCount: 13 },
    { surah: 61, ayahCount: 14 },
    { surah: 62, ayahCount: 11 },
    { surah: 63, ayahCount: 11 },
    { surah: 64, ayahCount: 18 },
    { surah: 65, ayahCount: 12 },
    { surah: 66, ayahCount: 12 },
    { surah: 67, ayahCount: 30 },
    { surah: 68, ayahCount: 52 },
    { surah: 69, ayahCount: 52 },
    { surah: 70, ayahCount: 44 },
    { surah: 71, ayahCount: 28 },
    { surah: 72, ayahCount: 28 },
    { surah: 73, ayahCount: 20 },
    { surah: 74, ayahCount: 56 },
    { surah: 75, ayahCount: 40 },
    { surah: 76, ayahCount: 31 },
    { surah: 77, ayahCount: 50 },
    { surah: 78, ayahCount: 40 },
    { surah: 79, ayahCount: 46 },
    { surah: 80, ayahCount: 42 },
    { surah: 81, ayahCount: 29 },
    { surah: 82, ayahCount: 19 },
    { surah: 83, ayahCount: 36 },
    { surah: 84, ayahCount: 25 },
    { surah: 85, ayahCount: 22 },
    { surah: 86, ayahCount: 17 },
    { surah: 87, ayahCount: 19 },
    { surah: 88, ayahCount: 26 },
    { surah: 89, ayahCount: 30 },
    { surah: 90, ayahCount: 20 },
    { surah: 91, ayahCount: 15 },
    { surah: 92, ayahCount: 21 },
    { surah: 93, ayahCount: 11 },
    { surah: 94, ayahCount: 8 },
    { surah: 95, ayahCount: 8 },
    { surah: 96, ayahCount: 19 },
    { surah: 97, ayahCount: 5 },
    { surah: 98, ayahCount: 8 },
    { surah: 99, ayahCount: 8 },
    { surah: 100, ayahCount: 11 },
    { surah: 101, ayahCount: 11 },
    { surah: 102, ayahCount: 8 },
    { surah: 103, ayahCount: 3 },
    { surah: 104, ayahCount: 9 },
    { surah: 105, ayahCount: 5 },
    { surah: 106, ayahCount: 4 },
    { surah: 107, ayahCount: 7 },
    { surah: 108, ayahCount: 3 },
    { surah: 109, ayahCount: 6 },
    { surah: 110, ayahCount: 3 },
    { surah: 111, ayahCount: 5 },
    { surah: 112, ayahCount: 4 },
    { surah: 113, ayahCount: 5 },
    { surah: 114, ayahCount: 6 },
  ];

  let sum = 0;
  for (let i = 0; i < surahAyahMap.length; i++) {
    sum += surahAyahMap[i].ayahCount;
    if (globalAyahNum <= sum) {
      const surah = surahAyahMap[i].surah;
      const ayah = globalAyahNum - (sum - surahAyahMap[i].ayahCount);
      return { surah, ayah };
    }
  }

  throw new Error("Invalid global Ayah number");
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

    let output = `${surahName} - Ayah ${ayah}: ${verse.arabic}\n${verse.translation}`;

    // If short, append the next ayah
    const wordCount = verse.translation.trim().split(/\s+/).length;
    if (wordCount < 5 && ayah < ayahCounts[surah - 1]) {
      const nextVerse = await fetchAyah(surah, ayah + 1);
      output += `\n\n${nextVerse.arabic}\n${nextVerse.translation}\n(${surahName} ${ayah + 1})`;
    }

    document.getElementById("ayah-text").textContent = output;
  } catch (error) {
    console.error("❌ Error loading reflection:", error);
    document.getElementById("ayah-text").textContent = `Unable to load daily reflection: ${error.message}`;
  }
}

// Call the function to get the daily ayah
getDailyAyah();
