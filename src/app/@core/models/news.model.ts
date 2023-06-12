export interface INews {
  id?: string;
  title: string;
  slug: string;
  banner: boolean;
  thumbnail: string;
  effectiveDate: string;
  description: string;
  editorContent: string;
  createdDate?: string;
  modifiedDate?: string;
}
