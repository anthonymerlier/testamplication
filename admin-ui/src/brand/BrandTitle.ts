import { Brand as TBrand } from "../api/brand/Brand";

export const BRAND_TITLE_FIELD = "name";

export const BrandTitle = (record: TBrand): string => {
  return record.name || record.id;
};
