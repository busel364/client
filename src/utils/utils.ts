import { Buffer } from 'buffer';
import io from 'socket.io-client';

export const base_url = 'http://localhost:4444'

export const socket = io(base_url, { autoConnect: false });

export const encodeBase64 = (data: string) => {
    return Buffer.from(data).toString('base64');
}

export const decodeBase64 = (data: string) => {
    return Buffer.from(data, 'base64').toString('ascii');
}

export const services = [{ title: 'נקיון', img: require('./imgs/services/dreamstime_m_81089211.jpg'), route: 'cleaning' },
{ title: 'בניה', img: require('./imgs/services/renovation.jpg'), route: 'building' },
{ title: 'אינסטלציה', img: require('./imgs/services/how-does-plumbing-work-e1548696261445-min.jpeg'), route: 'plumbing' },
{ title: 'מוסכים', img: require('./imgs/services/istockphoto-1347150429-612x612.jpg'), route: '' },
{ title: 'הובלות', img: require('./imgs/services/istockphoto-506788598-1024x1024.jpg'), route: '' }];

export const imgFilter = (html: string): string => {
    const img = html.split('<img')[1].split('/>')[0].split('max-width:')[0];
    return '<img ' + img + 'max-width:300px;" width="300" />';
}

export const filterTitle = (post: string): string => {
    return post.split('h1')[1].split('>')[1].split('<')[0];
}

export const errors = {
    login: 'login',
    register: 'register',
    returnPass: 'returnPass',
}


export interface BOTData {
    message: string,
    tel: string,
    email: string,
    name: string
}

