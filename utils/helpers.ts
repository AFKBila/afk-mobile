/**
 * Capitalizes the first letter of a string
 * @param string The string to capitalize
 * @returns The string with the first letter capitalized
 */
export const capitalizeFirstLetter = (string: string): string => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
