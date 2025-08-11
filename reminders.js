async function getDailyAyah() {
  const totalAyahs = 6236;
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const globalAyahNum = (hash * 17) % totalAyahs + 1;

  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/fawazahmed0/quran-api/1/editions/eng-mustafakhattab/${globalAyahNum}.json`
    );
    const json = await res.json();

    const { text, surah, numberInSurah } = json;

    const arabicRes = await fetch(
      `https://raw.githubusercontent.com/fawazahmed0/quran-api/1/editions/ara-quranuthmani/${globalAyahNum}.json`
    );
    const arabicJson = await arabicRes.json();

    const arabicText = arabicJson.text;

    const container = document.getElementById("ayah-text");
    if (container) {
      container.textContent = `📖 ${surah.englishName} — Ayah ${numberInSurah}\n\n${arabicText}\n\n${text}`;
    }
  } catch (err) {
    console.error("Error fetching Ayah:", err);
    const container = document.getElementById("ayah-text");
    if (container) container.textContent = "Unable to load daily reflection.";
  }
}

getDailyAyah();
