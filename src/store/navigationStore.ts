import { create } from 'zustand';
import { Location, Route } from '../types/navigation';

type NavigationState = {
  origin?: Location | null;
  destination?: Location | null;
  availableRoutes: Route[];
  selectedRoute?: Route | null;
  isNavigating: boolean;
  setOrigin: (loc: Location) => void;
  setDestination: (loc: Location) => void;
  setRoutes: (routes: Route[]) => void;
  selectRoute: (route: Route) => void;
  startNavigation: () => void;
  stopNavigation: () => void;
};

export const useNavigationStore = create<NavigationState>((set: any) => ({
  origin: null,
  destination: null,
  availableRoutes: [],
  selectedRoute: null,
  isNavigating: false,
  setOrigin: (loc) => set({ origin: loc }),
  setDestination: (loc) => set({ destination: loc }),
  setRoutes: (routes) => set({ availableRoutes: routes }),
  selectRoute: (route) => set({ selectedRoute: route }),
  startNavigation: () => set({ isNavigating: true }),
  stopNavigation: () => set({ isNavigating: false, selectedRoute: null, availableRoutes: [] }),
}));

