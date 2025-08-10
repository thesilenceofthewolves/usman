async function fetchAyah(surah, ayah) {
  const key = `${surah}:${ayah}`;
  const url = `https://api.quran.com/api/v4/verses/by_key/${key}?language=en&translations=131&words=false`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("API Response:", data); // Debugging

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
