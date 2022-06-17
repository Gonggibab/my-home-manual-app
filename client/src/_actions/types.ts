

// app_actions types
export const SET_ROUTELOCATION = "app/setRouteLocation" as const;
export const SET_BACKGROUND = "app/setBackground" as const;

// user_actions types
export const LOGIN_USER = "user/login" as const;
export const LOGOUT_USER = "user/logout" as const;
export const AUTH_USER = "user/auth" as const;

// message_actions types
export const MESSAGE_OPEN = "message/open" as const;
export const MESSAGE_CLOSE = "message/close" as const;

// story_actions types
export const SET_YEARINDEX = "story/setYearIndex" as const;
export const SET_YEARS = "story/setYears" as const;
export const SET_STORY = "story/setStory" as const;
export const SET_IMAGES = "story/setImages" as const;
export const SET_DISPLAYIMAGEINDEX = "story/setDisplayImageIndex" as const;
export const SET_ADDSTORYTOGGLE = "story/setAddStoryToggle" as const;
export const SET_EDITSTORYTOGGLE = "story/setEditStoryToggle" as const;
export const SET_EDITSTORYTITLE = "story/setEditStoryTitle" as const;
export const SET_CONFIRMTOGGLE = "story/setConfirmToggle" as const;
export const SET_DELETEDSTORYTITLE = "story/setDeletedStoryTitle" as const;
export const CLEARSTORYSTATES = "story/clearStoryStates" as const;