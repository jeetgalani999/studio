
'use server';

import { z } from 'zod';

// Define the schema for the input
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(500, { message: 'Message must not exceed 500 characters.'}),
});

export type SendContactMessageResponse = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    general?: string;
  };
};

export async function sendContactMessage(
  prevState: SendContactMessageResponse | undefined,
  formData: FormData
): Promise<SendContactMessageResponse> {
  const rawFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  };

  const validatedFields = contactFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validatedFields.data;
  const recipientEmail = 'jeetgalani999@gmail.com'; // Your email address

  console.log('Received contact form submission:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);
  console.log('Recipient:', recipientEmail);

  // --- BEGIN EMAIL SENDING LOGIC PLACEHOLDER ---
  // In a real application, you would integrate an email sending service here.
  // For example, using Nodemailer, SendGrid, Resend, AWS SES, etc.
  //
  // Example using a generic email service concept:
  //
  // try {
  //   const mailOptions = {
  //     from: email, // Or a verified sender email from your domain
  //     to: recipientEmail,
  //     subject: `New Contact Form Submission from ${name}`,
  //     text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  //     html: `<p><strong>Name:</strong> ${name}</p>
  //            <p><strong>Email:</strong> ${email}</p>
  //            <p><strong>Message:</strong></p>
  //            <p>${message.replace(/\n/g, '<br>')}</p>`,
  //   };
  //
  //   // await emailService.send(mailOptions); // Replace with your email sending call
  //
  //   // Simulate a delay for the email sending process
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //
  //   console.log('Email sending simulated successfully.');
  //   return { success: true, message: 'Message sent successfully!' };
  //
  // } catch (error) {
  //   console.error('Error sending email:', error);
  //   return { success: false, message: 'Failed to send message. Please try again later.', errors: { general: 'Email sending failed.'} };
  // }
  // --- END EMAIL SENDING LOGIC PLACEHOLDER ---

  // For now, we'll just simulate a successful submission after a short delay
  // Remove this simulation when you implement actual email sending.
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Message submitted successfully!' };
}

