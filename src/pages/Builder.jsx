import { Box } from "@mui/material";
import React from "react";

// Context API & App Data
import { useContext } from 'react';
import { AppContext } from "../AppContext";

// import MinHeightTextarea from '../components/MinHeightTextarea';

// Monaco
import Editor from '@monaco-editor/react';

import { EntityGenerator } from "../scripts/entities";

// Entities
// import { StoneyNPC } from '../scripts/shadowdark.js';

export default function Builder() {
  const { appData, setAppData } = useContext(AppContext);

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
      return true;
  }

  function handleChange(e) {
    if (isJsonString(e)) {

      let updatedAppData = JSON.parse(e);

      const eg = new EntityGenerator(updatedAppData.entityGeneratorObjects);
      updatedAppData.entityObjects = eg.entityObjects;

      setAppData(updatedAppData);
    }
  }

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <Editor 
        name="builderEditor"
        id="builderEditor"
        height="90vh"
        defaultLanguage="json"
        defaultValue={JSON.stringify(appData, null, 2)}
        theme="vs-dark"
        onChange={handleChange}
      />
    </Box>
  );
}
