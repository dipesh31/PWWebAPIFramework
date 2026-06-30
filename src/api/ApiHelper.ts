import { APIRequestContext } from "@playwright/test";
export class ApiHelper {
  private readonly request: APIRequestContext;
  private readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }
  //GET -- we have request and baseURL with us so we will pass endPoint and headers to the get method
  async get(endPoint: string, headers?: Record<string, string>) {
    let response = await this.request.get(`${this.baseURL}${endPoint}`, {
      headers: headers,
    });
    return {
      status: response.status(),
      body: await response.json(),
    };
  }
  //POST - we will need endpoint, headers and json body (data)
  async post(endPoint: string, data: object, headers?: Record<string, string>) {
    let response = await this.request.post(`${this.baseURL}${endPoint}`, {
      headers: headers,
      data: data,
    });
    return {
      status: response.status(),
      body: await response.json(),
    };
  }
  //PUT - we will need endpoint, headers, and json body (data)
  async put(endPoint: string, data: object, headers?: Record<string, string>) {
    let response = await this.request.put(`${this.baseURL}${endPoint}`, {
      headers: headers,
      data: data,
    });
    return {
      status: response.status(),
      body: await response.json(),
    };
  }
  //DELETE - we will need endpoint, id, headers
  async delete(endPoint: string, headers?: Record<string, string>) {
    let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
      headers: headers,
    });
    return {
      status: response.status(),
    };
  }
}
