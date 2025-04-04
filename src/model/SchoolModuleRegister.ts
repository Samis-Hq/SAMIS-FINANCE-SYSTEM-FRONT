//SchooRegister.ts



export interface School {
    schoolCode: string;
    schoolName: string | null;
    schoolID: string | null;
    address: string | null;
    phoneNo: string | null;
    email: string | null;
    principalName: string | null;
    principalPhoneNo: string | null;
    county: string | null;
    subcounty: string | null;
    students: any | null;
    registeredOn: string | null;
    schoolLevel: string | null;
    registeredByID: string | null;
    registeredByName: string | null;
    deleted: boolean;
    dbUrl: string | null;
}

export interface Activation {
    activationID: string | null;
    moduleName: string;
    schoolName: string | null;
    schoolCode: string;
    installationDate: string | null;
    expiryDate: string | null;
    registeredByID: string | null;
    registeredByName: string | null;
    marketerID: string | null;
    marketerName: string | null;
    sellingPrice: number | null;
    maintenanceFee: number | null;
    lastLogin: string | null;
    students: any | null;
    receipts: any | null;
    vouchers: any | null;
}

export interface RegisterSchoolModuleRequest {
    schoolCode: string;
    moduleName: string;
}

export interface RegisterSchoolModuleResponse {
    school: School;
    activation: Activation;
}

