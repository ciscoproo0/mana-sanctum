// src/services/paymentService.ts
import apiLibrary from './apis/apiLibrary';
import type { Payment } from './types';

const token = process.env.VUE_APP_JWT_TOKEN;

export async function createPayment(payment: Payment): Promise<Payment> {
    try {
        if (!token) throw new Error('Token JWT não encontrado');
        const response = await apiLibrary.post('/payment', payment, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('✅ Pagamento criado:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('❌ Erro ao criar pagamento:', error.response?.data || error.message || error);
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao criar pagamento');
    }
}

export async function getPayments(): Promise<Payment[]> {
    try {
        if (!token) throw new Error('Token JWT não encontrado');
        const response = await apiLibrary.get(`/payment/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('✅ Pagamento obtido:', response.data);
        return response.data.data; // pois o controller devolve um ServiceResponse<Payment>
    } catch (error: any) {
        console.error('❌ Erro ao obter pagamento:', error.response?.data || error.message || error);
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao obter pagamento');
    }
}

export async function getPaymentById(id: number): Promise<Payment> {
    try {
        if (!token) throw new Error('Token JWT não encontrado');
        const response = await apiLibrary.get(`/payment/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('✅ Pagamento obtido:', response.data);
        return response.data.data; // pois o controller devolve um ServiceResponse<Payment>
    } catch (error: any) {
        console.error('❌ Erro ao obter pagamento:', error.response?.data || error.message || error);
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao obter pagamento');
    }
}

export async function updatePayment(id: number, payment: Payment): Promise<void> {
    try {
        if (!token) throw new Error('Token JWT não encontrado');
        await apiLibrary.put(`/payment/${id}`, payment, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('✅ Pagamento atualizado com sucesso');
    } catch (error: any) {
        console.error('❌ Erro ao atualizar pagamento:', error.response?.data || error.message || error);
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao atualizar pagamento');
    }
}

export async function deletePayment(id: number): Promise<void> {
    try {
        if (!token) throw new Error('Token JWT não encontrado');
        await apiLibrary.delete(`/payment/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('✅ Pagamento deletado com sucesso');
    } catch (error: any) {
        console.error('❌ Erro ao deletar pagamento:', error.response?.data || error.message || error);
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao deletar pagamento');
    }
}
