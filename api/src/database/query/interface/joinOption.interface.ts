export interface JoinOption {
  table: string;
  alias: string;
  type?: 'inner' | 'left';
  condition?: string;
}
