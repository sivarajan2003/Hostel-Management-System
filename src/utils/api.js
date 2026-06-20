// Central API utility for Hostel Management System
// Base URL: set VITE_API_BASE in .env or defaults to empty (uses Vite proxy)
const API_BASE = import.meta.env.VITE_API_BASE || "";
const BASE = `${API_BASE}/api/v1/hostel`;

function getToken() {
  return localStorage.getItem("token") || "";
}

async function request(method, url, body = null) {
  const token = getToken();
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(url, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || data?.error || "Request failed");
  }
  return data?.data ?? data;
}

// ── Dashboard ──────────────────────────────────────────────
export const dashboardApi = {
  getStats: () => request("GET", `${BASE}/dashboard/stats`),
  getRevenue: (filter = "This Month") =>
    request("GET", `${BASE}/dashboard/revenue?filter=${encodeURIComponent(filter)}`),
  getRecentCheckins: () => request("GET", `${BASE}/dashboard/checkins`),
};

// ── Rooms ──────────────────────────────────────────────────
export const roomsApi = {
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request("GET", `${BASE}/rooms${q ? "?" + q : ""}`);
  },
  getStats: () => request("GET", `${BASE}/rooms/stats`),
  create: (data) => request("POST", `${BASE}/rooms`, data),
  update: (id, data) => request("PUT", `${BASE}/rooms/${id}`, data),
  remove: (id) => request("DELETE", `${BASE}/rooms/${id}`),
};

// ── Residents ──────────────────────────────────────────────
export const residentsApi = {
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request("GET", `${BASE}/residents${q ? "?" + q : ""}`);
  },
  getStats: () => request("GET", `${BASE}/residents/stats`),
  getById: (id) => request("GET", `${BASE}/residents/${id}`),
  create: (data) => request("POST", `${BASE}/residents`, data),
  update: (id, data) => request("PUT", `${BASE}/residents/${id}`, data),
  remove: (id) => request("DELETE", `${BASE}/residents/${id}`),
};

// ── Attendance ─────────────────────────────────────────────
export const attendanceApi = {
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request("GET", `${BASE}/attendance${q ? "?" + q : ""}`);
  },
  getStats: (date) =>
    request("GET", `${BASE}/attendance/stats${date ? "?date=" + date : ""}`),
  updateStatus: (data) => request("POST", `${BASE}/attendance/status`, data),
};

// ── Food ───────────────────────────────────────────────────
export const foodApi = {
  getSchedule: () => request("GET", `${BASE}/food`),
  addMenuItem: (data) => request("POST", `${BASE}/food`, data),
  updateMenuItem: (id, data) => request("PUT", `${BASE}/food/${id}`, data),
  deleteMenuItem: (id) => request("DELETE", `${BASE}/food/${id}`),
};

// ── Vacated ────────────────────────────────────────────────
export const vacatedApi = {
  getAll: () => request("GET", `${BASE}/vacated`),
  vacate: (data) => request("POST", `${BASE}/vacated`, data),
};

// ── Payments ───────────────────────────────────────────────
export const paymentsApi = {
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request("GET", `${BASE}/payments${q ? "?" + q : ""}`);
  },
  getStats: () => request("GET", `${BASE}/payments/stats`),
  create: (data) => request("POST", `${BASE}/payments`, data),
  updateStatus: (id, status) =>
    request("PATCH", `${BASE}/payments/${id}/status`, { status }),
};
// ── documents ───────────────────────────────────────────────
export const documentsApi = {
  getAll: () =>
    request("GET", `${BASE}/documents`),

  remove: (id) =>
    request("DELETE", `${BASE}/documents/${id}`),

  create: async (formData) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${BASE}/documents`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data?.message || "Upload failed"
      );
    }

    return data?.data ?? data;
  },
};
//reviews
export const reviewsApi = {
  getAll: () =>
    request("GET", `${BASE}/reviews`),

  create: (data) =>
    request("POST", `${BASE}/reviews`, data),
};
//complaint
// export const complaintsApi = {

//   getAll: (params = {}) => {

//     const q =
//       new URLSearchParams(
//         params
//       ).toString();

//     return request(
//       "GET",
//       `${BASE}/complaints${q ? "?" + q : ""}`
//     );
//   },

//   create: (data) =>
//     request(
//       "POST",
//       `${BASE}/complaints`,
//       data
//     ),

//   updateStatus: (
//     id,
//     status
//   ) =>
//     request(
//       "PATCH",
//       `${BASE}/complaints/${id}/status`,
//       { status }
//     ),
// };
export const complaintsApi = {

getAll: (params = {}) => {
const q = new URLSearchParams(params).toString();

return request(
"GET",
`${BASE}/complaints${q ? "?" + q : ""}`
);
},

create: (data) =>
request(
"POST",
`${BASE}/complaints`,
data
),

updateStatus: (id, status) =>
request(
"PATCH",
`${BASE}/complaints/${id}/status`,
{ status }
),

};
// ── Visitors ───────────────────────────────────────────────
export const visitorsApi = {
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request("GET", `${BASE}/visitors${q ? "?" + q : ""}`);
  },
  create: (data) => request("POST", `${BASE}/visitors`, data),
  updateStatus: (id, status) =>
    request("PATCH", `${BASE}/visitors/${id}/status`, { status }),
};
