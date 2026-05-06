// lib/bookingUrl.ts
export type BookingUrlParams = {
  room?: string | number;
  checkIn?: string; // ISO: YYYY-MM-DD
  checkOut?: string; // ISO: YYYY-MM-DD
  adults?: number;
  children?: number;
  price?: number;
};

/**
 * Будує URL виду /booking?room=...&checkIn=...&checkOut=...
 * Пропускає undefined / null / "" / 0-для-price.
 */
export function buildBookingUrl(params: BookingUrlParams = {}): string {
  const sp = new URLSearchParams();

  if (params.room !== undefined && params.room !== null && params.room !== "") {
    sp.set("room", String(params.room));
  }
  if (params.checkIn) sp.set("checkIn", params.checkIn);
  if (params.checkOut) sp.set("checkOut", params.checkOut);
  if (typeof params.adults === "number" && params.adults > 0) {
    sp.set("adults", String(params.adults));
  }
  if (typeof params.children === "number" && params.children >= 0) {
    sp.set("children", String(params.children));
  }
  if (typeof params.price === "number" && params.price > 0) {
    sp.set("price", String(params.price));
  }

  const qs = sp.toString();

  return qs ? `/booking?${qs}` : "/booking";
}
