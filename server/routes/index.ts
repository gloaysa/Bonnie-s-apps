import * as express from 'express';
import Downloader from "../libs/downloader";

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('que tal aqui estoy')
});

router.get('scrape', (req, res, next) => {
  const verbose = true;
  const includeImages = true;

  const downloader = new Downloader(verbose, includeImages);

  const domain = 'https://view.genial.ly';
  const startPoint = 'https://view.genial.ly/5edd45871827e00d09f631d6/';
  const outputFolder = 'test2';
  const outputFolderSuffix = 'website'

  downloader.download(domain, startPoint, outputFolder, outputFolderSuffix)
})

module.exports = router;
