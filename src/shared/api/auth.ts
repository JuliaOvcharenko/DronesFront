import { BASE_URL } from "./baseUrl";

// Інтерфейс запиту
export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    passwordConfirm: string; // Обов'язкове поле для твого бекенду!
}

// Інтерфейс відповіді
export interface RegisterResponse {
    message: string;
}

// Дані, які ми відправляємо для входу
export interface LoginRequest {
    email: string;
    password: string;
}

// Відповідь сервера (приходить об'єкт з токеном)
export interface LoginResponse {
    token: string;
}

export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await fetch(`${BASE_URL}/users/register`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Помилка реєстрації');
    }

    return response.json();
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Помилка входу');
    }

    return response.json();
};