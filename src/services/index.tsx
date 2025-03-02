import { getToken } from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export interface ILoginPayload {
  type: string;
  email: string;
  password: string;
}

export interface IRegisterPayload {
  type: string;
  username: string;
  email: string;
  password: string;
}

export const login = async (payload: ILoginPayload) => {
  const response = await fetch(`${baseUrl}/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());

  const { data } = response;

  if (response.code !== 200) {
    throw new Error(response.message || "Login failed");
  }

  return data;
};

export const register = async (payload: IRegisterPayload) => {
  const response = await fetch(`${baseUrl}/api/v1/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());

  const { data } = response;

  if (response.code !== 200) {
    throw new Error(response.message || "Registration failed");
  }

  return data;
};

export const assignGuardian = async (guardianId: string, patientId: string) => {
  const token = getToken("accessToken");

  const response = await fetch(`${baseUrl}/api/v1/secure/assign-guardian`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ guardian_id: guardianId, patient_id: patientId }),
  }).then((res) => res.json());

  if (response.code !== 200) {
    throw new Error(response.message || "Failed to assign guardian");
  }

  return response.data;
};

export const createPrescription = async (
  patientId: string,
  symptoms: string
) => {
  const token = getToken("accessToken");

  const response = await fetch(`${baseUrl}/api/v1/secure/prescriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ patient_id: patientId, symptoms }),
  }).then((res) => res.json());

  if (response.code !== 200) {
    throw new Error(response.message || "Failed to create prescription");
  }

  return response.data;
};

export const getAssignedPatients = async () => {
  const token = getToken("accessToken");

  const response = await fetch(
    `${baseUrl}/api/v1/secure/assigned-patients-doctor`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      errorResponse.message || "Failed to fetch assigned patients"
    );
  }

  return response.json();
};

export const getAllPatients = async () => {
  const token = getToken("accessToken");

  const response = await fetch(`${baseUrl}/api/v1/secure/patients`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch patients");
  }

  return response.json();
};

export const checkSymptoms = async (symptoms: string) => {
  const token = getToken("accessToken");

  const response = await fetch(`${baseUrl}/api/v1/secure/treatment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ symptoms }),
  }).then((res) => res.json());

  if (response.code !== 200) {
    throw new Error(response.message || "Failed to check symptoms");
  }

  return response.data;
};

export const getAllDoctors = async () => {
  const token = getToken("accessToken");

  const response = await fetch(`${baseUrl}/api/v1/secure/doctors`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch doctors");
  }

  return response.json();
};

export const assignDoctorToPatient = async (
  doctorId: string,
  patientId: string
) => {
  const token = getToken("accessToken");

  const response = await fetch(`${baseUrl}/api/v1/secure/assign-doctor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ doctor_id: doctorId, patient_id: patientId }),
  }).then((res) => res.json());

  if (response.code !== 200) {
    throw new Error(response.message || "Failed to assign doctor to patient");
  }

  return response.data;
};

export const getAllGuardians = async () => {
  const token = getToken("accessToken");

  const response = await fetch(`${baseUrl}/api/v1/secure/guardians`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch guardians");
  }

  return response.json();
};

export const getAllSymptoms = async () => {
  const token = getToken("accessToken");

  const response = await fetch(`${baseUrl}/api/v1/secure/symptoms`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch symptoms");
  }

  return response.json();
};

export const getAssignedPatientsForGuardian = async () => {
  const token = getToken("accessToken");

  const response = await fetch(`${baseUrl}/api/v1/secure/assigned-patients`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "Failed to fetch assigned patients");
  }

  return response.json();
};
