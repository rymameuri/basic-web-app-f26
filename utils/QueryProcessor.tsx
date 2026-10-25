export default function QueryProcessor(query: string): string {
  const q = query.toLowerCase();
  const nums = (q.match(/-?\d+/g) || []).map(Number);
  const ordinals = [
    "first", "second", "third", "fourth", "fifth", "sixth", "seventh",
    "eighth", "ninth", "tenth", "eleventh", "twelfth", "thirteenth",
    "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth",
    "nineteenth", "twentieth",
  ];
  ordinals.forEach((w, i) => {
    if (q.includes(w + " number") && q.includes("fibonacci")) nums.unshift(i + 1);
  });

  if (nums.length > 0) {
    if (q.includes("largest")) return String(Math.max(...nums));
    if (q.includes("smallest")) return String(Math.min(...nums));
    if (q.includes("square and a cube") || q.includes("square and cube")) {
      const hit = nums.filter((n) => {
        const r = Math.round(Math.cbrt(n));
        return n > 0 && Math.round(Math.sqrt(n)) ** 2 === n && r ** 3 === n;
      });
      return hit.join(", ");
    }
    if (q.includes("prime")) {
      const isPrime = (n: number) => {
        if (n < 2) return false;
        for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
        return true;
      };
      return nums.filter(isPrime).join(", ");
    }
    if (q.includes("power")) {
      let result = BigInt(1);
      for (let i = 0; i < nums[1]; i++) result = result * BigInt(nums[0]);
      return result.toString();
    }
    if (q.includes("fibonacci")) {
      let a = 0;
      let b = 1;
      for (let i = 0; i < nums[0]; i++) [a, b] = [b, a + b];
      return String(a);
    }
    const tokens = q.match(/-?\d+|plus|minus|multiplied by|times|divided by/g) || [];
    if (tokens.length >= 3) {
      // evaluate with usual precedence: * and / first, then + and -
      const terms: number[] = [Number(tokens[0])];
      const ops: string[] = [];
      for (let i = 1; i + 1 < tokens.length; i += 2) {
        const op = tokens[i];
        const n = Number(tokens[i + 1]);
        if (op === "multiplied by" || op === "times") {
          terms[terms.length - 1] *= n;
        } else if (op === "divided by") {
          terms[terms.length - 1] /= n;
        } else {
          ops.push(op);
          terms.push(n);
        }
      }
      let total = terms[0];
      ops.forEach((op, i) => {
        total = op === "plus" ? total + terms[i + 1] : total - terms[i + 1];
      });
      return String(total);
    }
  }

  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  const scrabble = q.match(/scrabble score of\s+([a-z]+)/);
  if (scrabble) {
    const points: { [letter: string]: number } = {};
    const groups: [string, number][] = [
      ["aeioulnstr", 1], ["dg", 2], ["bcmp", 3], ["fhvwy", 4],
      ["k", 5], ["jx", 8], ["qz", 10],
    ];
    groups.forEach(([letters, value]) =>
      letters.split("").forEach((l) => (points[l] = value))
    );
    return String(
      scrabble[1].split("").reduce((sum, l) => sum + (points[l] || 0), 0)
    );
  }

  if (q.includes("eiffel")) return "Paris";
  if (q.includes("james bond") && q.includes("dr no")) return "Sean Connery";
  if (q.includes("banana")) return "yellow";
  if (q.includes("spain") && q.includes("euro")) return "peseta";
  if (q.includes("theresa may")) return "2016";

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
