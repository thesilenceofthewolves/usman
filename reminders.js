async function getDailyAyah() {
  const totalAyahs = 6236;
  // Generate a consistent daily Ayah number based on date
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const globalAyahNum = (hash * 17) % totalAyahs + 1;

  try {
    // Fetch the ayah with Mustafa Khattab translation (en.clear)
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/ar.alafasy,en.clear`);
    const json = await res.json();

    if (json.code !== 200 || !json.data) throw new Error("Verse not found");

    const data = json.data;

    // Arabic text (from the 'ar.alafasy' recitation in the same response)
    const arabicText = data.text;

    // English translation (Mustafa Khattab)
    // It's inside data.translations, but since the API returns multiple translations separated by commas, 
    // we need to pick the right one.
    // The API sends one object, so usually the translation text is in `data.text` for single translation requests.
    // But with multiple editions requested, the API returns an array inside data.editions

    // So to be sure, let's fetch editions separately:
    // but here, since you requested `ar.alafasy,en.clear` it returns an array of editions inside data.editions.

    // However, the API for multiple editions returns:
    // {
    //   code: 200,
    //   status: "OK",
    //   data: [
    //     { text: "...", edition: {...}, ... },
    //     { text: "...", edition: {...}, ... }
    //   ]
    // }
    // So json.data will be an array

    // So adjust the code below to handle that:

    if (!Array.isArray(json.data)) throw new Error("Unexpected data format");

    const arabicEdition = json.data.find(e => e.edition.language === "ar" && e.edition.identifier === "ar.alafasy");
    const translationEdition = json.data.find(e => e.edition.language === "en" && e.edition.identifier === "en.clear");

    if (!arabicEdition || !translationEdition) throw new Error("Required editions not found");

    const surahName = translationEdition.surah.englishName;
    const ayahNumber = translationEdition.numberInSurah;

    const arabic = arabicEdition.text;
    const translation = translationEdition.text;

    // Update the container text
    const container = document.getElementById("ayah-text");
    if (container) {
      container.textContent = `📖 ${surahName} — Ayah ${ayahNumber}\n\n${arabic}\n\n${translation}`;
    }
  } catch (err) {
    console.error("Error loading ayah:", err);
    const container = document.getElementById("ayah-text");
    if (container) container.textContent = "Unable to load daily reflection.";
  }
}

getDailyAyah();
