import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
} from "@react-email/components";

interface BookingFormConfirmationEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
}

const BookingFormConfirmationEmail = ({
  firstName,
  lastName,
  email,
  phone,
  from,
  to,
  departureDate,
  departureTime,
}: BookingFormConfirmationEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Booking Confirmation - Your journey details</Preview>
      <Tailwind>
        <Body className="bg-black font-sans py-10">
          <Container className="bg-white rounded-lg max-w-[600px] mx-auto p-10">
            {/* Header */}
            <Section className="text-center mb-8">
              <Heading className="text-[32px] font-bold text-black m-0 mb-4">Booking Confirmed!</Heading>
              <Text className="text-[16px] text-gray-600 m-0">Thank you for your booking request</Text>
            </Section>

            {/* Greeting */}
            <Section className="mb-6">
              <Text className="text-[16px] text-gray-800 mb-4 leading-6">
                Hi {firstName} {lastName},
              </Text>
              <Text className="text-[16px] text-gray-800 mb-6 leading-6">
                Thank you for choosing our service! We&apos;ve received your booking request and will confirm
                your journey shortly.
              </Text>
            </Section>

            {/* Booking Details */}
            <Section className="mb-8 bg-gray-50 rounded-lg p-6">
              <Heading className="text-[20px] font-semibold text-black m-0 mb-4">Journey Details</Heading>

              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-2 pr-4 text-[14px] text-gray-600 font-semibold">Pickup Location:</td>
                    <td className="py-2 text-[14px] text-gray-800">{from}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-[14px] text-gray-600 font-semibold">Destination:</td>
                    <td className="py-2 text-[14px] text-gray-800">{to}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-[14px] text-gray-600 font-semibold">Date:</td>
                    <td className="py-2 text-[14px] text-gray-800">{departureDate}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-[14px] text-gray-600 font-semibold">Time:</td>
                    <td className="py-2 text-[14px] text-gray-800">{departureTime}</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            <Hr className="border-gray-200 my-6" />

            {/* Contact Information */}
            <Section className="mb-8">
              <Heading className="text-[20px] font-semibold text-black m-0 mb-4">
                Your Contact Details
              </Heading>

              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-2 pr-4 text-[14px] text-gray-600 font-semibold">Email:</td>
                    <td className="py-2 text-[14px] text-gray-800">{email}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-[14px] text-gray-600 font-semibold">Phone:</td>
                    <td className="py-2 text-[14px] text-gray-800">{phone}</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            <Hr className="border-gray-200 my-6" />

            {/* Next Steps */}
            <Section className="mb-8">
              <Text className="text-[16px] text-gray-800 mb-4 leading-6">
                <strong>What happens next?</strong>
              </Text>
              <Text className="text-[14px] text-gray-700 mb-2 leading-6">
                • We&apos;ll review your booking request
              </Text>
              <Text className="text-[14px] text-gray-700 mb-2 leading-6">
                • You&apos;ll receive a confirmation within 24 hours
              </Text>
              <Text className="text-[14px] text-gray-700 mb-4 leading-6">
                • If you have any questions, feel free to reply to this email
              </Text>
            </Section>

            {/* Closing */}
            <Section className="mb-6">
              <Text className="text-[16px] text-gray-800 leading-6">
                Best regards,
                <br />
                Tomasz
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-6 mt-10">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-2">
                © 2025 Private Hire Operator. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                This is an automated confirmation email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default BookingFormConfirmationEmail;
