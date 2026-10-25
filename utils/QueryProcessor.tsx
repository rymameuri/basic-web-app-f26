export default function QueryProcessor(query: string): string {
  const math = query
    .toLowerCase()
    .match(/(-?\d+)\s*(plus|minus|multiplied by|times)\s*(-?\d+)/);
  if (math) {
    const a = parseInt(math[1]);
    const b = parseInt(math[3]);
    if (math[2] === "plus") return String(a + b);
    if (math[2] === "minus") return String(a - b);
    return String(a * b);
  }

  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "rameuri";
  }

  if (query.toLowerCase().includes("name")) {
    return "rym";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }



  return "";
}
