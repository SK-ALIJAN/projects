declare namespace Common {
  type ID = string | number;
  type Nullable<T> = T | null;
  type Optional<T> = T | undefined;

  interface BaseEntity {
    id: ID;
    createdAt: string;
    updatedAt: string;
  }
}
