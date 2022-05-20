import { AdRecord } from "../records/ad.record"

test('AddRecord returns data from database for one entry.', async()=>{
    const ad = await AdRecord.getOne('zxczxc');

    expect(ad.id).toBe('zxczxc');
    expect(ad.name).toBe('zxczx');
});

test('AdRecord returns null from database for unexisting entry.', async()=>{
    const ad = await AdRecord.getOne('---');

    expect(ad).toBe(null);
})