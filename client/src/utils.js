export async function withDelay(delayMillis, action) {
  const actionStartMillis = Date.now();

  const ret = await action;

  const delay = actionStartMillis + delayMillis - Date.now();
  if (delay > 0)
    await new Promise((resolve) => setTimeout(() => resolve(), delay));

  return ret;
}

export function postJson(url, payload) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
