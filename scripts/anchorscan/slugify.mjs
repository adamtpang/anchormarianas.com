export function slugify(value, fallback = "business") {
  return (
    String(value || fallback)
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60) || fallback
  )
}

export function publishedReadSlug(name, location = "") {
  const base = slugify(name)
  const isGuamBusiness = /\bguam\b/i.test(`${name} ${location}`)
  const alreadyNamesGuam = base.split("-").includes("guam")
  return isGuamBusiness && !alreadyNamesGuam ? `${base}-guam` : base
}
