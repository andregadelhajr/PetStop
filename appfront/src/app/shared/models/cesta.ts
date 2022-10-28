import {v4 as uuidv4} from 'uuid';

export interface ICesta {
    id: string;
    items: ICestaItem[];
}

export interface ICestaItem {
    id: number;
    produtoNome: string;
    preco: number;
    quantidade: number;
    imgUrl: string;
    marca: string;
    categoria: string;
}

export class Cesta implements ICesta {
    id = uuidv4();
    items: ICestaItem[] = [];
}

export interface ICestaTotal {
    entrega: number;
    subtotal: number
    total: number
}


