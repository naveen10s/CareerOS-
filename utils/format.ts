/**
 * Formats a date string into a clean readable layout.
 * @param dateStr ISO date string or short date (e.g. "2024-03")
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  if (dateStr.toLowerCase() === "present") return "Present";

  try {
    const parts = dateStr.split("-");
    if (parts.length === 2) {
      // e.g. "2024-03" -> "March 2024"
      const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1);
      return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    }
    const parsedDate = new Date(dateStr);
    if (isNaN(parsedDate.getTime())) return dateStr;
    return parsedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}
