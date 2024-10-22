/* Options:
Date: 2024-10-21 18:13:24
Version: 8.40
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://localhost:5001

//GlobalNamespace: 
//MakePropertiesOptional: False
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/

// @ts-nocheck

export interface IReturn<T>
{
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export interface IGet
{
}

export interface IHasSessionId
{
    sessionId?: string;
}

export interface IHasBearerToken
{
    bearerToken?: string;
}

export interface IDelete
{
}

export interface IPost
{
}

export interface IPut
{
}

export class PagedAndSortedRequest
{
    public sorting: string;
    public filter: string;
    public skipCount: number;
    public maxResultCount: number;

    public constructor(init?: Partial<PagedAndSortedRequest>) { (Object as any).assign(this, init); }
}

export class Forecast implements IGet
{
    public date: string;
    public temperatureC: number;
    public summary?: string;
    public temperatureF: number;

    public constructor(init?: Partial<Forecast>) { (Object as any).assign(this, init); }
}

export class PageStats
{
    public label: string;
    public total: number;

    public constructor(init?: Partial<PageStats>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public fieldName: string;

    // @DataMember(Order=3)
    public message: string;

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseError>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<ResponseStatus>) { (Object as any).assign(this, init); }
}

export class TodoDto
{
    public id: number;
    public text: string;
    public isFinished: boolean;

    public constructor(init?: Partial<TodoDto>) { (Object as any).assign(this, init); }
}

export class HelloResponse
{
    public result: string;

    public constructor(init?: Partial<HelloResponse>) { (Object as any).assign(this, init); }
}

export class AdminDataResponse
{
    public pageStats: PageStats[];

    public constructor(init?: Partial<AdminDataResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class RegisterResponse implements IHasSessionId, IHasBearerToken
{
    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public referrerUrl: string;

    // @DataMember(Order=5)
    public bearerToken: string;

    // @DataMember(Order=6)
    public refreshToken: string;

    // @DataMember(Order=7)
    public refreshTokenExpiry?: string;

    // @DataMember(Order=8)
    public roles: string[];

    // @DataMember(Order=9)
    public permissions: string[];

    // @DataMember(Order=10)
    public redirectUrl: string;

    // @DataMember(Order=11)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=12)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<RegisterResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken
{
    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public referrerUrl: string;

    // @DataMember(Order=6)
    public bearerToken: string;

    // @DataMember(Order=7)
    public refreshToken: string;

    // @DataMember(Order=8)
    public refreshTokenExpiry?: string;

    // @DataMember(Order=9)
    public profileUrl: string;

    // @DataMember(Order=10)
    public roles: string[];

    // @DataMember(Order=11)
    public permissions: string[];

    // @DataMember(Order=12)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=13)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<AuthenticateResponse>) { (Object as any).assign(this, init); }
}

// @Route("/todos", "GET")
export class QueryTodos
{
    public id?: number;
    public ids?: number[];
    public textContains?: string;

    public constructor(init?: Partial<QueryTodos>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryTodos'; }
    public getMethod() { return 'GET'; }
    public createResponse() {}
}

// @Route("/todos/{Id}", "GET")
export class GetTodoRequest implements IReturn<TodoDto>, IGet
{
    public id: number;

    public constructor(init?: Partial<GetTodoRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTodoRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new TodoDto(); }
}

// @Route("/todos/{Id}", "DELETE")
export class DeleteTodoRequest implements IReturnVoid, IDelete
{
    public id: number;

    public constructor(init?: Partial<DeleteTodoRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteTodoRequest'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @Route("/todos", "POST")
export class CreateTodoRequest implements IReturn<TodoDto>, IPost
{
    // @Validate(Validator="NotEmpty")
    public text: string;

    public constructor(init?: Partial<CreateTodoRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateTodoRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new TodoDto(); }
}

// @Route("/todos/{Id}", "PUT")
export class UpdateTodoRequest implements IReturn<TodoDto>, IPut
{
    public id: number;
    // @Validate(Validator="NotEmpty")
    public text: string;

    public isFinished: boolean;

    public constructor(init?: Partial<UpdateTodoRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateTodoRequest'; }
    public getMethod() { return 'PUT'; }
    public createResponse() { return new TodoDto(); }
}

// @Route("/user", "POST")
// @ValidateRequest(Validator="HasRole(`Admin`)")
export class CreateUserRequest
{
    public firstName?: string;
    public lastName?: string;
    public displayName?: string;
    public profileUrl?: string;
    public userName?: string;
    public normalizedUserName?: string;
    public email?: string;
    public normalizedEmail?: string;
    public emailConfirmed: boolean;
    public password?: string;
    public securityStamp?: string;
    public concurrencyStamp?: string;
    public phoneNumber?: string;
    public phoneNumberConfirmed: boolean;
    public twoFactorEnabled: boolean;
    public lockoutEnd?: string;
    public lockoutEnabled: boolean;
    public roles: string[];

    public constructor(init?: Partial<CreateUserRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateUserRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/user", "PUT")
// @ValidateRequest(Validator="HasRole(`Admin`)")
export class UpdateUserRequest
{
    public id?: string;
    public firstName?: string;
    public lastName?: string;
    public displayName?: string;
    public profileUrl?: string;
    public userName?: string;
    public normalizedUserName?: string;
    public email?: string;
    public normalizedEmail?: string;
    public emailConfirmed: boolean;
    public password?: string;
    public securityStamp?: string;
    public concurrencyStamp?: string;
    public phoneNumber?: string;
    public phoneNumberConfirmed: boolean;
    public twoFactorEnabled: boolean;
    public lockoutEnd?: string;
    public lockoutEnabled: boolean;
    public roles: string[];

    public constructor(init?: Partial<UpdateUserRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateUserRequest'; }
    public getMethod() { return 'PUT'; }
    public createResponse() {}
}

// @Route("/users", "GET")
export class UsersRequest extends PagedAndSortedRequest
{
    public name: string;

    public constructor(init?: Partial<UsersRequest>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UsersRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() {}
}

// @Route("/user/{Id}", "GET")
export class UserRequest
{
    public id: string;

    public constructor(init?: Partial<UserRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UserRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() {}
}

// @Route("/roles", "GET")
export class RolesRequest
{
    public name: string;

    public constructor(init?: Partial<RolesRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RolesRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() {}
}

// @Route("/UserClaim/{Id}", "GET")
export class UserClaimRequest
{
    public id: string;

    public constructor(init?: Partial<UserClaimRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UserClaimRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() {}
}

// @Route("/UserClaims", "GET")
export class UserClaimsRequest
{

    public constructor(init?: Partial<UserClaimsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UserClaimsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() {}
}

// @Route("/UserClaim", "PUT")
export class UpdateUserClaimRequest
{
    public id: number;
    public claimValue?: string;

    public constructor(init?: Partial<UpdateUserClaimRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateUserClaimRequest'; }
    public getMethod() { return 'PUT'; }
    public createResponse() {}
}

// @Route("/UserClaim", "POST")
export class CreateUserClaimRequest
{
    public id: number;
    public userId: string;
    public claimType?: string;
    public claimValue?: string;

    public constructor(init?: Partial<CreateUserClaimRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateUserClaimRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/RoleClaims", "GET")
export class RoleClaimsRequest
{
    public id: number;
    public roleId: string;
    public claimValue?: string;

    public constructor(init?: Partial<RoleClaimsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RoleClaimsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() {}
}

// @Route("/RoleClaim/{Id}", "GET")
export class RoleClaimRequest
{
    public id: number;

    public constructor(init?: Partial<RoleClaimRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RoleClaimRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() {}
}

// @Route("/role", "POST")
export class CreateRolesRequest
{
    public id: string;
    public name?: string;
    public normalizedName?: string;
    public concurrencyStamp?: string;

    public constructor(init?: Partial<CreateRolesRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateRolesRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/role", "PUT")
export class UpdateRolesRequest
{
    public id: string;
    public name?: string;
    public normalizedName?: string;
    public concurrencyStamp?: string;

    public constructor(init?: Partial<UpdateRolesRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateRolesRequest'; }
    public getMethod() { return 'PUT'; }
    public createResponse() {}
}

// @Route("/RoleClaim", "PUT")
export class UpdateRoleClaim
{
    public id: number;
    public roleId: string;
    public claimValue?: string;

    public constructor(init?: Partial<UpdateRoleClaim>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateRoleClaim'; }
    public getMethod() { return 'PUT'; }
    public createResponse() {}
}

// @Route("/RoleClaim", "POST")
export class CreateRoleClaim
{
    public id: number;
    public roleId: string;
    public claimType?: string;
    public claimValue?: string;

    public constructor(init?: Partial<CreateRoleClaim>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateRoleClaim'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/hello/{Name}")
export class Hello implements IReturn<HelloResponse>, IGet
{
    public name: string;

    public constructor(init?: Partial<Hello>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Hello'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new HelloResponse(); }
}

export class GetWeatherForecast implements IReturn<Forecast[]>, IGet
{
    public date?: string;

    public constructor(init?: Partial<GetWeatherForecast>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetWeatherForecast'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new Array<Forecast>(); }
}

export class AdminData implements IReturn<AdminDataResponse>, IGet
{

    public constructor(init?: Partial<AdminData>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'AdminData'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new AdminDataResponse(); }
}

/** @description Sign Up */
// @Api(Description="Sign Up")
// @DataContract
export class Register implements IReturn<RegisterResponse>, IPost
{
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public firstName: string;

