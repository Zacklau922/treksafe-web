import React, { createContext, useState, ReactNode } from "react";

interface Location {
  name: string;
  coordinates: [number, number];
}

interface MapContextProps {
  location: Location;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
}

const defaultLocation: Location = {
  name: "Tokun Hill",
  coordinates: [5.3645, 100.4909],
};

const MapContext = createContext<MapContextProps>({
  location: defaultLocation,
  setLocation: () => {},
});

export const MapProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<Location>(defaultLocation);

  return (
    <MapContext.Provider value={{ location, setLocation }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;
