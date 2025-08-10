async function getDailyAyah() {
  const totalAyahs = 6236;
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const ayahNum = (hash * 17) % totalAyahs + 1;
  const translator = "en.kat"; // Mustafa Khattab

  async function fetchAyah(num) {
    const [arRes, trRes] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/ayah/${num}/ar`),
      fetch(`https://api.alquran.cloud/v1/ayah/${num}/${translator}`)
    ]);
    const arData = await arRes.json();
    const trData = await trRes.json();
    return {
      ar: arData.data.text,
      tr: trData.data.text,
      surah: trData.data.surah.englishName,
      number: trData.data.numberInSurah,
      wordCount: trData.data.text.trim().split(/\s+/).length
    };
  }

  try {
    const v1 = await fetchAyah(ayahNum);
    let output = `${v1.ar}\n${v1.tr}\n(${v1.surah} ${v1.number})`;

    if (v1.wordCount < 5 && v1.number < 286) {
      const nextNum = `${v1.surah}:${v1.number + 1}`;
      const v2 = await fetchAyah(nextNum);
      output += `\n\n${v2.ar}\n${v2.tr}\n(${v2.surah} ${v2.number})`;
    }

    const container = document.getElementById("ayah-text");
    if (container) container.textContent = output;
  } catch (err) {
    console.error(err);
    const container = document.getElementById("ayah-text");
    if (container) container.textContent = "Unable to load daily reflection at the moment.";
  }
}

getDailyAyah();
