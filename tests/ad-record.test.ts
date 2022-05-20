import {AdRecord} from "../records/ad.record";

const defaultObj = {
    name: 'test',
    description: 'bla',
    url: 'https://megak.pl',
    price: 0,
    lat: 0,
    lon: 0,
}

test('can build AdRecord', () => {
    const ad = new AdRecord(defaultObj)

    expect(ad.name).toBe('test');
    expect(ad.description).toBe('bla');
})

test('Validates invalid price', () => {
    expect(()=> new AdRecord({
        ...defaultObj,
        price: -3,
    })).toThrow('Cena nie może być mniejsza niż 0 lub większa niż 9 999 999.');
})

//@TODO check all validations