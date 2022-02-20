export interface GiphyImageData {
  width: string;
  height: string;
  size?: string;
  url?: string;
  mp4?: string;
  mp4_size?: string;
  frames?: string;
}

export interface GiphyDataImageResponse {
  ["480w_still"]: GiphyImageData;
  downsized: GiphyImageData;
  downsized_large: GiphyImageData;
  downsized_medium: GiphyImageData;
  downsized_small: GiphyImageData;
  downsized_still: GiphyImageData;
  fixed_height: GiphyImageData;
  fixed_height_downsampled: GiphyImageData;
  fixed_height_small: GiphyImageData;
  fixed_height_small_still: GiphyImageData;
  fixed_height_still: GiphyImageData;
  fixed_width: GiphyImageData;
  fixed_width_downsampled: GiphyImageData;
  fixed_width_small: GiphyImageData;
  fixed_width_small_still: GiphyImageData;
  fixed_width_still: GiphyImageData;
  looping: { mp4: string; mp4_size: string };
  original: GiphyImageData;
  original_mp4: GiphyImageData;
  original_still: GiphyImageData;
  preview: GiphyImageData;
  preview_gif: GiphyImageData;
  preview_webp: GiphyImageData;
}

export interface GiphyDataResponse {
  bitly_gif_url: string;
  bitly_url: string;
  content_url: string;
  embed_url: string;
  id: string;
  images: GiphyDataImageResponse;
  import_datetime: string;
  is_sticker: number;
  rating: string;
  slug: string;
  source: string;
  source_post_url: string;
  source_tld: string;
  title: string;
  trending_datetime: string;
  type: "gif";
  url: string;
  username: string;
}
