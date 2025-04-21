import apiLibrary from './apis/apiLibrary';
import { Product } from './types';

export async function saveProduct(product: Product): Promise<Product> {
    const token = process.env.VUE_APP_JWT_TOKEN;
    if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

    const response = await apiLibrary.post('/products', product, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
}

export async function getProducts(): Promise<Product[]> {
    const token = process.env.VUE_APP_JWT_TOKEN;
    if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

    const response = await apiLibrary.get('/products', {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
}

export async function deleteProduct(productId: string): Promise<void> {
    const token = process.env.VUE_APP_JWT_TOKEN;
    if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

    await apiLibrary.delete(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export async function updateProduct(productId: string, product: Product): Promise<Product> {
    const token = process.env.VUE_APP_JWT_TOKEN;
    if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

    const response = await apiLibrary.put(`/products/${productId}`, product, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
}

export async function getProductById(productId: string): Promise<Product> {
    const token = process.env.VUE_APP_JWT_TOKEN;
    if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

    const response = await apiLibrary.get(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
}

export async function getProductsByName(name: string): Promise<Product[]> {
    const token = process.env.VUE_APP_JWT_TOKEN;
    if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

    const response = await apiLibrary.get(`/products?name=${name}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
}

export async function getProductsByRarity(rarity: string): Promise<Product[]> {
    const token = process.env.VUE_APP_JWT_TOKEN;
    if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

    const response = await apiLibrary.get(`/products?rarity=${rarity}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
}

export async function getProductsByEdition(edition: string): Promise<Product[]> {
    const token = process.env.VUE_APP_JWT_TOKEN;
    if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

    const response = await apiLibrary.get(`/products?edition=${edition}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
}
