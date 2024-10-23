/* Options:
Date: 2024-10-23 11:03:32
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

export interface ICreateDb<Table>
{
}

export interface IPatchDb<Table>
{
}

export interface IDeleteDb<Table>
{
}

export class UserClaimsDto
{
    public id: number;
    public userId: string;
    public claimType?: string;
    public claimValue?: string;

    public constructor(init?: Partial<UserClaimsDto>) { (Object as any).assign(this, init); }
}

// @DataContract
export class QueryBase
{
    // @DataMember(Order=1)
    public skip?: number;

    // @DataMember(Order=2)
    public take?: number;

    // @DataMember(Order=3)
    public orderBy: string;

    // @DataMember(Order=4)
    public orderByDesc: string;

    // @DataMember(Order=5)
    public include: string;

    // @DataMember(Order=6)
    public fields: string;

    // @DataMember(Order=7)
    public meta: { [index: string]: string; };

    public constructor(init?: Partial<QueryBase>) { (Object as any).assign(this, init); }
}

export class RoleClaimsDto
{
    public id: number;
    public roleId: string;
    public claimType?: string;
    public claimValue?: string;

    public constructor(init?: Partial<RoleClaimsDto>) { (Object as any).assign(this, init); }
}

export class QueryDb<T> extends QueryBase
{

    public constructor(init?: Partial<QueryDb<T>>) { super(init); (Object as any).assign(this, init); }
}

// @DataContract
export class AuditBase
{
    // @DataMember(Order=1)
    public createdDate: string;

    // @DataMember(Order=2)
    // @Required()
    public createdBy: string;

    // @DataMember(Order=3)
    public modifiedDate: string;

    // @DataMember(Order=4)
    // @Required()
    public modifiedBy: string;

    // @DataMember(Order=5)
    public deletedDate?: string;

    // @DataMember(Order=6)
    public deletedBy: string;

    public constructor(init?: Partial<AuditBase>) { (Object as any).assign(this, init); }
}

export enum RoomType
{
    Single = 'Single',
    Double = 'Double',
    Queen = 'Queen',
    Twin = 'Twin',
    Suite = 'Suite',
}

/** @description Discount Coupons */
export class Coupon
{
    public id: string;
    public description: string;
    public discount: number;
    public expiryDate: string;

    public constructor(init?: Partial<Coupon>) { (Object as any).assign(this, init); }
}

/** @description Booking Details */
export class Booking extends AuditBase
{
    public id: number;
    public name: string;
    public roomType: RoomType;
    public roomNumber: number;
    public bookingStartDate: string;
    public bookingEndDate?: string;
    public cost: number;
    // @References("typeof(ServiceStackBaseCms.ServiceModel.Coupon)")
    public couponId?: string;

    public discount: Coupon;
    public notes?: string;
    public cancelled?: boolean;

    public constructor(init?: Partial<Booking>) { super(init); (Object as any).assign(this, init); }
}

/** @description Pages Management */
export class Page extends AuditBase
{
    public id: number;
    public title: string;
    public permalink: string;
    public shortDescription: string;
    public content: string;
    public seoMeta: string;
    // @Required()
    public status: number;

    public thumbnailImage: string;

    public constructor(init?: Partial<Page>) { super(init); (Object as any).assign(this, init); }
}

export class UserDto
{
    public id: string;
    public firstName?: string;
    public lastName?: string;
    public displayName?: string;
    public profileUrl?: string;
    public userName?: string;
    public email?: string;
    public roleName: string[];
    public userClaims: UserClaimsDto[];

    public constructor(init?: Partial<UserDto>) { (Object as any).assign(this, init); }
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

export class RolesDto
{
    public id: string;
    public name?: string;
    public normalizedName?: string;
    public concurrencyStamp?: string;
    public roleClaims: RoleClaimsDto[];

    public constructor(init?: Partial<RolesDto>) { (Object as any).assign(this, init); }
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

export class TodoDto
{
    public id: number;
    public text: string;
    public isFinished: boolean;

