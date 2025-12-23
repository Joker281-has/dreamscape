import { generateMockRoutes } from '../mockData';

describe('mockData', () => {
  describe('generateMockRoutes', () => {
    const origin = { latitude: 37.7749, longitude: -122.4194 };
    const destination = { latitude: 37.7849, longitude: -122.4294 };

    it('generates 3 routes', () => {
      const routes = generateMockRoutes(origin as any, destination as any);
      expect(routes).toHaveLength(3);
    });

    it('generates routes with correct types', () => {
      const routes = generateMockRoutes(origin as any, destination as any);
      expect(routes[0].type).toBe('fastest');
      expect(routes[1].type).toBe('efficient');
      expect(routes[2].type).toBe('scenic');
    });

    it('generates routes with required fields', () => {
      const routes = generateMockRoutes(origin as any, destination as any);
      routes.forEach(route => {
        expect(route.id).toBeDefined();
        expect(route.name).toBeDefined();
        expect(route.duration).toBeGreaterThan(0);
        expect(route.distance).toBeGreaterThan(0);
        expect(route.aiConfidence).toBeGreaterThanOrEqual(0);
        expect(route.aiConfidence).toBeLessThanOrEqual(100);
        expect(route.coordinates).toHaveLength(2);
      });
    });

    it('fastest route has highest confidence', () => {
      const routes = generateMockRoutes(origin as any, destination as any);
      const fastest = routes.find(r => r.type === 'fastest');
      const others = routes.filter(r => r.type !== 'fastest');
      others.forEach(route => {
        expect(fastest!.aiConfidence).toBeGreaterThanOrEqual(route.aiConfidence);
      });
    });
  });
});
