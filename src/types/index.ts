import { ReactText } from "react";
import { IconType } from "react-icons";

export interface NavItemProps {
  icon: IconType;
  children: ReactText;
  url: string;
}

export interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

export interface VideoProps {
  video_id: string;
  video_title: string;
  video_desc: string;
  video_url: string;
  video_view_count: string;
  video_thumbnail: string;
  date_posted: string;
  channel_id: string;
  category_id: string;
  channel_name: string;
  channel_picture: string;
  created_at: string;
}

export interface EntryProps {
  id: string;
  thumbnail: string;
  view: string;
  title: string;
  date: string;
  desc: string;
  channel: string;
}

export interface DetailProps {
  title: string;
  view: string;
  channel: string;
  channel_video: string;
  desc: string;
  date: string;
}