    public constructor(init?: Partial<TodoDto>) { (Object as any).assign(this, init); }
}

// @DataContract
export class QueryResponse<UserDto>
{
    // @DataMember(Order=1)
    public offset: number;

    // @DataMember(Order=2)
    public total: number;

    // @DataMember(Order=3)
    public results: UserDto[];

    // @DataMember(Order=4)
    public meta: { [index: string]: string; };

    // @DataMember(Order=5)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<QueryResponse<UserDto>>) { (Object as any).assign(this, init); }
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

// @DataContract
export class IdResponse
{
    // @DataMember(Order=1)
    public id: string;

    // @DataMember(Order=2)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<IdResponse>) { (Object as any).assign(this, init); }
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
    public roles?: string[];
    public userClaims: UserClaimsDto[];

    public constructor(init?: Partial<CreateUserRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateUserRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/user", "PUT")
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
    public userClaims: UserClaimsDto[];

    public constructor(init?: Partial<UpdateUserRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateUserRequest'; }
    public getMethod() { return 'PUT'; }
    public createResponse() {}
}

// @Route("/users", "GET")
export class UsersRequest extends QueryBase implements IReturn<QueryResponse<UserDto>>
{
    public name: string;

    public constructor(init?: Partial<UsersRequest>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UsersRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<UserDto>(); }
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
export class RolesRequest extends QueryBase implements IReturn<QueryResponse<RolesDto>>
{
    public name: string;

    public constructor(init?: Partial<RolesRequest>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'RolesRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<RolesDto>(); }
}

// @Route("/UserClaim/{Id}", "GET")
export class UserClaimRequest
{
    public id: number;

    public constructor(init?: Partial<UserClaimRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UserClaimRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() {}
}

// @Route("/UserClaims", "GET")
export class UserClaimsRequest extends QueryBase implements IReturn<QueryResponse<UserClaimsDto>>
{

    public constructor(init?: Partial<UserClaimsRequest>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'UserClaimsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<UserClaimsDto>(); }
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
export class RoleClaimsRequest implements IReturn<QueryResponse<RoleClaimsDto>>
{
    public id: number;
    public roleId: string;
    public claimValue?: string;

    public constructor(init?: Partial<RoleClaimsRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RoleClaimsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<RoleClaimsDto>(); }
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
    public roleClaims: RoleClaimsDto[];

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
    public roleClaims: RoleClaimsDto[];

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
    public roleId: string;
    public claimType?: string;
    public claimValue?: string;

    public constructor(init?: Partial<CreateRoleClaim>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateRoleClaim'; }
    public getMethod() { return 'POST'; }
    public createResponse() {}
}

// @Route("/permissions", "GET")
export class PermissionsRequest extends QueryBase
{

    public constructor(init?: Partial<PermissionsRequest>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'PermissionsRequest'; }
    public getMethod() { return 'GET'; }
    public createResponse() {}
}

// @Route("/role/{Id}", "GET")
export class RoleRequest
{
    public id: string;

    public constructor(init?: Partial<RoleRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'RoleRequest'; }
    public getMethod() { return 'GET'; }
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

/** @description Find Bookings */
// @Route("/bookings", "GET")
// @Route("/bookings/{Id}", "GET")
export class QueryBookings extends QueryDb<Booking> implements IReturn<QueryResponse<Booking>>
{
    public id?: number;

    public constructor(init?: Partial<QueryBookings>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryBookings'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<Booking>(); }
}

/** @description Find Coupons */
// @Route("/coupons", "GET")
export class QueryCoupons extends QueryDb<Coupon> implements IReturn<QueryResponse<Coupon>>
{
    public id?: string;

    public constructor(init?: Partial<QueryCoupons>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryCoupons'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<Coupon>(); }
}

/** @description Danh sách/Chi tiết page */
// @Route("/pages", "GET")
// @Route("/pages/{Id}", "GET")
export class QueryPages extends QueryDb<Page> implements IReturn<QueryResponse<Page>>
{
    public id?: number;

    public constructor(init?: Partial<QueryPages>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryPages'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<Page>(); }
}

/** @description Create a new Booking */
// @Route("/bookings", "POST")
// @ValidateRequest(Validator="HasRole(`Employee`)")
export class CreateBooking implements IReturn<IdResponse>, ICreateDb<Booking>
{
    /** @description Name this Booking is for */
    // @Validate(Validator="NotEmpty")
    public name: string;

    public roomType: RoomType;
    // @Validate(Validator="GreaterThan(0)")
    public roomNumber: number;

    // @Validate(Validator="GreaterThan(0)")
    public cost: number;

    // @Required()
    public bookingStartDate: string;

    public bookingEndDate?: string;
    public notes?: string;
    public couponId?: string;

    public constructor(init?: Partial<CreateBooking>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateBooking'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new IdResponse(); }
}

/** @description Update an existing Booking */
// @Route("/booking/{Id}", "PATCH")
// @ValidateRequest(Validator="HasRole(`Employee`)")
export class UpdateBooking implements IReturn<IdResponse>, IPatchDb<Booking>
{
    public id: number;
    public name?: string;
    public roomType?: RoomType;
    // @Validate(Validator="GreaterThan(0)")
    public roomNumber?: number;

    // @Validate(Validator="GreaterThan(0)")
    public cost?: number;

    public bookingStartDate?: string;
    public bookingEndDate?: string;
    public notes?: string;
    public couponId?: string;
    public cancelled?: boolean;

    public constructor(init?: Partial<UpdateBooking>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateBooking'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new IdResponse(); }
}

/** @description Delete a Booking */
// @Route("/booking/{Id}", "DELETE")
// @ValidateRequest(Validator="HasRole(`Manager`)")
export class DeleteBooking implements IReturnVoid, IDeleteDb<Booking>
{
    public id: number;

    public constructor(init?: Partial<DeleteBooking>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteBooking'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @Route("/coupons", "POST")
// @ValidateRequest(Validator="HasRole(`Employee`)")
export class CreateCoupon implements IReturn<IdResponse>, ICreateDb<Coupon>
{
    // @Validate(Validator="NotEmpty")
    public description: string;

    // @Validate(Validator="GreaterThan(0)")
    public discount: number;

    // @Validate(Validator="NotNull")
    public expiryDate: string;

    public constructor(init?: Partial<CreateCoupon>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateCoupon'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new IdResponse(); }
}

// @Route("/coupons/{Id}", "PATCH")
// @ValidateRequest(Validator="HasRole(`Employee`)")
export class UpdateCoupon implements IReturn<IdResponse>, IPatchDb<Coupon>
{
    public id: string;
    // @Validate(Validator="NotEmpty")
    public description: string;

    // @Validate(Validator="NotNull")
    // @Validate(Validator="GreaterThan(0)")
    public discount: number;

    // @Validate(Validator="NotNull")
    public expiryDate: string;

    public constructor(init?: Partial<UpdateCoupon>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateCoupon'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new IdResponse(); }
}

/** @description Delete a Coupon */
// @Route("/coupons/{Id}", "DELETE")
// @ValidateRequest(Validator="HasRole(`Manager`)")
export class DeleteCoupon implements IReturnVoid, IDeleteDb<Coupon>
{
    public id: string;

    public constructor(init?: Partial<DeleteCoupon>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteCoupon'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

/** @description Tạo mới page */
// @Route("/pages", "POST")
export class CreatePage implements IReturn<IdResponse>, ICreateDb<Page>
{
    public title: string;
    public permalink: string;
    public shortDescription: string;
    public content: string;
    public seoMeta: string;
    public status: number;
    public thumbnailImage: string;

    public constructor(init?: Partial<CreatePage>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreatePage'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new IdResponse(); }
}

