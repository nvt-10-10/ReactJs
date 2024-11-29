import z from "zod";

const createQuoteSchema = z
  .object({
    // Tên
    name: z
      .string()
      .min(3, "Tên phải có ít nhất 3 ký tự")
      .max(100, "Tên không được vượt quá 100 ký tự")
      .nonempty("Tên không được để trống"),

    // Mô tả
    description: z
      .string()
      .max(500, "Mô tả không được vượt quá 500 ký tự")
      .optional(),

    // Danh mục
    category: z
      .array(z.number()) // yêu cầu là mảng các chuỗi
      .min(1, "Ít nhất 1 thể loại là bắt buộc") // yêu cầu phải có ít nhất 1 thể loại
      .default([]), // nếu không có giá trị, mặc định là mảng rỗng

    // Số lượng
    quantity: z
      .union([z.string().transform((val) => Number(val)), z.number()])
      .refine((value) => value >= 1, {
        message: "Số lượng phải lớn hơn hoặc bằng 1",
      })
      .optional(),

    // Đơn vị
    unit: z
      .string()
      .max(50, "Đơn vị không được vượt quá 50 ký tự")
      .nonempty("Đơn vị không được để trống"),

    // Giá - cho phép null và chuyển đổi chuỗi thành số
    price: z
      .union([z.string().transform((val) => Number(val)), z.number()])
      .nullable() // Cho phép null
      .refine((val) => val === null || val >= 0, {
        message: "Giá phải lớn hơn hoặc bằng 0",
      })
      .optional(),

    // Đơn vị giá
    price_unit: z
      .string()
      .max(50, "Đơn vị giá không được vượt quá 50 ký tự")
      .optional(),

    images: z
      .array(z.instanceof(File))
      .min(1, "Vui lòng chọn ít nhất 1 hình ảnh")
      .max(5, "Chỉ được tải tối đa 5 hình ảnh")
      .optional(),
  })
  .superRefine((data, ctx) => {
    // Kiểm tra nếu có giá thì đơn vị giá phải có
    if (
      data.price !== null &&
      data.price !== undefined &&
      data.price !== 0 &&
      !data.price_unit
    ) {
      ctx.addIssue({
        path: ["price_unit"],
        message: "Khi có giá thì đơn vị giá là bắt buộc",
        code: z.ZodIssueCode.custom,
      });
    }

    // Kiểm tra nếu không có giá thì đơn vị phải có
    if (data.price === null || data.price === undefined) {
      if (!data.unit) {
        ctx.addIssue({
          path: ["unit"],
          message: "Nếu không có giá thì đơn vị là bắt buộc",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export default createQuoteSchema;
