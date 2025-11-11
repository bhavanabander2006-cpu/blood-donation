
import { GoogleGenAI, Type } from "@google/genai";
import type { EligibilityAnswers, DonationCenter, EligibilityResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const checkEligibility = async (answers: EligibilityAnswers): Promise<EligibilityResult> => {
  const prompt = `
    Based on general blood donation guidelines, evaluate the following potential donor's eligibility.
    Provide a clear status ('Eligible', 'Ineligible', or 'Consult') and a concise, user-friendly reason.
    The reason should be encouraging and informative, even if the user is ineligible.
    Do not give medical advice, always suggest consulting a healthcare professional for definitive answers.

    User's Answers:
    - Age: ${answers.age} years
    - Weight: ${answers.weight} kg
    - Time since last donation: ${answers.lastDonation}
    - General health condition: "${answers.health}"

    Return the result as a JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    status: { type: Type.STRING, description: "Can be 'Eligible', 'Ineligible', or 'Consult'" },
                    reason: { type: Type.STRING, description: "A brief explanation for the status." }
                },
                required: ['status', 'reason'],
            },
        },
    });

    const resultText = response.text.trim();
    const resultJson = JSON.parse(resultText) as EligibilityResult;
    
    // Basic validation
    if (['Eligible', 'Ineligible', 'Consult'].includes(resultJson.status) && resultJson.reason) {
      return resultJson;
    } else {
      throw new Error("Invalid format from API");
    }

  } catch (error) {
    console.error("Error checking eligibility:", error);
    return {
      status: 'Consult',
      reason: 'Could not determine eligibility due to a technical issue. Please consult a healthcare professional at a donation center.'
    };
  }
};

export const findDonationCenters = async (location: string): Promise<DonationCenter[]> => {
    const prompt = `
        Generate a list of 3 fictional but realistic-sounding blood donation centers near "${location}".
        For each center, provide a name, a complete address, operating hours, and a phone number.
        Return the list as a JSON array of objects.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            address: { type: Type.STRING },
                            hours: { type: Type.STRING, description: "e.g., Mon-Fri: 9 AM - 5 PM" },
                            phone: { type: Type.STRING, description: "e.g., (555) 123-4567" },
                        },
                        required: ['name', 'address', 'hours', 'phone'],
                    },
                },
            },
        });

        const resultText = response.text.trim();
        return JSON.parse(resultText) as DonationCenter[];
    } catch (error) {
        console.error("Error finding donation centers:", error);
        return [];
    }
};
