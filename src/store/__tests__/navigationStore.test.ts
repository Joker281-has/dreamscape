import { renderHook, act } from '@testing-library/react-hooks';
import { useNavigationStore } from '../navigationStore';

describe('navigationStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useNavigationStore());
    act(() => {
      // Reset store to initial values
      result.current.stopNavigation();
      result.current.setOrigin(null as any);
      result.current.setDestination(null as any);
      result.current.setRoutes([] as any);
      result.current.selectRoute(null as any);
    });
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useNavigationStore());
    expect(result.current.origin).toBeNull();
    expect(result.current.destination).toBeNull();
    expect(result.current.selectedRoute).toBeNull();
    expect(result.current.isNavigating).toBe(false);
    expect(result.current.availableRoutes).toEqual([]);
  });

  it('sets origin', () => {
    const { result } = renderHook(() => useNavigationStore());
    const loc = { latitude: 37.7749, longitude: -122.4194 };
    act(() => { result.current.setOrigin(loc as any); });
    expect(result.current.origin).toEqual(loc);
  });

  it('sets destination', () => {
    const { result } = renderHook(() => useNavigationStore());
    const dest = { latitude: 37.7849, longitude: -122.4294, name: 'Test' };
    act(() => { result.current.setDestination(dest as any); });
    expect(result.current.destination).toEqual(dest);
  });

  it('start and stop navigation', () => {
    const { result } = renderHook(() => useNavigationStore());
    act(() => { result.current.startNavigation(); });
    expect(result.current.isNavigating).toBe(true);
    act(() => { result.current.stopNavigation(); });
    expect(result.current.isNavigating).toBe(false);
  });
});
