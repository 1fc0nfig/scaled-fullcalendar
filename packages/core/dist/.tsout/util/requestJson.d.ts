import { Dictionary } from '../options.js';
export declare class JsonRequestError extends Error {
    response: Response;
    constructor(message: string, response: Response);
}
export declare function requestJson<ParsedResponse>(method: string, url: string, params: Dictionary): Promise<[ParsedResponse, Response]>;
//# sourceMappingURL=requestJson.d.ts.map