export type Location = {
  latitude: number;
  longitude: number;
  address?: string;
  name?: string;
};

export type Instruction = {
  id: string;
  text: string;
  distance: number; // feet
  duration: number; // seconds
  type?: 'turn-left' | 'turn-right' | 'straight' | 'merge' | 'exit';
  location?: Location;
};

export type Route = {
  id: string;
  name: string;
  coordinates: Location[];
  duration: number; // minutes
  distance: number; // miles
  instructions: Instruction[];
  traffic: 'light' | 'moderate' | 'heavy';
  aiConfidence: number; // 0-100
  type: 'fastest' | 'efficient' | 'scenic';
};

export type RootStackParamList = {
  Home: undefined;
  RouteSelection: { origin: Location; destination: Location } | undefined;
  Navigation: { route: Route } | undefined;
  Settings: undefined;
};
