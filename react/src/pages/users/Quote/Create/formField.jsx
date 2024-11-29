import { price } from "../../../../enum/price";

export const formFiled = (category) => [
  {
    label: "Tên sản phẩm",
    placeholder: "Nhập tên sản phẩm",
    type: "text",
    id: "name",
    name: "name",
    isRequired: true,
    cols: {
      xs: 12,
    },
  },

  {
    label: "Mô tả sản phẩm",
    placeholder:
      "Ví dụ: Cần báo giá áo thun hot trend, chất lượng cotton 100% mềm mịn.. Mẫu như hình đính kèm, lấy hàng thường xuyên",
    type: "textarea",
    id: "discription",
    name: "discription",
    isRequired: true,
    cols: {
      xs: 12,
    },
  },

  {
    label: "Danh mục",
    placeholder: "Chọn danh mục",
    type: "select",
    id: "category",
    name: "category",
    isRequired: true,
    options: category,
    cols: {
      xs: 12,
    },
    isMulti: true,
    selectType: "select2",
  },

  {
    label: "Số lượng",
    placeholder: "Nhập số lượng",
    type: "number",
    id: "quantity",
    name: "quantity",
    isRequired: true,
    cols: {
      xs: 12,
      md: 7,
    },
  },

  {
    label: "",
    placeholder: "Nhập đơn vị",
    type: "text",
    id: "unit",
    name: "unit",
    cols: {
      xs: 12,
      md: 5,
    },
    isRequired: true,
    showEm: false,
  },

  {
    label: "Giá mong muốn",
    placeholder: "Nhập số lượng",
    type: "text",
    id: "price",
    name: "price",
    isRequired: false,
    cols: {
      xs: 12,
      md: 7,
    },
  },

  {
    label: "",
    placeholder: "Chọn giá tiền",
    type: "select",
    id: "price_unit",
    name: "price_unit",
    options: price,
    isRequired: false,
    cols: {
      xs: 12,
      md: 5,
    },
  },
];
