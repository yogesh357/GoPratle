import { IRequirement, RequirementFormData, RequirementStats } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export async function createRequirement(data: RequirementFormData): Promise<{ success: boolean; data: IRequirement; message?: string }> {
  const response = await fetch(`${API_BASE_URL}/requirements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const resJson = await response.json();

  if (!response.ok) {
    const errorMsg = resJson.errors
      ? resJson.errors.map((e: any) => `${e.field}: ${e.message}`).join(', ')
      : resJson.message || 'Failed to submit requirement';
    throw new Error(errorMsg);
  }

  return resJson;
}

export async function getRequirements(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{ success: boolean; data: IRequirement[]; total: number; count: number; page: number; totalPages: number }> {
  const query = new URLSearchParams();
  if (params?.category && params.category !== 'all') query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));

  const url = `${API_BASE_URL}/requirements?${query.toString()}`;
  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    const resJson = await response.json().catch(() => ({}));
    throw new Error(resJson.message || 'Failed to fetch requirements');
  }

  return response.json();
}

export async function getRequirementById(id: string): Promise<{ success: boolean; data: IRequirement }> {
  const response = await fetch(`${API_BASE_URL}/requirements/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    const resJson = await response.json().catch(() => ({}));
    throw new Error(resJson.message || 'Failed to fetch requirement details');
  }

  return response.json();
}

export async function deleteRequirement(id: string): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/requirements/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const resJson = await response.json().catch(() => ({}));
    throw new Error(resJson.message || 'Failed to delete requirement');
  }

  return response.json();
}

export async function getRequirementStats(): Promise<{ success: boolean; data: RequirementStats }> {
  const response = await fetch(`${API_BASE_URL}/requirements/stats/summary`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    const resJson = await response.json().catch(() => ({}));
    throw new Error(resJson.message || 'Failed to fetch requirement stats');
  }

  return response.json();
}

export async function checkBackendHealth(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/health`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Backend health check failed');
  }

  return response.json();
}
