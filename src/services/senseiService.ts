import apiSensei from "./apis/apiSensei";

export async function searchCards(name: string) {
    //login page to be implemented for solving token jwt
    const token = process.env.VUE_APP_JWT_TOKEN;
    if (!token) {
      throw new Error('Usuário não autenticado. Token não encontrado.');
    }
    try {
        const response = await apiSensei.post("/consult", {
            name
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
        return response.data;
    } catch (error: any) {
        console.error("Error fetching cards:", error.response?.data || error.message || error);
        throw error;
    }
};