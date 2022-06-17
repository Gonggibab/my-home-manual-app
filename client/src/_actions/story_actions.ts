import { 
  SET_ADDSTORYTOGGLE,
  SET_EDITSTORYTITLE,
  SET_EDITSTORYTOGGLE,
  SET_IMAGES, 
  SET_STORY, 
  SET_YEARINDEX,
  SET_CONFIRMTOGGLE,
  SET_DELETEDSTORYTITLE,
  SET_YEARS,
  CLEARSTORYSTATES,
  SET_DISPLAYIMAGEINDEX,
} from "./types";



export const setYearIndex = (index: number) => ({ 
  type: SET_YEARINDEX,
  yearIndex: index
});

export const setYears = (years: Array<string>) => ({ 
  type: SET_YEARS,
  years: years
});

export const setStory = (stories: any) => ({ 
  type: SET_STORY,
  stories: stories
});

export const setImage = (images: Array<string>) => ({ 
  type: SET_IMAGES,
  images: images
});

export const setDisplayImageIndex = (displayImageIndex: number) => ({ 
  type: SET_DISPLAYIMAGEINDEX,
  displayImageIndex: displayImageIndex
});

export const setAddStoryToggle = (addStoryToggle: boolean) => ({ 
  type: SET_ADDSTORYTOGGLE,
  addStoryToggle: addStoryToggle
});

export const setEditStoryToggle = (editStoryToggle: boolean) => ({ 
  type: SET_EDITSTORYTOGGLE,
  editStoryToggle: editStoryToggle
});

export const setEditStoryTitle = (editStoryTitle: string) => ({ 
  type: SET_EDITSTORYTITLE,
  editStoryTitle: editStoryTitle
});

export const setConfirmToggle = (confirmToggle: boolean) => ({ 
  type: SET_CONFIRMTOGGLE,
  confirmToggle: confirmToggle
});

export const setDeletedStoryTitle = (deletedStoryTitle: string) => ({ 
  type: SET_DELETEDSTORYTITLE,
  deletedStoryTitle: deletedStoryTitle
});

export const clearStoryStates = () => ({ 
  type: CLEARSTORYSTATES,
});



export type storyAction = 
  | ReturnType<typeof setYearIndex>
  | ReturnType<typeof setYears>
  | ReturnType<typeof setStory>
  | ReturnType<typeof setImage>
  | ReturnType<typeof setDisplayImageIndex>
  | ReturnType<typeof setAddStoryToggle>
  | ReturnType<typeof setEditStoryToggle>
  | ReturnType<typeof setEditStoryTitle>
  | ReturnType<typeof setConfirmToggle>
  | ReturnType<typeof setDeletedStoryTitle>
  | ReturnType<typeof clearStoryStates>

