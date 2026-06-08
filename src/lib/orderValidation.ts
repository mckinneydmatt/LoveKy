export interface CheckoutOrderInput {
  name: string;
  email: string;
  phone: string;
  deliveryDate: string;
  quantity: number;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryZip: string;
  instructions: string;
  disclaimerAck: boolean;
}

export function parseCheckoutBody(body: unknown): CheckoutOrderInput | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const data = body as Record<string, unknown>;

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const deliveryDate = String(data.deliveryDate ?? "").trim();
  const deliveryAddress = String(data.deliveryAddress ?? "").trim();
  const deliveryCity = String(data.deliveryCity ?? "").trim();
  const deliveryZip = String(data.deliveryZip ?? "").trim();
  const instructions = String(data.instructions ?? "").trim();
  const disclaimerAck = data.disclaimerAck === true || data.disclaimerAck === "true";
  const quantity = Number(data.quantity);

  if (!name) return { error: "Name is required" };
  if (!email || !email.includes("@")) return { error: "A valid email is required" };
  if (!phone) return { error: "Phone is required" };
  if (!deliveryDate) return { error: "Delivery date is required" };
  if (!deliveryAddress) return { error: "Delivery address is required" };
  if (!deliveryCity) return { error: "City is required" };
  if (!deliveryZip) return { error: "ZIP code is required" };
  if (!Number.isInteger(quantity) || quantity < 1) {
    return { error: "Quantity must be at least 1" };
  }
  if (!disclaimerAck) return { error: "You must agree to the disclaimer" };

  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const requestedDate = new Date(`${deliveryDate}T00:00:00`);
  if (Number.isNaN(requestedDate.getTime()) || requestedDate < tomorrow) {
    return { error: "Delivery date must be tomorrow or later" };
  }

  return {
    name,
    email,
    phone,
    deliveryDate,
    quantity,
    deliveryAddress,
    deliveryCity,
    deliveryZip,
    instructions,
    disclaimerAck,
  };
}
