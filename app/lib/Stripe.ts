import Stripe from 'stripe';
import { env } from '../Schemas/envSchema';

export const stripe = new Stripe('sk_test_51PpX1v06hN8jecQvZVmVqLAHk3F6XqIDiOOwgn1PBDLGxmygJEkmdHMHY45s4PBcKvuXXHgtVwOKmEW5w0FdMkql00fpGgjPOj', {
    apiVersion: '2024-06-20',
    appInfo: {
        name: 'Ignite Shop',
    }
});