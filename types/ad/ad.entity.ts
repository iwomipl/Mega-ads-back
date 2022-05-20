export interface NewAddEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}

export interface SimpleAddEntity {
    id: string;
    lat: number;
    lon: number;
}

export interface AdEntity extends SimpleAddEntity{
    name: string;
    description: string;
    price: number;
    url: string;

}
