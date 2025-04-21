import apiLibrary from './apis/apiLibrary';
import { Order } from './types';

export async function getOrders(): Promise<Order[]> {
    try {
        const token = process.env.VUE_APP_JWT_TOKEN;
        if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

        const response = await apiLibrary.get('/orders', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error('Erro ao obter pedidos:', error);
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao obter pedidos');
    }
}

export async function getOrderById(id: number): Promise<Order> {
    try {
        const token = process.env.VUE_APP_JWT_TOKEN;
        if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

        const response = await apiLibrary.get(`/orders/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error('Erro ao obter pedido:', error);
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao obter pedido');
    }
}

export async function createOrder(order: Order): Promise<Order> {
    try {
        const token = process.env.VUE_APP_JWT_TOKEN;
        if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

        const response = await apiLibrary.post('/orders', order, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error('Erro ao criar pedido:', error);
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao criar pedido');
    }
}

export async function updateOrder(id: number, order: Order): Promise<void> {
    try {
        const token = process.env.VUE_APP_JWT_TOKEN;
        if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

        await apiLibrary.put(`/orders/${id}`, order, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error: any) {
        console.error('Erro ao atualizar pedido:', error);
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao atualizar pedido');
    }
}

export async function deleteOrder(id: number): Promise<void> {
    try {
        const token = process.env.VUE_APP_JWT_TOKEN;
        if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

        await apiLibrary.delete(`/orders/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error: any) {
        console.error('Erro ao excluir pedido:', error);
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao excluir pedido');
    }
}
