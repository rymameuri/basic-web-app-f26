export default function QueryProcessor(query: string): string {
  const q = query.toLowerCase();
  const nums = (q.match(/-?\d+/g) || []).map(Number);

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
    if (nums.length >= 2) {
      if (q.includes("plus")) return String(nums.reduce((x, y) => x + y, 0));
      if (q.includes("minus")) return String(nums[0] - nums[1]);
      if (q.includes("multiplied by") || q.includes("times"))
        return String(nums.reduce((x, y) => x * y, 1));
      if (q.includes("divided by")) return String(nums[0] / nums[1]);
    }
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
