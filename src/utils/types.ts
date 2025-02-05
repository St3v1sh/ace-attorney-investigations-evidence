export type Item = Evidence | Profile;

export type ZoomSettingName = "zoomPercentage" | "mobileZoomPercentage";

export interface Evidence {
  name: string;
  description: string;
  imageUrl: string;
  additionalImages: string[];
}

export interface Profile {
  name: string;
  description: string;
  imageUrl: string;
  age: string;
}
