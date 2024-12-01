export interface JoinOption {
  table: string;
  alias: string;
  type?: 'inner' | 'left' | 'many-to-many';
  condition?: string;
  joinTable?: string; // Bảng trung gian cho many-to-many
  joinTableAlias?: string; // Alias cho bảng trung gian
}
