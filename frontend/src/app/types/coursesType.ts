export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CoursesTopic {
  id: number;
  title: string;
  catchy_title: string;
  slug: string;
  description: string;
  image: string;
  logo_file: string;
  is_published: boolean;
}

export interface CoursesTag {
  id: number;
  name: string;
  slug: string;
}

export interface CoursesInstructor {
  id: number;
  user: string;
  name: string;
  bio: string;
  profile_picture: string;
}

export interface CoursesLesson {
  id: number;
  topic: string | CoursesTopic;
  topic_slug: string | CoursesTopic;
  instructor: CoursesInstructor | null;
  tags: CoursesTag[];
  title: string;
  slug: string;
  description: string;
  pdf_file: string | null;
  video_file: string | null;
  video_url: string | null;
  thumbnail: string | null;
  cover_image: string | null;
  is_published: boolean;
  is_free: boolean;
  duration: number;
  created_at: string;
  updated_at: string;
}
