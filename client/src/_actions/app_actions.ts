import { SET_BACKGROUND, SET_ROUTELOCATION } from "./types";


export const setRouteLocation = (routeLocation: String) => { 
  return { 
    type: SET_ROUTELOCATION,
    routeLocation: routeLocation
  };
};

export const setBackground = (img: String) => { 
  return { 
    type: SET_BACKGROUND,
    background: img
  };
};


export type appAction = 
  | ReturnType<typeof setRouteLocation>
  | ReturnType<typeof setBackground>