// ✅ Fetch ayah (Sahih International translation only)
async function fetchAyah(surah, ayah) {
  const key = `${surah}:${ayah}`;
  const url = `https://api.quran.com/api/v4/verses/by_key/${key}?language=en&translations=131&words=false`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("API Response:", data); // Debugging

    // Ensure that both Arabic and translation exist
    if (!data.verse || !data.verse.text_uthmani || !data.verse.translations?.[0]?.text) {
      console.warn("Verse data incomplete:", data.verse);
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
  const url = `https://api.quran.com/api/v4/chapters/${surahId}?language=en`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.chapter || !data.chapter.name_simple) {
      throw new Error("Surah name not found");
    }

    return data.chapter.name_simple;
  } catch (error) {
    console.error("❌ Error fetching Surah name:", error);
    return "Unknown Surah";
  }
}

// ✅ Ayah counts per surah (used to check if next ayah exists)
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

// ✅ Get Surah and Ayah number from global index
function getSurahAyah(globalAyahNum) {
  let sum = 0;
  for (let i = 0; i < ayahCounts.length; i++) {
    sum += ayahCounts[i];
    if (globalAyahNum <= sum) {
      const surah = i + 1;
      const ayah = globalAyahNum - (sum - ayahCounts[i]);
      return { surah, ayah };
    }
  }
  throw new Error("Invalid global Ayah number");
}

// ✅ Main function to display daily ayah
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

    let output = `📖 ${surahName} - Ayah ${ayah}\n\n${verse.arabic}\n\n${verse.translation}`;

    // If short ayah (< 5 words), fetch and append next
    const wordCount = verse.translation.trim().split(/\s+/).length;
    if (wordCount < 5 && ayah < ayahCounts[surah - 1]) {
      const nextVerse = await fetchAyah(surah, ayah + 1);
      output += `\n\n📖 ${surahName} - Ayah ${ayah + 1}\n\n${nextVerse.arabic}\n\n${nextVerse.translation}`;
    }

    document.getElementById("ayah-text").textContent = output;
  } catch (error) {
    console.error("❌ Error loading reflection:", error);
    document.getElementById("ayah-text").textContent = `Unable to load daily reflection: ${error.message}`;
  }
}

// ✅ Run on load
getDailyAyah();
