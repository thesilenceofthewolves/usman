async function getDailyAyah() {
  const totalAyahs = 6236;
  const today = new Date();
  const seed = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
  const hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const ayahNum = (hash * 17) % totalAyahs + 1; // Daily ayah number
  const translation = "en.kat"; // or "en.sahih"

  async function fetchAyah(num) {
    const [arRes, enRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/ayah/${num}/ar`),
      fetch(`https://api.alquran.cloud/v1/ayah/${num}/${translation}`)
    ]);

    const arData = await arRes.json();
    const enData = await enRes.json();

    return {
      ar: arData.data.text,
      en: enData.data.text,
      surah: enData.data.surah.englishName,
      numberInSurah: enData.data.numberInSurah,
      surahNumber: enData.data.surah.number,
      wordCount: enData.data.text.trim().split(/\s+/).length
    };
  }

  let output = "";
  const firstAyah = await fetchAyah(ayahNum);

  output += `${firstAyah.ar}\n${firstAyah.en} (${firstAyah.surah} ${firstAyah.numberInSurah})`;

  // If it's a short ayah, fetch the next one from the same surah
  if (firstAyah.wordCount < 5 && firstAyah.numberInSurah < 286) { // Prevent overflow in long surahs
    const nextAyahNumber = `${firstAyah.surahNumber}:${firstAyah.numberInSurah + 1}`;
    try {
      const [arRes, enRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/ayah/${nextAyahNumber}/ar`),
        fetch(`https://api.alquran.cloud/v1/ayah/${nextAyahNumber}/${translation}`)
      ]);

      const arData = await arRes.json();
      const enData = await enRes.json();

      output += `\n\n${arData.data.text}\n${enData.data.text} (${enData.data.surah.englishName} ${enData.data.numberInSurah})`;
    } catch (err) {
      console.warn("Couldn't fetch second ayah:", err);
    }
  }

  const container = document.getElementById("ayah-text");
  if (container) {
    container.textContent = output;
  }
}

getDailyAyah();
