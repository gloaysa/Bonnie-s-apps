import React, { FunctionComponent, PropsWithChildren } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { Button } from "@mui/material";
import electron from "electron";

const remote = window.require("@electron/remote");
const dialog: electron.Dialog = remote.dialog;

interface InputDirectoryProps extends PropsWithChildren<any> {
  handleSetPath: (path: string) => void;
  path: string;
}

const InputDirectoryComponent: FunctionComponent<InputDirectoryProps> = ({
  path,
  handleSetPath,
}): JSX.Element => {
  let downloadPath = path || "Click to select file";

  const openDialog = async () => {
    const { filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    const path = filePaths[0];
    if (path) {
      handleSetPath(path);
    }
  };

  return (
    <Button
      onClick={openDialog}
      sx={{
        width: "100%",
      }}
      variant="outlined"
      startIcon={<DownloadIcon />}
    >
      {downloadPath}
    </Button>
  );
};

export default InputDirectoryComponent;
