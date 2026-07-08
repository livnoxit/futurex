import axios, { isAxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim() ?? "";
const TENANT_ID = import.meta.env.VITE_TENANT_ID?.trim() ?? "";
const WEBSITE_ID = import.meta.env.VITE_WEBSITE_ID?.trim() ?? "";
const REGISTRATION_FORM_ID =
  import.meta.env.VITE_REGISTRATION_FORM_ID?.trim() ?? "";

const FIELD_IDS = {
  full_name: 1,
  place: 2,
  email: 3,
  age: 4,
  qualification: 5,
  phone: 6,
} as const;

export type RegistrationFormValues = {
  full_name: string;
  place?: string;
  email?: string;
  age?: number;
  qualification?: string;
  phone: string;
};

type SubmitFormPayload = {
  formId: string;
  values: Array<{ fieldId: number; value: string }>;
};

type ApiEnvelope<T> = {
  success?: boolean;
  data: T;
  message?: string | null;
};

type ApiErrorBody = {
  message?: unknown;
  errorCode?: unknown;
};

const FIELD_LABELS: Record<string, string> = {
  full_name: "full name",
  place: "place",
  email: "email",
  age: "age",
  qualification: "qualification",
  phone: "phone number",
};

function formatSubmissionErrorMessage(message: string): string {
  const duplicateMatch = message.match(
    /^Value already submitted for field:\s*(.+)$/i,
  );
  if (duplicateMatch) {
    const fieldCode = duplicateMatch[1].trim();
    const label = FIELD_LABELS[fieldCode] ?? fieldCode.replace(/_/g, " ");
    return `This ${label} is already registered. Please use a different one.`;
  }

  const missingMatch = message.match(/^Required field missing:\s*(.+)$/i);
  if (missingMatch) {
    const fieldCode = missingMatch[1].trim();
    const label = FIELD_LABELS[fieldCode] ?? fieldCode.replace(/_/g, " ");
    return `Please enter your ${label}.`;
  }

  const emptyMatch = message.match(/^Required field empty:\s*(.+)$/i);
  if (emptyMatch) {
    const fieldCode = emptyMatch[1].trim();
    const label = FIELD_LABELS[fieldCode] ?? fieldCode.replace(/_/g, " ");
    return `Please enter your ${label}.`;
  }

  const invalidEmailMatch = message.match(/^Invalid email for field:\s*(.+)$/i);
  if (invalidEmailMatch) {
    return "Please enter a valid email address.";
  }

  return message;
}

function extractApiErrorMessage(body: unknown): string | null {
  if (!body || typeof body !== "object" || !("message" in body)) {
    return null;
  }

  const message = (body as ApiErrorBody).message;
  if (typeof message !== "string" || !message.trim()) {
    return null;
  }

  return formatSubmissionErrorMessage(message.trim());
}

function buildSubmissionPayload(values: RegistrationFormValues): SubmitFormPayload {
  const entries: Array<{ fieldId: number; value: string }> = [
    { fieldId: FIELD_IDS.full_name, value: values.full_name },
    { fieldId: FIELD_IDS.phone, value: values.phone },
  ];

  const place = values.place?.trim();
  if (place) {
    entries.push({ fieldId: FIELD_IDS.place, value: place });
  }

  const email = values.email?.trim();
  if (email) {
    entries.push({ fieldId: FIELD_IDS.email, value: email });
  }

  if (values.age !== undefined) {
    entries.push({ fieldId: FIELD_IDS.age, value: String(values.age) });
  }

  const qualification = values.qualification?.trim();
  if (qualification) {
    entries.push({ fieldId: FIELD_IDS.qualification, value: qualification });
  }

  return {
    formId: REGISTRATION_FORM_ID,
    values: entries,
  };
}

function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const apiMessage = extractApiErrorMessage(error.response?.data);
    if (apiMessage) {
      return apiMessage;
    }

    if (error.response?.status === 404) {
      return "Registration is temporarily unavailable. Please try again later.";
    }

    if (error.response?.status === 401) {
      return "Registration could not be completed. Please try again later.";
    }

    return error.message || "Something went wrong. Please try again.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export async function submitRegistrationForm(
  values: RegistrationFormValues,
): Promise<void> {
  if (!API_BASE_URL) {
    throw new Error(
      "Missing VITE_API_BASE_URL. Add it to .env.local and restart the dev server.",
    );
  }

  if (!TENANT_ID) {
    throw new Error(
      "Missing VITE_TENANT_ID. Add your tenant UUID to .env.local and restart the dev server.",
    );
  }

  if (!WEBSITE_ID) {
    throw new Error(
      "Missing VITE_WEBSITE_ID. Add your website UUID to .env.local and restart the dev server.",
    );
  }

  if (!REGISTRATION_FORM_ID) {
    throw new Error(
      "Missing VITE_REGISTRATION_FORM_ID. Add the form UUID to .env.local and restart the dev server.",
    );
  }

  const payload = buildSubmissionPayload(values);

  try {
    await axios.post<ApiEnvelope<unknown>>(
      `${API_BASE_URL.replace(/\/$/, "")}/storefront/forms/submit`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-ID": TENANT_ID,
          "X-Website-ID": WEBSITE_ID,
        },
      },
    );
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
