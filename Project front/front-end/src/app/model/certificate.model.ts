export interface Certificate {
    issuerUsername: string;
    subjectUsername: string;
    subjectOrganization: string;
    subjectOrganizationUnit: string;
    subjectCountry: string;
    subjectEmail: string;
    newKeyStorePassword: string;
    newKeyStoreIssuerPassword: string;
    startDate: Date;
    endDate: Date;
    type: string;
}