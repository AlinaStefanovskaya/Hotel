//запрос на получение номеров и их характеристик
import { groq } from "next-sanity";

export const roomsQuery = groq`
  *[_type == "room" && !(_id in path("drafts.**"))]{
    _id,
    room_id,
    room_name,
    room_description,
    room_price,
    room_size,
    room_beds,
    room_max_people,
    room_max_child,
    room_photos,
    room_additions,
    "room_unavailable_ranges": coalesce(room_unavailable_ranges, [])
  } | order(room_id asc)
`;

// Всі активні бронювання (підтверджені + на модерації) для перевірки доступності
export const activeBookingsQuery = groq`
  *[_type == "booking" && status in ["confirmed", "pending"]]{
    rent_from,
    rent_to,
    "roomId": room._ref
  }
`;

// Активні бронювання конкретного номера (для сторінки деталей)
export const roomBookingsQuery = groq`
  *[_type == "booking" && room._ref == $roomId && status in ["confirmed", "pending"]]{
    rent_from,
    rent_to
  }
`;

export const roomByIdQuery = groq`
  *[_type == "room" && _id == $id && !(_id in path("drafts.**"))][0]{
    _id,
    room_id,
    room_name,
    room_description,
    room_price,
    room_size,
    room_beds,
    room_max_people,
    room_max_child,
    room_photos,
    room_additions,
    "room_unavailable_ranges": coalesce(room_unavailable_ranges, [])
  }
`;
