export async function apiGet<T = any>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`API GET failed: ${response.statusText}`)
  }

  return response.json()
}

export async function apiPost<T = any>(url: string, data: any): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`API POST failed: ${response.statusText}`)
  }

  return response.json()
}