import { getToken } from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
// const accessToken = getToken("accessToken")

export interface ILoginPayload {
    email: string
  }

export const login = async (email: string) => {
    const response = await fetch(`${baseUrl}/api/v1/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    }).then((res) => res.json())

    const { data } = response

    if (response.code !== 200) {
        throw new Error(response.message || 'Login failed');
      }
  
      return data;
}

export const getTemplates = async () => {
    const accessToken = getToken("accessToken");

    if (!accessToken) {
        throw new Error('Access token is not available');
    }

    const response = await fetch(`${baseUrl}/api/v1/secure/templates`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to fetch the templates');
    }

    return response.json();
};