    // @DataMember(Order=3)
    public lastName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public email: string;

    // @DataMember(Order=6)
    public password: string;

    // @DataMember(Order=7)
    public confirmPassword: string;

    // @DataMember(Order=8)
    public autoLogin?: boolean;

    // @DataMember(Order=10)
    public errorView: string;

    // @DataMember(Order=11)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<Register>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Register'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new RegisterResponse(); }
}

// @Route("/confirm-email")
export class ConfirmEmail implements IReturnVoid, IGet
{
    public userId: string;
    public code: string;
    public returnUrl?: string;

    public constructor(init?: Partial<ConfirmEmail>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'ConfirmEmail'; }
    public getMethod() { return 'GET'; }
    public createResponse() {}
}

/** @description Sign In */
// @Route("/auth", "GET,POST")
// @Route("/auth/{provider}", "POST")
// @Api(Description="Sign In")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost
{
    /** @description AuthProvider, e.g. credentials */
    // @DataMember(Order=1)
    public provider: string;

    // @DataMember(Order=2)
    public userName: string;

    // @DataMember(Order=3)
    public password: string;

    // @DataMember(Order=4)
    public rememberMe?: boolean;

    // @DataMember(Order=5)
    public accessToken: string;

    // @DataMember(Order=6)
    public accessTokenSecret: string;

    // @DataMember(Order=7)
    public returnUrl: string;

    // @DataMember(Order=8)
    public errorView: string;

    // @DataMember(Order=9)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<Authenticate>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Authenticate'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AuthenticateResponse(); }
}

