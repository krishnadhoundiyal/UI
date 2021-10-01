import { URLExt } from '@jupyterlab/coreutils';
import { ServerConnection } from '@jupyterlab/services';

/**
 * A service class for making requests to the jupyter lab server.
 */
export class RequestHandler {
/**
   * Make a POST request to the jupyter lab server.
   *
   * All errors returned by the server are handled by displaying a relevant
   * error dialog. If provided a `longRequestDialog` then the dialog is displayed
   * to users while waiting for the server response. On success a promise that
   * resolves to the server response is returned.
   *
   * @param requestPath - The url path for the request.
   * This path is appended to the base path of the server for the request.
   *
   * @param requestBody - The body of the request.
   * Will be included in the RequestInit object passed to `makeServerRequest`
   *
   * @param longRequestDialog - A optional Dialog param.
   * A warning Dialog to display while waiting for the request to return.
   *
   * @returns a promise that resolves with the server response on success or
   * an error dialog result in cases of failure.
   */
  static async makePostRequest<T = any>(
    requestPath: string,
    requestBody: any,
  ): Promise<T> {
    return this.makeServerRequest(
      requestPath,
      { method: 'POST', body: requestBody }

    );
  }
  /**
    * Make a request to the jupyter lab server.
    *
    * The method of request is set in the `method` value in `requestInit`.
    * All errors returned by the server are handled by displaying a relevant
    * error dialog. If provided a `longRequestDialog` then the dialog is displayed
    * to users while waiting for the server response. On success a promise that
    * resolves to the server response is returned.
    *
    * @param requestPath - The url path for the request.
    * This path is appended to the base path of the server for the request.
    *
    * @param requestInit - The initialization options for the request.
    * A RequestInit object to be passed directly to `ServerConnection.makeRequest`
    * that must include a value for `method`.
    * This is based on "@typescript/lib/lib.dom.d/RequestInit"
    * @see {@link https://github.com/Microsoft/TypeScript/blob/master/lib/lib.dom.d.ts#L1558}
    * and {@link https://fetch.spec.whatwg.org/#requestinit}
    *
    * @returns a promise that resolves with the server response on success or
    * an error dialog result in cases of failure.
    */
  static async makeServerRequest<T = any>(
    requestPath: string,
    requestInit: any
  ): Promise<T> {
    // use ServerConnection utility to make calls to Jupyter Based services
    // which in this case are in the extension installed by this package
    const settings = ServerConnection.makeSettings();
    const requestUrl = URLExt.join(settings.baseUrl, requestPath);

    console.log(`Sending a ${requestInit.method} request to ${requestUrl}`);

    const getServerResponse: Promise<any> = new Promise((resolve, reject) => {
      ServerConnection.makeRequest(requestUrl, requestInit, settings).then(
        (response: any) => {
           response.json().then(
            // handle cases where the server returns a valid response
            (result: any) => {
              if (response.status < 200 || response.status >= 300) {
                return reject(result);
              }

              resolve(result);
            },
            // handle 404 if the server is not found
            (reason: any) => {
              if (response.status == 404) {
                response['requestPath'] = requestPath;
                return reject(response);
              } else if (response.status == 204) {
                resolve({});
              } else {
                return reject(reason);
              }
            }
          );
        },
        // something unexpected went wrong with the request
        (reason: any) => {
          console.error(reason);
          return reject(reason);
        }
      );
    });
    const serverResponse: any = await getServerResponse;
    return serverResponse;
}
}
