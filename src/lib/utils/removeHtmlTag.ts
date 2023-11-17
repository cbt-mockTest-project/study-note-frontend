export const removeHtmlTag = (String: string = "") =>
  String.replace(/<[^>]*>?/g, "");
