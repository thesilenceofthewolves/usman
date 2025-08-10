async function getDailyAyah() {
  const totalAyahs = 6236;
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const globalAyahNum = (hash * 17) % totalAyahs + 1;

  try {
    const resArabic = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/ar.alafasy`);
    const jsonArabic = await resArabic.json();
    if (jsonArabic.code !== 200 || !jsonArabic.data) throw new Error("Arabic verse not found");

    const resEnglish = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/en.clear`);
    const jsonEnglish = await resEnglish.json();
    if (jsonEnglish.code !== 200 || !jsonEnglish.data) throw new Error("English translation not found");

    console.log("Arabic:", jsonArabic.data.text);
    console.log("English:", jsonEnglish.data.text);

    const surahName = jsonEnglish.data.surah.englishName;
    const ayahNumber = jsonEnglish.data.numberInSurah;

    const arabicText = jsonArabic.data.text;
    const translation = jsonEnglish.data.text;

    const container = document.getElementById("ayah-text");
    if (container) {
      container.textContent = `📖 ${surahName} — Ayah ${ayahNumber}\n\n${arabicText}\n\n${translation}`;
    }
  } catch (err) {
    console.error("Error loading ayah:", err);
    const container = document.getElementById("ayah-text");
    if (container) container.textContent = "Unable to load daily reflection.";
  }
}

getDailyAyah();
