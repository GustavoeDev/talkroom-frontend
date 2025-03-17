export interface FileAttachment {
  id: number;
  name: string;
  extension: string;
  src: string;
  size: string;
  content_type: string;
}

export interface AudioAttachment {
  id: number;
  src: string;
}

export interface Attachment {
  file?: FileAttachment;
  audio?: AudioAttachment;
}
