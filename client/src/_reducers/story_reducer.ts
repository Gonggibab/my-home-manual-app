import { clearStoryStates, storyAction } from '../_actions/story_actions';
import { 
  SET_ADDSTORYTOGGLE,
  SET_IMAGES, 
  SET_STORY, 
  SET_YEARINDEX,
  SET_EDITSTORYTOGGLE,
  SET_EDITSTORYTITLE,
  SET_CONFIRMTOGGLE,
  SET_DELETEDSTORYTITLE,
  SET_YEARS,
  CLEARSTORYSTATES,
  SET_DISPLAYIMAGEINDEX,
} from '../_actions/types'

type storyState = {
  yearIndex: number,
  years: Array<string>,
  stories: any,
  images: Array<string>,
  displayImageIndex: number,
  slideIndex: number,
  addStoryToggle: boolean,
  editStoryToggle: boolean,
  editStoryTitle: string,
  confirmToggle: boolean,
  deletedStoryTitle: string,
};

const initialState: storyState = {
  yearIndex: 0,
  years: [],
  stories: [],
  images:[],
  displayImageIndex: 0,
  slideIndex: 1,
  addStoryToggle: false,
  editStoryToggle: false,
  editStoryTitle: "",
  confirmToggle: false,
  deletedStoryTitle: "",
};


function message(
  state: storyState = initialState, 
  action: storyAction
): storyState {
    switch (action.type) {
      case SET_YEARINDEX:
        return {
          ...state, 
          yearIndex: action.yearIndex
        };
      case SET_YEARS:
        return {
          ...state, 
          years: action.years
        };
      case SET_STORY:
        return {
          ...state, 
          stories: action.stories
        };
      case SET_IMAGES:
        return {
          ...state, 
          images: action.images
        };
      case SET_DISPLAYIMAGEINDEX:
        return {
          ...state, 
          displayImageIndex: action.displayImageIndex
        };
      case SET_ADDSTORYTOGGLE:
        return {
          ...state, 
          addStoryToggle: action.addStoryToggle
        };
      case SET_EDITSTORYTOGGLE:
        return {
          ...state, 
          editStoryToggle: action.editStoryToggle
        };
      case SET_EDITSTORYTITLE:
        return {
          ...state, 
          editStoryTitle: action.editStoryTitle
        };
      case SET_CONFIRMTOGGLE:
        return {
          ...state, 
          confirmToggle: action.confirmToggle
        };
      case SET_DELETEDSTORYTITLE:
        return {
          ...state, 
          deletedStoryTitle: action.deletedStoryTitle
        };
      case CLEARSTORYSTATES:
        return {
          yearIndex: 0,
          years: [],
          stories: [],
          images:[],
          displayImageIndex: 0,
          slideIndex: 1,
          addStoryToggle: false,
          editStoryToggle: false,
          editStoryTitle: "",
          confirmToggle: false,
          deletedStoryTitle: "",
        };
      default:
        return {...state};
    }
}

export default message;