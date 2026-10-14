import { ApiResponse } from '@fisica-tareas/shared';

// URL base de la API obtenida desde variable de entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  /**
   * Realiza una petición HTTP utilizando Fetch API
   */
  public async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers, ...restOptions } = options;

    let url = `${this.baseUrl}/${endpoint.replace(/^\//, '')}`;

    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, val] of Object.entries(params)) {
        if (val !== undefined && val !== null) {
          searchParams.append(key, String(val));
        }
      }
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    // Obtener sesión demo de localStorage para autenticar
    const savedUserJson = localStorage.getItem('demo_current_user');
    const authHeaders: Record<string, string> = {};

    if (savedUserJson) {
      try {
        const user = JSON.parse(savedUserJson);
        authHeaders['x-user-id'] = user.id;
        authHeaders['x-user-role'] = user.role;
        authHeaders['x-user-name'] = user.name;
        authHeaders['x-user-email'] = user.email;
      } catch {
        // Ignorar si el JSON no es válido
      }
    }

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...authHeaders,
    };

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: {
          ...defaultHeaders,
          ...(headers as Record<string, string>),
        },
      });

      const data: ApiResponse<T> = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error?.message || `Error HTTP ${response.status}: ${response.statusText}`,
        );
      }

      return data.data as T;
    } catch (error) {
      console.warn(`[HttpClient] Error al llamar a ${url}:`, error);
      throw error;
    }
  }

  public get<T>(
    endpoint: string,
    params?: Record<string, string | number | undefined>,
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  public post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const httpClient = new HttpClient(API_BASE_URL);
