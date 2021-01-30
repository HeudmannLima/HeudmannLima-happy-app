export interface Orphanages {
  id: number,
  name: string,
  about: string,
  latitude: number,
  longitude: number,
  instructions: string,
  opening_hours: string,
  open_on_weekends: boolean,
  images: Array<{
    id: number,
    url: string, 
  }>;
  // ou images: { path: string }[]
}

export interface OrphanageParams {
  id: string,
}

export interface MapPosition {
  pos: {
    lat: number,
    lng: number,
    zoom?: number,
  }
}
