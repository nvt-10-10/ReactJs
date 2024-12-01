export const quote = {
  create: {
    action: "quote/create",
    permissions: ["business", "supplier"],
  },

  update: {
    action: "quote/update",
    permissions: ["business", "supplier"],
  },

  delete: {
    action: "quote/delete",
    permissions: ["business", "supplier"],
  },

  register: {
    action: "quote/register",
    permissions: ["business", "supplier"],
  },
};
