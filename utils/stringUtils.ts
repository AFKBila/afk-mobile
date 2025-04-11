/**
 * Generates initials from a name
 * For single names: returns the first letter
 * For multiple names: returns the first letter of the first and second names
 * Falls back to a default character if no valid name is provided
 */
export const getInitials = (
  name: string | undefined | null,
  defaultChar: string = "?"
): string => {
  if (!name) return defaultChar;

  // Split the name into parts and filter out empty parts
  const nameParts = name.split(" ").filter((part) => part.length > 0);

  // If no valid parts, return default
  if (nameParts.length === 0) return defaultChar;

  // If single name, return first letter
  if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();

  // If multiple names, return first letter of first and last name
  return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
};

/**
 * Formats a name for display
 * Capitalizes the first letter of each word
 */
export const formatName = (name: string | undefined | null): string => {
  if (!name) return "";

  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Truncates text to a specified length and adds ellipsis if needed
 */
export const truncateText = (
  text: string | undefined | null,
  maxLength: number
): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + "...";
};
