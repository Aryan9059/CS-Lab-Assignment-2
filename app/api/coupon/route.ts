// POST /api/coupon
// Body:    { code: string; currentTotal: number }
// Returns: { valid: true; discountPercent: 20; newTotal: number }
//       or { valid: false; message: string }
//
// ⚠️  BUSINESS LOGIC FLAW — COUPON STACKING / UNLIMITED REUSE
// ─────────────────────────────────────────────────────────────
// The developer assumes SAVE20 will only be applied once.
// However, the server is completely stateless:
//   • No session tracking
//   • No database record of how many times the coupon was used
//   • Trusts the client-provided `currentTotal` blindly
//
// An attacker can call this endpoint repeatedly, each time
// passing the already-discounted total. The server happily
// applies another 20% off, compounding the discount:
//
//   Call #1: 5000 × 0.8 = 4000
//   Call #2: 4000 × 0.8 = 3200
//   Call #3: 3200 × 0.8 = 2560
//   ...
//
// Cybersec angle: Manipulation of transaction state /
//                 unauthorized business action authorization.

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
