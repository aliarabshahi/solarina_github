import { create } from "zustand";
import { CoursesTopic } from "@/app/types/coursesType";

/** Global store to track and update the currently active topic */
interface TopicStore {
  activeTopic: CoursesTopic | null;
  setActiveTopic: (topic: CoursesTopic | null) => void;
}

export const useTopicStore = create<TopicStore>((set) => ({
  activeTopic: null,
  setActiveTopic: (topic) => set({ activeTopic: topic }),
}));
