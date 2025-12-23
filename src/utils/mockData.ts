import { Route, Location, Instruction } from "../types/navigation";

export function generateMockRoutes(origin: Location, destination: Location): Route[] {
  // Mock three routes: Fastest, Efficient, Scenic
  const now = Date.now();
  const makeInstructions = (): Instruction[] => [
    { id: 'i1', text: 'Continue straight on Market Street for 0.5 mi', distance: 2640, duration: 180 },
    { id: 'i2', text: 'Turn left onto 1st Ave', distance: 880, duration: 60 },
    { id: 'i3', text: 'Arrive at destination', distance: 0, duration: 0 },
  ];

  return [
    {
      id: `r-fast-${now}`,
      name: 'Fastest Route',
      coordinates: [origin, destination],
      duration: 12,
      distance: 3.2,
      instructions: makeInstructions(),
      traffic: 'light',
      aiConfidence: 94,
      type: 'fastest',
    },
    {
      id: `r-eff-${now}`,
      name: 'Efficient Route',
      coordinates: [origin, destination],
      duration: 14,
      distance: 3.1,
      instructions: makeInstructions(),
      traffic: 'moderate',
      aiConfidence: 91,
      type: 'efficient',
    },
    {
      id: `r-scen-${now}`,
      name: 'Scenic Route',
      coordinates: [origin, destination],
      duration: 18,
      distance: 4.1,
      instructions: makeInstructions(),
      traffic: 'light',
      aiConfidence: 87,
      type: 'scenic',
    },
  ];
}
