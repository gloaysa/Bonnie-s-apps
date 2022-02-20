import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box/Box";
import {Button, ImageListItem, ImageListItemBar, Link, ListSubheader} from "@mui/material";
import {GiphyDataResponse} from "./giphy.interface";

const HomeApp = (): JSX.Element => {
  const [giphyData, setGiphyData] = useState<GiphyDataResponse>();
  // Giphy API defaults
  const giphy = {
    baseURL: "https://api.giphy.com/v1/gifs/",
    apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
    tag: "fail",
    type: "random",
    rating: "pg-13",
  };

  const getGif = async () => {
    const giphyURL = `${giphy.baseURL}${giphy.type}?apikey=${giphy.apiKey}&tag=${giphy.tag}&rating=${giphy.rating}`;

    await fetch(giphyURL)
      .then((res) => res.json())
      .then((res) => {
        setGiphyData(res.data);
      });
  };

  useEffect(() => {
    getGif();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      {giphyData && (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <ImageListItem key={giphyData.id}>
            <img
              src={`${giphyData.images.downsized_large.url}`}
              srcSet={`${giphyData.images.downsized_large.url}`}
              alt={giphyData.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={giphyData.title}
              subtitle={giphyData.username && (<span>by: {giphyData.username}</span>)}
              position="below"
            />
          </ImageListItem>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">
              <Link href={giphyData.source} target='__blank'>Post original </Link>
              (Abrir en {giphyData.source_tld})
            </ListSubheader>
          </ImageListItem>
          <Button variant='outlined' onClick={getGif}>Nuevo GIF</Button>
        </Box>
      )}

    </Box>
  );
};

export default HomeApp;
