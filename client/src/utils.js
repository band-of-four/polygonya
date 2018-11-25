export async function withDelay(delayMillis, action) {
  const actionStartMillis = Date.now();

  try {
    const ret = await action;
    const delay = actionStartMillis + delayMillis - Date.now();
    if (delay > 0) await new Promise((resolve) => setTimeout(() => resolve(), delay));
    return ret;
  }
  catch (e) {
    const delay = actionStartMillis + delayMillis - Date.now();
    if (delay > 0) await new Promise((resolve) => setTimeout(() => resolve(), delay));
    throw e;
  }
}

export function postJson(url, payload) {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

export function get(url) {
  return fetch(url, {
    method: 'GET',
    credentials: 'include'
  });
}

export const httpDelete = (url) =>
  fetch(url, { method: 'DELETE', credentials: 'include' });
