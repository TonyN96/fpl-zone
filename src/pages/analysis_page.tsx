import React from "react";

import { PlayerComparison } from "components/comparison";
import { AppLayout, ComponentContainer } from "components/layout";

export const AnalysisPage = (): JSX.Element => {
  return (
    <AppLayout active='analysis' direction='row'>
      <ComponentContainer title='comparison'><PlayerComparison /></ComponentContainer>
    </AppLayout>
  );
};
