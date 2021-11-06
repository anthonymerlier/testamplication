import { VoitureWhereInput } from "./VoitureWhereInput";
import { VoitureOrderByInput } from "./VoitureOrderByInput";

export type VoitureFindManyArgs = {
  where?: VoitureWhereInput;
  orderBy?: VoitureOrderByInput;
  skip?: number;
  take?: number;
};
