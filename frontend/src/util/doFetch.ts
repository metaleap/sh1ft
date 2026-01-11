
export async function doFetch<TArgs, TResult>(path: string, args: TArgs): Promise<TResult> {
  const resp = await fetch("http://localhost:54321" + path, { body: JSON.stringify(args), method: 'POST' })
  if (!resp.ok)
    throw resp.statusText + ":" + (await resp.text())

  return (await resp.json()) as TResult
}
