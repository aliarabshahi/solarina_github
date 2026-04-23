// src/app/types/exampleType.ts

export interface ExampleItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ExampleItemsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ExampleItem[];
}
