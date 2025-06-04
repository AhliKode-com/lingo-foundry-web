import React from 'react';
import { TitleText } from '@/components/atoms/title';

const Section = ({ title, children }) => (
  <div className='flex flex-col gap-[10px]'>
    <span className="text-[24px] font-bold animation-effect">{title}</span>
    <div className='flex flex-col gap-[10px]'>
      {children}
    </div>
  </div>
);

const Text = ({ children }) => (
  <span className="text-[16px] font-light animation-effect">{children}</span>
);

const List = ({ items }) => (
  <ul className="text-[16px] font-light animation-effect list-disc list-inside">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

export default function PrivacyPolicy() {
  return (
    <div className="lingo-container flex flex-col pt-[150px] md:pt-[200px] mb-[100px]">
      <TitleText text="Privacy Policy" marginBottom='mb-[40px]' marginX='mx-auto'/>
      <div className="flex flex-col gap-[20px]">
        <Section title="1. Introduction">
          <Text>Welcome to Lingo Foundry, an online tutor service (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). The Privacy Policy applies to you, either as a student or a tutor (&quot;User&quot; or &quot;You&quot;).</Text>
          <Text>We respect your privacy and want to know what information about you we collect and what we do with that information. To help you understand how the information you provide will be used by us, a privacy policy has been created. We committed to protecting your privacy and ensuring the security of your personal data. This privacy policy applied to all information that we collect or that we receive from you.</Text>
          <Text>By using our website and services, you agree to the terms outlined in this policy.</Text>
        </Section>

        <Section title="2. Data Collection">
          <Text>We collect the following categories of personal data:</Text>
          <Text>Registration information. You are not required to register or provide any personal information about yourself to visit the website and or to see certain features available on our website in general. However, we may offer you the opportunity to register with us. When you create an Account, you are required to provide certain personal information. Including your first name and last name, username (will use your email address), your country of residence, telephone number and password. On the other hand, we may ask you to provide additional information such as your age, gender, other personal information about yourself to receive additional information about our services.</Text>
          <Text>In addition, you may also be asked to provide credit card information and billing address before using the service. If you allow us to do so, we will store your credit card information in our database to facilitate the checkout process for the next transaction.</Text>
          <Text>During your use of our Service, we may collect information related to your need, time zone, language skills, course evaluations, course scheduling and communication with the teachers through our Service, customer service complaint records, surveys, friend recommendations, and relevant usage.</Text>
        </Section>

        <Section title="3. Payment Terms">
          <List items={[
            "Payments are made in IDR via secure third-party payment gateways (e.g., Midtrans).",
            "Students are required to make full payment before accessing premium content or booking classes.",
            "Tutors will be compensated based on agreed schedules and terms; payments will be transferred monthly or upon meeting the minimum payout threshold.",
            "We do not store credit/debit card details on our servers."
          ]} />
        </Section>

        <Section title="4. Tutor Obligations">
          <Text>In order to provide you with the online tutor service (&quot;the Service&quot;), we need to collect the information related to your educational background, qualifications, resume, work experience, photo, license and certificate, self-introduction video, demonstration video, and other reference helpful for you to solicit students provided by you willingly.</Text>
          <List items={[
            "Tutors must provide accurate identity and qualification information.",
            "Tutors agree to adhere to our Code of Conduct and Education Standards.",
            "Tutors are responsible for the content and interaction they provide.",
            "Tutors must not record or distribute any class or session without explicit consent from participants and the platform."
          ]} />
        </Section>

        <Section title="5. Data Storage, Retention and Security">
          <List items={[
            "Personal data is stored securely on encrypted servers.",
            "We retain data for as long as necessary to fulfill service purposes, legal obligations, or until consent is withdrawn.",
            "To help protect your account information, please protect the security of your password. We recommend that you not share your password with anyone. Finally, you are responsible for maintaining the confidentiality of your password and all information regarding your account.",
            "Remember to exit your account, and close your browser window whenever you leave your computer. This is to ensure other people cannot access your personal information, because your computer may be accessed by others or used in shared settings."
          ]} />
        </Section>

        <Section title="6. Data Disclosure and Sharing">
          <List items={[
            "We do not sell your personal data.",
            "Our website may contain linkages to other website, such as the personal website of the teacher, the payment interface provided by our payment service partner or the campaign website hosted by our partners. Please note that such websites are not within the application of this Privacy Policy. Please check the website&apos;s privacy policy and assess the level of security when you leave our website to visit another website."
          ]} />
        </Section>

        <Section title="7. Data Subject Rights">
          <Text>You have the right to:</Text>
          <List items={[
            "Access your personal data",
            "Correct inaccurate data",
            "Withdraw consent",
            "Request deletion of data"
          ]} />
          <div className='flex flex-col'>
            <Text>Requests can be submitted via:</Text>
            <Text><span className='font-bold'>Email:</span> [admin@lingofoundry.com]</Text>
          </div>
        </Section>

        <Section title="8. Cookies and Tracking">
          <Text>Cookies. When you visit our website or click through a hyperlink that appears on it, or use one or more of our services, we can use industrial technology called &quot;cookies&quot; that store certain information on your computer and that will allow us to adjust your experience for more match your interests and preferences or make it easy for you to sign-in to use the service. Most browsers will allow you to delete cookies from your computer&apos;s hard drive, block receipt of cookies, or receive a warning before cookies are stored. Please look at your browser&apos;s instructions or help screen to learn more about these functions. Please note, however, if you set your browser to block acceptance of cookies, you cannot use the service or enter our website or vice versa, it can adversely affect the site&apos;s functionality.</Text>
        </Section>

        <Section title="9. Changes to This Policy">
          <Text>We reserve the right to modify this Privacy Policy at any time. Updates will be posted on this page with a revised &quot;Effective Date&quot;.</Text>
        </Section>

        <Section title="10. Governing Law and Dispute Resolution">
          <Text>This policy is governed by the laws of the Republic of Indonesia. Any disputes arising out of or related to this policy shall be resolved through mediation or arbitration in accordance with Indonesian legal procedures.</Text>
        </Section>
      </div>
    </div>
  );
}