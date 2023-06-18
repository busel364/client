import { Buffer } from 'buffer';

export const base_url = 'http://localhost:4444'


export const encodeBase64 = (data: string) => {
    return Buffer.from(data).toString('base64');
}

export const decodeBase64 = (data: string) => {
    return Buffer.from(data, 'base64').toString('ascii');
}

export const services = [{ title: 'נקיון', img: '', route:'cleaning' },
{ title: 'בניה', img: '', route:'building' },
{ title: 'אינסטלציה', img: '', route:'plumbing' },
{ title: 'מוסכים', img: '', route:'' },
{ title: 'הובלות', img: '', route:'' }];

