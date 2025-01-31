export type Item = Evidence | Profile;

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
