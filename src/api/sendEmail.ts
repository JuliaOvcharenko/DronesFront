import { useState } from "react"
import { BASE_URL } from "../shared/api/baseUrl"

export interface EmailSender {
    name: string
    email: string
    phoneNumber: string
    message: string
}

export interface EmailSuccessResponse {
    success: true
    message?: string
}

export interface EmailErrorResponse {
    success: false
    message: string
}

type EmailResponse = EmailSuccessResponse | EmailErrorResponse

type SendEmailFunction = (emailData: EmailSender) => Promise<EmailResponse>

type UseSendEmailContract = [SendEmailFunction, {isLoading: boolean, error: string | null}]

export function useSendEmail(): UseSendEmailContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const sendEmail: SendEmailFunction = async (emailData) => {
        try {
            setIsLoading(true)
            setError(null)
            
            const request = await fetch(`${BASE_URL}/users/sendUserEmail`, {
                method: "POST",
                body: JSON.stringify(emailData),
                headers: {"Content-Type": "application/json"}
            })

            if (request.status === 200) {
                const data = await request.json()
                return { success: true, message: data.message || "Повідомлення успішно надіслано!" }

            } else if (request.status === 400) {
                const data = await request.json()
                const message = data.message || "Невірні дані. Перевірте заповнення форми."

                setError(message)
                return { success: false, message }

            } else if (request.status === 500) {
                const data = await request.json()
                const message = data.message || "Помилка сервера. Спробуйте пізніше."
                setError(message)
                return { success: false, message }

            } else {
                const message = "Помилка відправки. Спробуйте ще раз."
                setError(message)
                return { success: false, message }
            }

        } catch (error) {
            console.log(error)
            const message = "Помилка мережі. Перевірте з'єднання."
            setError(message)
            return { success: false, message }
            
        } finally {
            setIsLoading(false)
        }
    }

    return [sendEmail, {isLoading, error}]
}