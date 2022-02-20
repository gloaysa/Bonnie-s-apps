// Basic website downloader using web-scraper
import scrape from "website-scraper";
import {
  ALLOWED_IMAGE_SUFFIXES,
  ALLOWED_SUFFIXES,
  BLACK_LIST,
  MAX_DEPTH,
} from "./consts";
import { utils } from "./utils/utils";

const AspPlugin = require("./plugins/asp_plugin");

export default class Downloader {
  private readonly verbose: any;
  private readonly includeImages: any;

  constructor(verbose: any, includeImages: any) {
    this.verbose = verbose;
    this.includeImages = includeImages;
  }

  /**
   * Checks if a resource should be downloaded or not and logs the action.
   * @param {String} url An url to the resource that should be downloaded
   * @param {string} domain The domain from which the site is downloaded.
   */
  urlFilter(url: string, domain: string) {
    const shouldDownload = utils.checkUrl(url, domain, {
      allowedSuffixes: ALLOWED_SUFFIXES,
      allowedImageSuffixes: ALLOWED_IMAGE_SUFFIXES,
      blackList: BLACK_LIST,
      includeImages: this.includeImages,
    });

    if (shouldDownload && this.verbose) {
      console.log(`Downloading ${url}...`);
    }

    return shouldDownload;
  }

  /**
   * Download all the website that is under {domain} starting from @{startPoint}.
   * @param {String} domain The domain from which the site is downloaded.
   * @param {String} startPoint The first page that will be downloaded.
   * @param {String} outputFolder The name of the output folder, can be an absolute or ralative path.
   * @param {String} outputFolderSuffix The suffix of the output folder.
   */
  async download(
    domain: string,
    startPoint: string | scrape.Url,
    outputFolder: string,
    outputFolderSuffix: string
  ): Promise<scrape.Resource[]> {
    console.log(
      `Downloading all urls under ${domain}, starting from ${startPoint}`
    );

    return await scrape({
      urls: [startPoint],
      recursive: true,
      directory: `${outputFolder}.${outputFolderSuffix}`,
      maxDepth: MAX_DEPTH,
      // @ts-ignore
      plugins: [new AspPlugin()],
      urlFilter: (url) => this.urlFilter(url, domain),
    })
      .then((res) => {
        console.log(`Finished downloading ${startPoint}`);
        return res;
      })
      .catch((err) => {
        console.log("An error occurred", err);
        throw new Error(err);
      });
  }
}
