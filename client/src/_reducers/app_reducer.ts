import { appAction, setRouteLocation } from "../_actions/app_actions";
import { SET_BACKGROUND, SET_ROUTELOCATION } from "../_actions/types";

type appState = {
  routeLocation: String,
  backgournd: String
};

const initialState: appState = {
  routeLocation: "/",
  backgournd: "default"
};


function app(
  state: appState = initialState, 
  action: appAction
): appState {
    switch (action?.type) {
      case SET_ROUTELOCATION:
        return {
          ...state,
          routeLocation: action.routeLocation
        };
      case SET_BACKGROUND:
        return {
          ...state,
          backgournd: action.background
        };
      default:
        return {...state};
    }
}

export default app;