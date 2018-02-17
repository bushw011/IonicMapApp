export interface Location {
  name: string,
  description: string,
  coordinates: {lat: number, lng: number};
}

export interface LocationId extends Location {
  id: string;
}
