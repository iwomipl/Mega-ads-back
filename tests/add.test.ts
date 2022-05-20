import { AdRecord } from "../records/ad.record"
import { AdEntity } from "../types";
import { pool } from "../utils/db";

const defaultObj = {
    name: 'test',
    description: 'bla',
    url: 'https://megak.pl',
    price: 0,
    lat: 0,
    lon: 0,
}

afterAll(async ()=>{
    await pool.end();
})

test('AddRecord returns data from database for one entry.', async()=>{
    const ad = await AdRecord.getOne('zxczxc');

    expect(ad.id).toBe('zxczxc');
    expect(ad.name).toBe('zxczx');
});

test('AdRecord.getOne returns null from database for unexisting entry.', async()=>{
    const ad = await AdRecord.getOne('---');

    expect(ad).toBe(null);
});

test('AdRecord.findAll returns array of found entries.', async()=>{
    const ads = await AdRecord.findAll('');

    expect(ads).not.toEqual([]);
    expect(ads[0]).toBeDefined();
});

test('AdRecord.findAll returns array of found entries when searching for "z".', async()=>{
    const ads = await AdRecord.findAll('z');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns empty array when searching for nonexistent records.', async()=>{
    const ads = await AdRecord.findAll('zasdasdasdsaasdasdasdvc');

    expect(ads).toEqual([]);
});
test('AdRecord.findAll returns smaller ammount of data.', async()=>{
    const ads = await AdRecord.findAll('');

    expect((ads[0] as AdEntity).price).toBeUndefined();
    expect((ads[0] as AdEntity).description).toBeUndefined();
});

test('AdRecord.insert returns new UUID.', async()=>{

    const ad = new AdRecord(defaultObj);
    await ad.insert();

    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');

});

test('AdRecord.insert inserts data to database.', async()=>{

    const ad = new AdRecord(defaultObj);
    await ad.insert();

    const foundAd =  await AdRecord.getOne(ad.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);

});

