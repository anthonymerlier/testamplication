import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const VoitureEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Immatriculation" source="immatriculation" />
      </SimpleForm>
    </Edit>
  );
};
