export interface SubjectDto{
    x500Name: String;
    subjectUsername :String;
    serialNumber:String;
    startDate: Date;
    endDate:Date;
    pem:String,
     issuerUsername:String;
     organization:String;
     organizationUnit:String;
     country:String;
}