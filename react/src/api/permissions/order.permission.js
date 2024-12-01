export const order = {
  create: {
    action: "order/create",
    permissions: ["business", "supplier"],
  },

  update: {
    action: "order/update",
    permissions: ["business", "supplier"],
  },

  delete: {
    action: "order/delete",
    permissions: ["business", "supplier"],
  },
};
