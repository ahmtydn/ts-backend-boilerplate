export function successMessage(locale: string = 'en', statusKey: string): string {
  const customMessages = {};

  return customMessages[statusKey][locale];
}
