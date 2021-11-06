import { Voiture as TVoiture } from "../api/voiture/Voiture";

export const VOITURE_TITLE_FIELD = "immatriculation";

export const VoitureTitle = (record: TVoiture): string => {
  return record.immatriculation || record.id;
};
