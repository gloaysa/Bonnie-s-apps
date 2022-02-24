import React, { ChangeEvent, useState } from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import HowToUseComponent from "../../components/how-to-use/how-to-use.component";
import InputDirectoryComponent from "../../components/input-directory/input-directory.component";
import { useAlert } from "react-alert";
import electron from "electron";

const remote = window.require("@electron/remote");
const shell: electron.Shell = remote.shell;

const WebDownloaderApp = (): JSX.Element => {
  const [urlToDownload, setUrlToDownload] = useState("");
  const [domain, setDomain] = useState("");
  const [outputFolder, setOutputFolder] = useState("");
  const [folderName, setFolderName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [downloadedWebUrl, setDownloadedWebUrl] = useState("");

  const alert = useAlert();

  const handleInputDirectory = (path: string) => {
    if (urlToDownload) {
      setOutputFolder(`${path}/${folderName}`);
    }
  };

  const handleOpenFolder = () => {
    shell.openPath(downloadedWebUrl);
  };

  const handleFolderName = (value: string) => {
    setFolderName(value);
    if (outputFolder) {
      setOutputFolder(outputFolder.replace(/[^\/]+$/, value));
    }
  };

  const getDomainFromUrl = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDownloadedWebUrl("");
    const value = event.target.value;
    const regValidUrl =
      /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    const validUrl = value.match(regValidUrl);
    if (validUrl) {
      const regMatch = /^(?:http:\/\/|www\.|https:\/\/)([^\/]+)/;
      const domainMatch = value.match(regMatch);
      if (domainMatch) {
        // const idMatch = value.match(/[^\/]+$/);
        setDomain(domainMatch[1]);
        setUrlToDownload(value);
      }
    }
  };

  const inputDisabled = (): boolean => {
    return !!folderName && !!outputFolder && !!urlToDownload && !!domain;
  };

  const clearForm = () => {
    setFolderName("");
    setUrlToDownload("");
    setDomain("");
    setOutputFolder("");
  };

  const howToUseDescription = () => {
    return (
      <p>
        Con esta aplicación podrás descargar la web otorgando una url y
        seleccionando la carpeta de descarga.
      </p>
    );
  };

  const handleDownload = async () => {
    setShowSpinner(true);
    await fetch("http://localhost:5500/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain,
        startPoint: urlToDownload,
        outputFolder,
      }),
    })
      .then(async (res) => {
        const response = await res.json();
        if (!res.ok) {
          throw new Error(response.message);
        }
        return response;
      })
      .then((res) => {
        alert.success(`${res.message}`);
        setDownloadedWebUrl(res.url);
        clearForm();
        setShowSpinner(false);
      })
      .catch((e) => {
        alert.error(`${e}`);
        clearForm();
        setShowSpinner(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {showSpinner && <CircularProgress sx={{ width: "100%" }} />}
      {!showSpinner && (
        <>
          <HowToUseComponent headerTitle="¿Cómo se usa?">
            {howToUseDescription()}
          </HowToUseComponent>
          <Box
            sx={{
              display: "column",
              width: "100%",
              "& > *:not(:last-child)": {
                marginBottom: "15px",
              },
            }}
            component="form"
          >
            <TextField
              label="Nombre carpeta a crear"
              sx={{
                width: "100%",
              }}
              focused
              autoFocus
              size="small"
              placeholder="Mi carpeta"
              required={true}
              onChange={(event) => handleFolderName(event.target.value)}
            />
            <TextField
              label="Website a descargar"
              sx={{
                width: "100%",
              }}
              focused
              size="small"
              placeholder="https://example.com"
              required={true}
              onChange={(event) => getDomainFromUrl(event)}
            />

            <InputDirectoryComponent
              path={outputFolder}
              handleSetPath={handleInputDirectory}
            />

            <br />
            <Button
              sx={{
                marginTop: "10px",
                width: "50%",
              }}
              type="button"
              variant="contained"
              disabled={!inputDisabled()}
              onClick={handleDownload}
            >
              Descargar!
            </Button>
          </Box>
          {downloadedWebUrl && (
            <Button onClick={handleOpenFolder}>Open website</Button>
          )}
          {urlToDownload && (
            <HowToUseComponent headerTitle="Vista previa">
              <iframe
                style={{
                  width: "100%",
                  height: "500px",
                }}
                src={urlToDownload}
              />
            </HowToUseComponent>
          )}
        </>
      )}
    </Box>
  );
};

export default WebDownloaderApp;
