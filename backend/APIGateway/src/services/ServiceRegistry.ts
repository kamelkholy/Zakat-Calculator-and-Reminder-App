import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class ServiceRegistry {
  private static instances: Map<string, AxiosInstance> = new Map();

  static getServiceClient(serviceName: string, baseURL: string): AxiosInstance {
    if (!this.instances.has(serviceName)) {
      const client = axios.create({
        baseURL,
        timeout: 10000, // 10 seconds
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Request interceptor
      client.interceptors.request.use(
        (config) => {
          console.log(`[ServiceRegistry] Request to ${serviceName}: ${config.method?.toUpperCase()} ${config.url}`);
          return config;
        },
        (error) => {
          console.error(`[ServiceRegistry] Request error for ${serviceName}:`, error);
          return Promise.reject(error);
        }
      );

      // Response interceptor
      client.interceptors.response.use(
        (response) => {
          console.log(`[ServiceRegistry] Response from ${serviceName}: ${response.status}`);
          return response;
        },
        (error) => {
          console.error(`[ServiceRegistry] Response error from ${serviceName}:`, error.message);
          return Promise.reject(error);
        }
      );

      this.instances.set(serviceName, client);
    }

    return this.instances.get(serviceName)!;
  }

  static async healthCheck(serviceName: string, baseURL: string): Promise<boolean> {
    try {
      const client = this.getServiceClient(serviceName, baseURL);
      const response = await client.get('/health');
      return response.status === 200;
    } catch (error) {
      console.error(`[ServiceRegistry] Health check failed for ${serviceName}:`, error);
      return false;
    }
  }

  static async checkAllServices(): Promise<Record<string, boolean>> {
    const services = {
      'asset-service': process.env.ASSET_SERVICE_URL || 'http://localhost:3001',
      'zakat-service': process.env.ZAKAT_SERVICE_URL || 'http://localhost:3002',
      'reminder-service': process.env.REMINDER_SERVICE_URL || 'http://localhost:3003',
      'user-service': process.env.USER_SERVICE_URL || 'http://localhost:3004',
    };

    const results: Record<string, boolean> = {};

    for (const [name, url] of Object.entries(services)) {
      results[name] = await this.healthCheck(name, url);
    }

    return results;
  }
}
