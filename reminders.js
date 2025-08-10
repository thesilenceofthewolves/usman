async function getDailyAyahs() {
  const totalAyahs = 6236;
  const today = new Date();
  const seed = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
  const hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const ayah1Num = (hash * 17) % totalAyahs + 1;
  const ayah2Num = (hash * 23) % totalAyahs + 1;

  const translation = "en.kat"; // Change to "en.sahih" for Sahih International

  async function fetchAyah(num) {
    try {
      // Fetch Arabic and English in one call each
      const [arRes, enRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/ayah/${num}/ar`),
        fetch(`https://api.alquran.cloud/v1/ayah/${num}/${translation}`)
      ]);

      const arData = await arRes.json();
      const enData = await enRes.json();

      return `
        <div style="font-size: 1.4em; direction: rtl; text-align: right;">${arData.data.text}</div>
        <div style="margin-top: 0.5em; font-size: 1.1em;">${enData.data.text}</div>
        <div style="font-size: 0.9em; color: gray;">
          — Surah ${enData.data.surah.englishName} (${enData.data.surah.name}) ${enData.data.numberInSurah}
        </div>
      `;
    } catch (error) {
      return "<p>Error fetching ayah.</p>";
    }
  }

  const [ayah1HTML, ayah2HTML] = await Promise.all([
    fetchAyah(ayah1Num),
    fetchAyah(ayah2Num)
  ]);

  document.getElementById("ayah1").innerHTML = ayah1HTML;
  document.getElementById("ayah2").innerHTML = ayah2HTML;
}

getDailyAyahs();
