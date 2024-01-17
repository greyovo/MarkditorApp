

export async function getMarkdownExample() {
  const resp = await fetch("./example.md")
  return resp.text()
}