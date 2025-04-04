export interface LoginRequest  {
    phoneNo: string;
    password: string;
}
export interface LoginResponse  {
    token: string;
    type: string;
    id: string;
    username: string;
    phoneNo: string;
    accountNo: string;
    roles: string[];


}