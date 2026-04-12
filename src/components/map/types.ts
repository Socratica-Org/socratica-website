export interface NodeType {
  id: string;
  name: string;
  date: string;
  location: string;
  coordinates: [number, number] | number[];
  joinLink: string;
  lumaLink?: string;
  imageSrc?: string;
  websiteLink?: string;
  instagramLink?: string;
  twitterLink?: string;
  youtubeLink?: string;
}
