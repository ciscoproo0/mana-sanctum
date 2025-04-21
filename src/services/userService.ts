import apiLibrary from './apis/apiLibrary';
import { User } from './types';

export async function getUsers(): Promise<User[]> {
    try {
        const token = process.env.VUE_APP_JWT_TOKEN;
        if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

        const response = await apiLibrary.get('/users', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error('❌ Erro ao obter usuários:', error);
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao obter usuários');
    }
}

export async function createUser(user: User): Promise<User> {
    try {
        const token = process.env.VUE_APP_JWT_TOKEN;
        if (!token) throw new Error('Usuário não autenticado. Token não encontrado.');

        const response = await apiLibrary.post('/users', user, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error: any) {
        console.error('❌ Erro ao criar usuário:', error);
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao criar usuário');
    }
}
