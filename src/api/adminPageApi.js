const API_BASE = 'https://donda-puppies-backend.onrender.com/api/admin';

export const getDashboardData = async (token) => {
  try {
    const res = await fetch(`${API_BASE}/dashboard-stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch dashboard data");
    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};

const adminPageApi = {
  getDashboardData,
};

export default adminPageApi;

// (node:28364) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
// (Use `node --trace-deprecation ...` to show where the warning was created)
// (node:28364) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.