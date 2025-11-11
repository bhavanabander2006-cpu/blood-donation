
export interface EligibilityAnswers {
  age: string;
  weight: string;
  lastDonation: string;
  health: string;
}

export interface DonationCenter {
  name: string;
  address: string;
  hours: string;
  phone: string;
}

export interface EligibilityResult {
    status: 'Eligible' | 'Ineligible' | 'Consult';
    reason: string;
}
