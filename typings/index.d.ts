import { IncomingMessage, Server as HttpServer, ServerResponse } from 'http';
import { Http2SecureServer } from 'http2';
import { KlasaClient, KlasaClientOptions, Piece, PieceDefaults, PieceOptions, Store } from 'klasa';
import { Server as HttpSecureServer } from 'tls';

declare module 'klasa-api-generator' {

//#region Classes
	export class Server {
		public constructor(client: KlasaClient);
		public client: KlasaClient;
		public server: HttpServer | HttpSecureServer | Http2SecureServer;
		public onNoMatch: (request: IncomingMessage, response: ServerResponse) => void;
		public listen(port: number): Promise<void>;
		public handler(request: IncomingMessage, response: ServerResponse): Promise<void>;
		public onError(error: Error | ErrorLike, request: KlasaIncomingMessage, response: ServerResponse): void;
	}

	export abstract class Middleware extends Piece {
    public constructor(
      client: KlasaClient,
      store: MiddlewareStore,
      file: string[],
      directory: string,
      options?: MiddlewareOptions
    );
    public priority: number;
    public abstract run(
      request: KlasaIncomingMessage,
      response: ServerResponse,
      route?: Route
    ): Promise<void>;
  }

	export class MiddlewareStore extends Store<string, Middleware, typeof Middleware> {
		public sortedMiddlewares: Middleware[];
		public run(request: KlasaIncomingMessage, response: ServerResponse, route?: Route): Promise<void>;
	}

	export abstract class Route extends Piece {
    public constructor(
      client: KlasaClient,
      store: RouteStore,
      file: string[],
      directory: string,
      options?: RouteOptions
    );
    public authenticated: boolean;
    public parsed: ParsedRoute;
    public route: string;
    public matches(split: string[]): boolean;
    public execute(split: string[]): Record<string, any>;
  }

	export class RouteStore extends Store<string, Route, typeof RouteStore> {
		public registry: Record<string, Map<string, Route>>;
		public findRoute(method: string, splitURL: string[]): Route | undefined;
	}

	export const constants: Constants;

	export class Util {
		public static parsePart(val: string): ParsedPart;
		public static split(url: string): string[];
		public static parse(url: string): ParsedPart[];
		public static encrypt(data: any, secret: string): string;
		public static decrypt(token: string, secret: string): any;
	}

//#endregion Classes
//#region Types

	export interface KlasaDashboardHooksOptions {
		apiPrefix?: string;
		origin?: string;
		port?: number;
	}

	export interface DashboardClientOptions extends KlasaClientOptions {
		dashboardHooks?: KlasaDashboardHooksOptions;
	}

	export interface KlasaIncomingMessage extends IncomingMessage {
		originalUrl: string;
		path: string;
		search: string;
		query: Record<string, string | string[]>;
		params: Record<string, any>;
		body?: any;
		length?: number;
	}

	export interface RouteOptions extends PieceOptions {
		route?: string;
		authenticated?: boolean;
	}

	export interface MiddlewareOptions extends PieceOptions {
		priority?: number;
	}

	export interface ErrorLike {
		code?: number;
		status?: number;
		statusCode?: number;
		message?: string;
	}

	export interface ParsedPart {
		val: string;
		type: number;
	}

	export type ParsedRoute = ParsedPart[];

	export interface Constants {
		OPTIONS: {
			dashboardHooks: Required<KlasaDashboardHooksOptions>;
			pieceDefaults: PieceDefaults & {
				routes: Required<RouteOptions>;
				middlewares: Required<MiddlewareOptions>;
			};
		};
		METHODS_LOWER: string[];
		RESPONSES: {
			FETCHING_TOKEN: string;
			NO_CODE: string;
			UNAUTHORIZED: string;
			NOT_READY: string;
			OK: string;
			UPDATED: [string, string];
		};
	}

//#endregion Types
}
