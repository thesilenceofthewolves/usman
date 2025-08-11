async function getDailyAyah() {
  const totalAyahs = 6236;
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const globalAyahNum = (hash * 17) % totalAyahs + 1;

  try {
    // Use the latest version of the Fawaz API (remove @1)
    const eng = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api/editions/eng-mustafakhattab/${globalAyahNum}.json`).then(r => r.json());
    const ar = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api/editions/ara-uthmani/${globalAyahNum}.json`).then(r => r.json());

    const arabicText = ar.text;
    const translation = eng.text;
    const surahName = eng.surah.name;
    const ayahNumber = eng.ayah;

    const container = document.getElementById("ayah-text");
    if (container) {
      container.textContent = `📖 ${surahName} — Ayah ${ayahNumber}\n\n${arabicText}\n\n${translation}`;
    }

  } catch (err) {
    console.error("Error fetching Ayah:", err);
    const container = document.getElementById("ayah-text");
    if (container) container.textContent = "Unable to load daily reflection.";
  }
}

getDailyAyah();
