import { Repository } from 'typeorm';
import { User } from 'src/entities';

export const findAllUsers = async (
  userRepository: Repository<User>,
  take: number = 10, // Số lượng bản ghi mỗi trang
  page: number = 1, // Số trang hiện tại
  search?: string, // Tìm kiếm theo tên
  country?: number, // Lọc theo quốc gia
  categoryId?: string, // Lọc theo category
  roleId: number = 2, // Mặc định lọc theo roleId = 2
  isGetLength: boolean = false, // Lấy cả tổng số bản ghi hay không
): Promise<any[] | [any[], number]> => {
  const query = userRepository.createQueryBuilder('user');

  // Lọc theo status nếu có
  query.where('user.status = :status', { status: true }); // Giả sử status luôn là true

  // Lọc theo roleId nếu có
  if (roleId) {
    query.andWhere('user.roleId = :roleId', { roleId });
  }

  // Lọc theo country nếu có
  if (country) {
    query.andWhere('user.country = :country', { country });
  }

  // Lọc theo category nếu có (join với bảng categories)
  if (categoryId && categoryId !== 'all') {
    query
      .innerJoinAndSelect('user.categories', 'category')
      .andWhere('category.id = :categoryId', { categoryId });
  }

  // Tìm kiếm theo tên người dùng nếu có
  if (search) {
    query.andWhere('user.name LIKE :search', { search: `%${search}%` });
  }

  // Phân trang
  query.take(take); // Số bản ghi mỗi trang
  query.skip((page - 1) * take); // Bỏ qua số bản ghi của các trang trước

  // Trả về số lượng bản ghi và dữ liệu nếu cần thiết
  if (isGetLength) {
    return await query.getManyAndCount(); // Trả về dữ liệu và tổng số bản ghi
  }

  return await query.getMany(); // Chỉ trả về dữ liệu
};
