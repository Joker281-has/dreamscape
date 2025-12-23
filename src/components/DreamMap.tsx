import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { darkMapStyle } from '../utils/mapStyles';

interface DreamMapProps {
  region?: Region;
  showsUserLocation?: boolean;
  followsUserLocation?: boolean;
  children?: React.ReactNode;
}

export const DreamMap: React.FC<DreamMapProps> = ({ region, showsUserLocation = true, followsUserLocation = true, children }) => {
  const mapRef = useRef<MapView>(null);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      provider={PROVIDER_DEFAULT}
      customMapStyle={darkMapStyle as any}
      region={region}
      showsUserLocation={showsUserLocation}
      followsUserLocation={followsUserLocation}
      showsMyLocationButton={false}
      showsCompass={false}
      toolbarEnabled={false}
    >
      {children}
    </MapView>
  );
};

const styles = StyleSheet.create({ map: { flex: 1 } });
