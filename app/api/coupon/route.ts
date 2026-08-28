// FIXED CODE:
//
// const couponUsage = new Map<string, Set<string>>();
//
// export async function POST(request: Request) {
//   const body = await request.json();
//   const { code, currentTotal } = body as { code: string; currentTotal: number };
//
//   const sessionId = request.headers.get("x-session-id") ?? "anonymous";
//
//   if (code === "SAVE20") {
//     const usedCodes = couponUsage.get(sessionId) ?? new Set<string>();
//     if (usedCodes.has(code)) {
//       return Response.json(
//         { valid: false, message: "This coupon has already been used." },
//         { status: 400 }
//       );
//     }
//
//     usedCodes.add(code);
//     couponUsage.set(sessionId, usedCodes);
//
//     const newTotal = parseFloat((currentTotal * 0.8).toFixed(2));
//     return Response.json({ valid: true, discountPercent: 20, newTotal });
//   }
//
//   return Response.json(
//     { valid: false, message: "Invalid coupon code. Please try again." },
//     { status: 400 }
//   );
// }


export async function POST(request: Request) {
  const body = await request.json();
  const { code, currentTotal } = body as {
    code: string;
    currentTotal: number;
  };

  if (code === "SAVE20") {
    const newTotal = parseFloat((currentTotal * 0.8).toFixed(2));
    return Response.json({
      valid: true,
      discountPercent: 20,
      newTotal,
    });
  }

  return Response.json(
    { valid: false, message: "Invalid coupon code. Please try again." },
    { status: 400 }
  );
}
