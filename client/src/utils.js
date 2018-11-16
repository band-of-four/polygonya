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

export function pickRandom(array) {
  /* https://stackoverflow.com/a/4550514/1726690 */
  return array[Math.floor(Math.random() * array.length)];
}

/* https://stackoverflow.com/a/11404121/1726690 */
const transliterationTable = {'Ё':'YO','Й':'I','Ц':'TS','У':'U','К':'K','Е':'E','Н':'N','Г':'G','Ш':'SH','Щ':'SCH','З':'Z','Х':'H','Ъ':'\'','ё':'yo','й':'i','ц':'ts','у':'u','к':'k','е':'e','н':'n','г':'g','ш':'sh','щ':'sch','з':'z','х':'h','ъ':'\'','Ф':'F','Ы':'I','В':'V','А':'A','П':'P','Р':'R','О':'O','Л':'L','Д':'D','Ж':'ZH','Э':'E','ф':'f','ы':'i','в':'v','а':'a','п':'p','р':'r','о':'o','л':'l','д':'d','ж':'zh','э':'e','Я':'Ya','Ч':'CH','С':'S','М':'M','И':'I','Т':'T','Ь':'\'','Б':'B','Ю':'YU','я':'ya','ч':'ch','с':'s','м':'m','и':'i','т':'t','ь':'\'','б':'b','ю':'yu'};

export function transliterateName(name) {
  return name.split('').map((c) => transliterationTable[c] || c).join('');
}
