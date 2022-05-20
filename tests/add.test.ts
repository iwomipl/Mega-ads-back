import { AdRecord } from "../records/ad.record"
import { AdEntity } from "../types";
import { pool } from "../utils/db";

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

