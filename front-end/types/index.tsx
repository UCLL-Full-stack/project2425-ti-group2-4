export interface Patient {
    id: number;
    name: string;
    age: number;
    sex: 'Male' | 'Female' | 'Other';
    address: string;
    city: string;
    zipCode: string;
    photoUrl?: string;
    medicalAlerts: Array<string>;
    consultations: Array<{
        datetime: Date; // e.g., '2024-12-10'
        provider: string; // e.g., 'Dr. Smith'
    }>;
    insurance: {
        primary: string;
        secondary?: string;
    };
}
