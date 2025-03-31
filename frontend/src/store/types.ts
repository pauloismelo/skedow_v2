export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const EVENTS = 'EVENTS';

//interfaces for global state
export interface Event  {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
}

export interface EventState {
  events: Event[];
}

export interface AuthState {
    isAuthenticated: boolean;
    events: Event[];
  }
  
  export interface RootState {
    isAuthenticated: boolean;
    events: Event[];
    // outros estados se houverem
  }