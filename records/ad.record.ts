import {AdEntity, NewAddEntity} from "../types";
import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";
import {FieldPacket} from "mysql2";

type AdRecordResults = [AdEntity[], FieldPacket[]]

export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;

    constructor(obj: NewAddEntity) {
        if (!obj.name || obj.name.length < 1 || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta ani przekraczać 100 znaków.');
        }

        if (obj.description.length > 1024) {
            throw new ValidationError('Treśc ogłoszenia nie może być dłuższa niż 1024 znaki.');
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 lub większa niż 9 999 999.');
        }

        //@TODO check if url is valid

        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Link ogłoszenia nie może być pusta ani przekraczać 100 znaków.');
        }

        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price - obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results]=await pool.execute("SELECT * FROM `ads` WHERE id =:id", {
            id,
        })as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0]);
    }

}