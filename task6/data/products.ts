export interface ProductEntity {
    id: string; // uuid
    title: string;
    description: string;
    price: number;
}

export type ProductsList = Record<string, ProductEntity>;

export const products: ProductsList = {
    '51422fcd-0366-4186-ad5b-c23059b6f64f': {
        id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
        title: 'Book',
        description: 'A very interesting book',
        price: 100
    },
    'c339512b-9f1e-4ac9-bb11-38b34b923f79': {
        id: 'c339512b-9f1e-4ac9-bb11-38b34b923f79',
        title: 'Film',
        description: 'A very interesting film',
        price: 25
    },
}
