export const valid = {
    user: {
        address: {
            street: 'main street'
        },
        city: 'New York',
        neighbors: [
            'john doe',
            'jane doe',
        ],
        getCity (data) {
            return data.user.address.city;
        }
    }
};

export function getCity(data) {
    return data?.user?.getCity?.(data);
}

export function getAddress(data) {
    return data?.user?.address?.street;
}

export function getNeighbor(data, number) {
    return data?.user?.address?.neighbors?.[number];
}

import test from 'ava';
import {
    valid,
    getAddress,
    getNeighbor,
    getCity
} from './index'

test('Optional Chaining returns real values', (t) => {
    const result = getAddress(valid);
    t.is(result, 'main street');
});

test('Optional chaining returns undefined for nullish properties', (t) => {
    t.is(getAddress(), undefined);
    t.is(getAddress(null), undefined);
    t.is(getAddress({}), undefined);
});

test('Optional chaining returns undefined for invalid array properties', (t) => {
    t.is(getNeighbor({}, 0), undefined);
});

test('Optional chaining returns undefined if a function does not exist', (t) => {
    const city = getCity(valid);
    t.is(city, undefined);
});
