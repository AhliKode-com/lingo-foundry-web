import React from 'react';
import { TitleText } from '@/components/atoms/title';
import Link from "next/link";

export default function TermsCondition() {
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
  
  const LinkText = ({ href, children }) => (
    <Link href={href} className="text-[#E35D33] hover:underline">{children}</Link>
  );
  
  const ListTitleDescription = ({ items }) => (
    <ul className="text-[16px] font-light animation-effect list-disc list-inside">
      {items.map((item, index) => {
        const [term, description] = item.split(':');
        return (
          <li key={index}>
            <span className="font-bold">{term}:</span>
            {description}
          </li>
        );
      })}
    </ul>
  );

  const List = ({ items }) => (
    <ul className="text-[16px] font-light animation-effect list-disc list-inside">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  const NumberedList = ({ items, sectionNumber }) => (
    <ul className="text-[16px] font-light animation-effect list-none">
      {items.map((item, index) => {
        // Check if the item contains a link placeholder
        if (typeof item === 'string' && item.includes('[Link]')) {
          const [before, after] = item.split('[Link]');
          return (
            <li key={index} className="flex gap-2">
              <span>{sectionNumber}.{index + 1}.</span>
              <span>
                {before}
                <LinkText href="/privacy-policy">Privacy Policy</LinkText>
                {after}
              </span>
            </li>
          );
        }
        // Check if the item contains terms with colons
        if (typeof item === 'string' && item.includes(':')) {
          const parts = item.split(':');
          return (
            <li key={index} className="flex gap-2">
              <span>{sectionNumber}.{index + 1}.</span>
              <span>
                <span className="font-bold">{parts[0]}:</span>
                {parts.slice(1).join(':')}
              </span>
            </li>
          );
        }
        return (
          <li key={index} className="flex gap-2">
            <span>{sectionNumber}.{index + 1}.</span>
            <span>{item}</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="lingo-container flex flex-col pt-[150px] md:pt-[200px] mb-[100px]">
        <TitleText text="Terms & Conditions" marginBottom='mb-[40px]' marginX='mx-auto'/>
        <div className="flex flex-col gap-[20px]">
          {/* header */}
          <div className='flex flex-col gap-[10px]'>
            <Text>Welcome to Lingo Foundry!</Text>
            <Text>Please read these Terms and Conditions carefully before you start using Our Website, as these rules apply to your use of Our Website.</Text>
            <Text>General Provisions</Text>
            <Text>These Lingo Foundry Application Terms and Conditions constitute an agreement between you ("You" or "User") and PT Edukasi Transformasi Nusantara ("We" or "Lingo Foundry"), a limited liability company duly established and operating under the laws of the Republic of Indonesia and domiciled in DKI Jakarta, Indonesia. These Terms and Conditions govern your access and use of the websites (https://lingofoundry.com), features, technology, content, as well as the ordering, payment, or use of services available on the Website ("Services").</Text>
            <Text>By agreeing to these Lingo Foundry Terms and Conditions, you also agree to additional Terms and Conditions, including the Terms and Conditions for each Service. Although they form a single unit, the additional Terms and Conditions will prevail in the event of any discrepancy with these Terms and Conditions.</Text>
            <Text>If you do not agree to any, part, or all these Terms and Conditions, please immediately stop accessing and using Our Website.</Text>
          </div>
          {/* 1 */}
          <Section title="1. Definitions">
            <ListTitleDescription items={[
              "Platform: The website Lingo Foundry provided by the Company.",
              "User: Any individual who accesses and/or uses the Platform, whether as a registered or unregistered user.",
              "Account: A unique User identity registered on the Platform, which includes personal data and service usage history.",
              "Services: All features, functions, and facilities provided by the Platform, including but not limited to online courses, learning materials, exams, discussion forums, and other supporting services.",
              "Content: All information, data, text, images, videos, audio, graphics, designs, software, and other materials available or displayed on the Platform",
              "Personal Data: Any data about an individual, whether identified and/or identifiable individually or combined with other information, either directly or indirectly through electronic and/or non-electronic systems."
            ]}/>
          </Section>
          {/* 2 */}
          <Section title="2. Account Usage Requirements">
            <NumberedList 
              sectionNumber={2}
              items={[
                "You must be at least 18 (eighteen) years old to create an Account and fully use the Services. If you are under 18 (eighteen) years old, you may use the Platform under the supervision and with the consent of a legal parent or guardian. The parent or guardian is fully responsible for all activities carried out by Users under 18 (eighteen) years old.",
                "You are solely responsible for maintaining the confidentiality of your Account information, including your username and password. All activities that occur under your Account are your sole responsibility.",
                "You must provide accurate, complete, and up-to-date information during Account registration and throughout the use of the Services. The Company is not responsible for losses arising from inaccurate or incomplete information.",
                "You are prohibited from sharing, transferring, selling, or assigning your Account to another party.",
                "If any unauthorized use of your Account or other security breaches occurs, you must immediately notify the Company."
              ]}
            />
          </Section>
          {/* 3 */}
          <Section title="3. Use of Services">
            <NumberedList 
              sectionNumber={3}
              items={[
                "You agree to use the Services only for lawful purposes and in accordance with these Terms and Conditions and the applicable laws and regulations of the Republic of Indonesia.",
                "You are prohibited from: a. Using the Platform for illegal, fraudulent, defamatory purposes, or any other acts that harm other parties. b. Downloading, copying, distributing, reproducing, broadcasting, or exploiting Platform Content for commercial purposes without written permission from the Company. c. Taking actions that may interfere with, damage, overload, or impair the performance of the Platform or the servers used by the Platform. d. Uploading or transmitting material that contains viruses, Trojan horses, worms, or other harmful code that may damage or interfere with the operation of the Platform or User data. e. Attempting to gain unauthorized access to other User Accounts, computer systems, or networks connected to the Platform. f. Engaging in spamming, phishing, or any form of unauthorized or unsolicited communication to other Users. g. Violating the intellectual property rights of others, including copyrights, trademarks, patents, or trade secrets.",
                "The Company reserves the right to limit, suspend, or terminate your access to the Services if you violate these Terms and Conditions."
              ]}
            />
          </Section>
          {/* 4 */}
          <Section title="4. User Content">
            <NumberedList 
              sectionNumber={4}
              items={[
                "If you upload, post, or submit Content to the Platform (e.g., in discussion forums, comment sections, or assignments), you warrant that such Content does not violate the law, does not contain elements of pornography, SARA (ethnicity, religion, race, and intergroup relations), provocation, hate speech, or other matters prohibited by applicable laws and regulations.",
                "You grant the Company a non-exclusive, royalty-free, transferable, and sub-licensable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, display, and perform User Content worldwide in any media in connection with the operation of the Platform and the Company's business.",
                "You are solely responsible for the authenticity, accuracy, and legality of the Content you submit. The Company is not responsible for Content created by Users.",
                "The Company reserves the right to remove or block User Content deemed to violate these Terms and Conditions or applicable laws and regulations, without prior notice."
              ]}
            />
          </Section>
          {/* 5 */}
          <Section title="5. Intellectual Property Rights">
            <NumberedList 
              sectionNumber={5}
              items={[
                "All Content available on the Platform, including but not limited to text, images, videos, audio, graphic designs, logos, icons, and software, are the copyright and/or intellectual property of the Company or its licensors.",
                "Users are not permitted to use, copy, modify, distribute, sell, or reproduce any part of the Content without written permission from the Company.",
                "Violations of the Company's intellectual property rights may be subject to sanctions in accordance with applicable laws and regulations, including Law No. 28 of 2014 concerning Copyright and Law No. 20 of 2016 concerning Marks and Geographical Indications."
              ]}
            />
          </Section>
          {/* 6 */}
          <Section title="6. Payments and Refunds (If Applicable)">
            <NumberedList 
              sectionNumber={6}
              items={[
                "To access paid courses or services, you agree to pay the stipulated fees. Pricing details and payment methods will be explained at the time of your purchase.",
                "Payments made are final and non-refundable, unless explicitly stated otherwise in the specific refund policy for a particular Service.",
                "The Company reserves the right to change the price of Services at any time with prior notice through the Platform or email."
              ]}
            />
          </Section>
          {/* 7 */}
          <Section title="7. Privacy Policy">
            <NumberedList 
              sectionNumber={7}
              items={[
                "The Company highly values your privacy. The collection, use, storage, processing, and deletion of your Personal Data will be subject to our Privacy Policy, which can be accessed at [Link].",
                "By using the Platform, you consent to the collection and use of your Personal Data in accordance with our Privacy Policy.",
                "The Company will take reasonable steps to protect your Personal Data from unauthorized access, use, or disclosure."
              ]}
            />
          </Section>
          {/* 8 */}
          <Section title="8. Disclaimer of Warranties and Limitation of Liability">
            <NumberedList 
              sectionNumber={8}
              items={[
                `The Platform and Services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.`,
                "The Company does not warrant that the Platform will always be available, uninterrupted, timely, secure, error-free, or that defects will be corrected.",
                "The Company shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages whatsoever arising out of or in connection with the use or inability to use the Platform or Services.",
                "In no event shall the Company's maximum liability to you for any damages arising out of or in connection with these Terms and Conditions or the use of the Platform exceed the amount you have paid to the Company for the relevant Services."
              ]}
            />
          </Section>
          {/* 9 */}
          <Section title="9. Changes to Terms and Conditions">
            <NumberedList 
              sectionNumber={9}
              items={[
                "The Company reserves the right to modify or update these Terms and Conditions at any time. Changes will be effective upon their publication on the Platform.",
                "You are responsible for regularly reviewing these Terms and Conditions. Your continued use of the Platform after the changes are published constitutes your acceptance of the revised Terms and Conditions."
              ]}
            />
          </Section>
          {/* 10 */}
          <Section title="10. Dispute Resolution">
            <NumberedList 
              sectionNumber={10}
              items={[
                "Any disputes arising from or in connection with these Terms and Conditions shall be resolved amicably through deliberation to reach a consensus.",
                "These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of Indonesia."
              ]}
            />
          </Section>
          {/* 11 */}
          <Section title="11. Miscellaneous">
            <NumberedList 
              sectionNumber={11}
              items={[
                "Severability: If any provision of these Terms and Conditions is deemed invalid, void, or unenforceable, that provision shall be deemed severable and shall not affect the validity and enforceability of the remaining provisions.",
                "Termination: The Company may terminate your Account and/or your access to the Platform at any time, with or without cause, with prior notice where possible.",
                "Contact Us: If you have any questions or concerns regarding these Terms and Conditions, please contact us via admin@lingofoundry.com."
              ]}
            />
          </Section>
        </div>
      </div>
  );
};
