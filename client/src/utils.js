export const delay = async (delayMillis) =>
  await new Promise((resolve) => setTimeout(() => resolve(), delayMillis));
