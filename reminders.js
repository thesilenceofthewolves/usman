async function getDailyAyah() {
  const totalAyahs = 6236;
  const today = new Date();
  const seed = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
  const hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const ayahNum1 = (hash * 17) % totalAyahs + 1;
  const ayahNum2 = (hash * 23) % totalAyahs + 1;

  const translation = "en.kat"; // Use "en.sahih" if you prefer Sahih International

  async function fetchAyah(num) {
    const [arRes, enRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/ayah/${num}/ar`),
      fetch(`https://api.alquran.cloud/v1/ayah/${num}/${translation}`)
    ]);

    const ar = await arRes.json();
    const en = await enRes.json();

    return {
      ar: ar.data.text,
      en: en.data.text,
      surah: en.data.surah.englishName,
      number: en.data.numberInSurah,
      wordCount: en.data.text.split(" ").length
    };
  }

  const ayah1 = await fetchAyah(ayahNum1);

  let output = `${ayah1.ar}\n${ayah1.en} (${ayah1.surah} ${ayah1.number})`;

  if (ayah1.wordCount < 5) {
    const ayah2 = await fetchAyah(ayahNum2);
    output += `\n\n${ayah2.ar}\n${ayah2.en} (${ayah2.surah} ${ayah2.number})`;
  }

  const container = document.getElementById("ayah-text");
  if (container) {
    container.textContent = output;
  }
}

getDailyAyah();
