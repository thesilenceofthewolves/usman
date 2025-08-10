try {
  const res = await fetch(`https://api.alquran.cloud/v1/ayah/${globalAyahNum}/en.clear`);
  const json = await res.json();
  console.log(json); // <-- add this line to inspect
  if (json.code !== 200 || !json.data) throw new Error("Verse not found");

  // then extract
} catch(err) {
  console.error(err);
}
