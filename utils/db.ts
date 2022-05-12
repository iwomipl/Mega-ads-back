import {createPool} from "mysql2/promise";


export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'megaads',
    //namedPlaceholdres pozwalają nam bezpiecznie przesyłać dane
    namedPlaceholders: true,
    //decimalNumbers żeby liczy były liczbami
    decimalNumbers: true,
})