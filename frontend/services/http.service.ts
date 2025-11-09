import {
  ContentType,
  HttpHeader,
  HttpMethods,
  type ValueOf,
} from "../common/common";

type HttpOptions = {
  method: ValueOf<typeof HttpMethods>;
  contentType: ValueOf<typeof ContentType>;
  payload: BodyInit | null;
};

class Http {
  public load<T = unknown>(
    url: string,
    options: Partial<HttpOptions>
  ): Promise<T> {
    const { method = "GET", payload = null, contentType } = options;

    const headers = this.getHeaders(contentType);

    return fetch(url, {
      method,
      headers,
      body: payload,
    })
      .then(this.checkStatus)
      .then((res) => this.parseJSON<T>(res))
      .catch(this.throwError);
  }

  private getHeaders(contentType?: ValueOf<typeof ContentType>): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    return headers;
  }

  private async checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response;
  }

  private async parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  private throwError(err: Error): never {
    throw err;
  }
}

export { Http };
