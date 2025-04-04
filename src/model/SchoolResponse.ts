export interface SchoolResponse {
    
        school: {
            schoolCode: string,
            schoolName: string,
            schoolID: string,
            address: string,
            phoneNo: string,
            email: string,
            principalName: string,
            principalPhoneNo: string,
            county: string,
            subcounty: string,
            students: string,
            registeredOn:string,
            schoolLevel: string,
            registeredByID: string,
            registeredByName: string,
            deleted: boolean,
            dbUrl: string
        },
        activation: {
            activationID: string,
            moduleName: string,
            schoolName: string,
            schoolCode: string,
            installationDate: string,
            expiryDate: string,
            registeredByID: string,
            registeredByName: string,
            marketerID: string,
            marketerName: string,
            sellingPrice: number,
            maintenanceFee: number,
            lastLogin: string,
            students: string,
            receipts: string,
            vouchers: string
        }
    

}