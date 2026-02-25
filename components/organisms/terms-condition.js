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

  const DefinitionTable = ({ items }) => (
    <div className="text-[16px] font-light animation-effect flex flex-col gap-[10px]">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-1 sm:gap-4">
          <span className="font-bold min-w-[200px] shrink-0">&ldquo;{item.term}&rdquo;</span>
          <span>means {item.definition}</span>
        </div>
      ))}
    </div>
  );

  const NumberedList = ({ items, startFrom = 1 }) => (
    <ul className="text-[16px] font-light animation-effect list-none">
      {items.map((item, index) => {
        if (typeof item === 'object' && item.content) {
          return (
            <li key={index} className="flex gap-2">
              <span className="shrink-0">{startFrom + index}.</span>
              <span>{item.content}</span>
            </li>
          );
        }
        return (
          <li key={index} className="flex gap-2">
            <span className="shrink-0">{startFrom + index}.</span>
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
          {/* Last Updated */}
          <div className='flex flex-col gap-[10px]'>
            <Text><span className="font-bold">Last Updated on: August 13th, 2025</span></Text>
          </div>

          {/* header */}
          <div className='flex flex-col gap-[10px]'>
            <Text>Welcome to Lingo Foundry!</Text>
            <Text>These Terms and Conditions constitute an agreement between You and PT Edukasi Transformasi Nusantara (&ldquo;We&rdquo;, &ldquo;Us&rdquo;, &ldquo;Our&rdquo;, or &ldquo;Lingo Foundry&rdquo;) and govern Your access to and use of the Website and/or Lingo Foundry&apos;s Services. You are required to read, understand, and agree to these Terms and Conditions before accessing this Website and/or using any Services provided by Lingo Foundry.</Text>
            <Text>By agreeing to these Terms and Conditions, You also agree to any additional Terms and Conditions applicable to the specific Services We provide. In the event of any discrepancy, such additional Terms and Conditions shall prevail.</Text>
            <Text>By continuing to access Our Website or use Our Services, You acknowledge and guarantee that You have read, understood, and agreed to these Terms and Conditions. For Users with a disability or under the age of 18, Your parent(s) and/or legal guardian(s) are obligated to acknowledge and guarantee that they have read, understood, and agreed to these Terms and Conditions.</Text>
            <Text>If You do not agree to any part or all of these Terms and Conditions, We strongly advise You to immediately discontinue Your access to the Website and/or the Services We provide. Lingo Foundry reserves the right to limit, suspend, or terminate Your access to the Services if you violate these Terms and Conditions.</Text>
          </div>

          {/* I. DEFINITION */}
          <Section title="I. Definition">
            <Text>Below are the definitions of terms used in these Terms and Conditions:</Text>
            <DefinitionTable items={[
              { term: "Courses", definition: "a virtual space where the Student and the Tutor meet to conduct online learning activities through third-party services integrated into this Website." },
              { term: "Content", definition: "all information, data, text, images, videos, audios, graphics, designs, software, logos, icons, and/or other materials available or displayed on the Website." },
              { term: "Copyrights and Marks Law", definition: "all prevailing laws and regulations within the territory of the Republic of Indonesia, including any amendments, derivative rules, or implementing provisions that may change from time to time, governing intellectual property rights. This includes, but is not limited to, Law No. 28 of 2014 concerning Copyright and Law No. 20 of 2016 concerning Marks and Geographical Indications." },
              { term: "Data Protection Law", definition: "the prevailing legislation within the territory of the Republic of Indonesia, including all amendments, derivative regulations, and implementing provisions that may change from time to time, governing the protection of Personal Data. This includes, but is not limited to: Law Number 27 of 2022 concerning Personal Data Protection and all related amendments, derivative, and implementing regulations." },
              { term: "Personal Data", definition: "data about an individual, whether identified and/or can be identified individually or in combination with other information, either directly or indirectly, through electronic and/or non-electronic systems, which can be used to identify the individual directly or indirectly in accordance with Data Protection Law." },
              { term: "Privacy Policy", definition: "the privacy policy for the usage of Lingo Foundry services on Our Website." },
              { term: "Service Provider", definition: "any third-party individual, company, or entity that offers, operates, supports, or enables any part of the Services, functionalities, or features made available through the Website, whether directly or indirectly. This includes, but is not limited to, providers of third-party content, promotional offers, payment processing services, communication tools, virtual class technology, or other integrations and solutions accessible via the Website." },
              { term: "Services", definition: "the services provided by Lingo Foundry through the Website, which primarily facilitate connections between Students and their selected Tutors for language learning activities, and may include other learning-related or support features made available by Lingo Foundry from time to time." },
              { term: "Student", definition: "an individual who registers on the Website to seek and receive tutoring services from the Tutor through the Website." },
              { term: "Tutor", definition: "an individual registered on the Website who provides educational services or guidance to Students through the Website and holds the necessary qualifications." },
              { term: "Tutor Page", definition: "the section on the Website that displays all Tutors registered with Lingo Foundry. It contains information regarding each Tutor\u2019s availability, the languages they are proficient in, and other relevant teaching details." },
              { term: "User", definition: "any person who visits, accesses, or uses Lingo Foundry\u2019s Website, including but not limited to as Students and/or Tutors. Also referred to as \u201CYou\u201D." },
              { term: "User Account", definition: "the account You create by registering on the Lingo Foundry\u2019s Website to access and use Our services." },
              { term: "Website", definition: <>the site <LinkText href="https://lingofoundry.com">https://lingofoundry.com/</LinkText>, owned by Lingo Foundry, including all its domains and sub-domains (if any), which serves as a platform for providing Services to the User.</> },
            ]}/>
          </Section>

          {/* II. CONDITION OF USING SERVICES */}
          <Section title="II. Condition of Using Services">
            <Text>As a condition for using Our Services, You hereby represent and warrant that the following statements are true, accurate, and not misleading at the time You access this Website, and further warrant and agree as follows:</Text>
            <NumberedList items={[
              <>You have read, understood, and agreed to these Terms and Conditions, the <LinkText href="/privacy-policy">Privacy Policy</LinkText>, and any other applicable disclaimers stated on this Website, as may be changed or updated from time to time;</>,
              "You must be at least 18 (eighteen) years old to create a User Account and fully use the Services. If you are under 18 (eighteen) years old, You may access the Website and Use the Services only under the supervision of, and with the consent of, Your parent or legal guardian. The parent or legal guardian shall be fully responsible for all activities carried out by Users under 18 (eighteen) years old;",
              "You are solely responsible for maintaining the confidentiality of Your User Account information, including but not limited to Your User Account ID and password. All activities that occur under Your User Account are Your sole responsibility;",
              "You are the owner of the Personal Data and/or a party who has obtained consent from the owner of Personal Data to provide such data for the purpose of accessing this Website, creating a User Account on this Website, and using the Services of Lingo Foundry on this Website;",
              "all Personal Data and other information You provide to Us must be true, accurate, complete, not misleading, and up to date;",
              "You must immediately notify Lingo Foundry of any unauthorized use of Your User Account and/or other security breaches; and",
              "to use the Services only for lawful purposes and in accordance with these Terms and Conditions, and the applicable laws and regulations of the Republic of Indonesia.",
            ]}/>
          </Section>

          {/* III. LIMITATIONS OF SERVICES USAGE */}
          <Section title="III. Limitations of Services Usage">
            <Text>By using the Services of Lingo Foundry, You agree not to:</Text>
            <NumberedList items={[
              "use the Services from the Website for any purpose that is unlawful or in violation of any applicable laws and regulations;",
              "download, copy, distribute, reproduce, broadcast, or otherwise exploit any Content from the Website for commercial purposes without the prior written consent of Lingo Foundry;",
              "share, transfer, sell, or assign Your Account to any other party;",
              "take actions that may interfere with, damage, overload, or impair the performance of the Website or the servers used by the Website;",
              "upload or transmit material that contains viruses, trojan horses, worms, or other harmful code that may damage or interfere with the operation of the Website or User Personal Data;",
              "not to share Your User Account with any other individual under any circumstances;",
              "attempt to gain unauthorized access to other User Account, computer systems, or networks connected to the Website;",
              "not to enable or rely on \u201Cremember me\u201D features or other automatic login mechanisms when accessing Your account or using the Services, particularly on shared or public devices;",
              "engage in spamming, phishing, or any form of unauthorized or unsolicited communication directed to other User; and",
              "infringe upon the intellectual property rights of others, including but not limited to copyrights, trademarks, patents, or trade secrets; and",
              "not to disclose or use any information obtained through the Platform for purposes other than accessing or using the Services as intended.",
            ]}/>
          </Section>

          {/* IV. STUDENT – SPECIFIC TERMS AND CONDITIONS */}
          <Section title="IV. Student &ndash; Specific Terms and Conditions">
            <NumberedList items={[
              "Student who has created a User Account as a Student may use it to access the Services provided by Lingo Foundry. Student may browse the Tutor Page to view a list of available Tutor, review their language expertise, and availability that best fits Student\u2019s learning needs.",
              "Once a Tutor is selected, Student can add Courses into the shopping cart and continue with the payment process as set out in these Terms and Conditions.",
              "Student is required to maintain respectful language, behaviour, proper ethics, and courtesy at all times during learning sessions with the Tutor through the Courses and/or throughout Your access to and use of this Website.",
              "Student and their parent or legal guardian, understand and agree that the Tutors provided through the Services are independent third parties and are not Lingo Foundry employees, agents, or representatives. For the avoidance of doubt, Lingo Foundry does not provide, nor does it act as a provider of, instructional materials or any other educational services to User.",
            ]}/>
          </Section>

          {/* V. TUTOR – SPECIFIC TERMS AND CONDITIONS */}
          <Section title="V. Tutor &ndash; Specific Terms and Conditions">
            <NumberedList items={[
              "After creating a User Account, You must first register as a Tutor by providing additional required information, including but not limited to uploading a profile picture and bank account details to be used for receiving payments. Tutors may also upload their CV and teaching certificates as supporting documents; however, this is optional.",
              "Lingo Foundry will conduct a review of each User\u2019s Tutor application. Lingo Foundry reserves full discretion and authority over the evaluation process and the final decision regarding the approval or rejection of any Tutor registration application.",
              "Tutor must enter the designated online Courses room on time to start the scheduled Courses.",
              "Active Tutors will be listed on a \u2018Tutor Wall\u2019 for each subject. Each Tutor\u2019s position on the wall (\u201CRanking\u201D) is determined by a dynamic system that evaluates comprehensive performance data from all Tutors.",
              "Tutors will receive greater exposure and appear higher on the Tutor Wall if our system detects an improvement in their overall performance. Performance can be improved by adding more teaching time slots, increasing the number of courses offered, and conducting more teaching lessons.",
              "Tutors will receive payment for the Courses they have conducted, in accordance with these Terms and Conditions and/or other arrangements mutually agreed upon by the Tutor and Us.",
              "Tutor is required to maintain respectful language, professional behaviour, and ethical conduct at all times while delivering lessons through the Lingo Foundry platform and/or throughout Your access to and use of this Website. Tutor must communicate with Student in a courteous and professional manner, and refrain from any language or behaviour that may be considered offensive, discriminatory, or inappropriate.",
              "If a Student reports any misconduct or inappropriate behaviour by the Tutor, including but not limited to arriving late to Courses, skipping Courses, leaving the Courses early, Lingo Foundry reserves the right to terminate all cooperation with the Tutor, should Lingo Foundry deem such action necessary.",
              "If Lingo Foundry discovers that the Tutor has engaged in any act or conduct, including but not limited to, misrepresentation or fraudulent activity that may harm or has harmed the brand or reputation of Lingo Foundry, Lingo Foundry reserves the right to pursue appropriate legal action.",
              "Tutors are strictly prohibited from conducting Courses with Student outside the Website and platform provided by Lingo Foundry. If Lingo Foundry discovers that a Tutor has attempted to teach a Student outside the Website, Lingo Foundry reserves the right to pursue appropriate legal action.",
              "Tutors agree to cooperate with and support marketing and promotional activities organized by Lingo Foundry, as needed, for the purpose of enhancing the Tutor\u2019s earning potential.",
              "All teaching materials and content provided by the Tutor must be accurate, relevant, and appropriate for the intended learning objectives. Materials must not contain any content that is offensive, unlawful, or in violation of any applicable laws and regulations.",
              "Lingo Foundry reserves the right to investigate and take appropriate action, including suspension or termination of the Tutor\u2019s account, in the event of any breach of these Terms and Conditions.",
            ]}/>
          </Section>

          {/* VI. LIMITATION OF LINGO FOUNDRY'S LIABILITY */}
          <Section title="VI. Limitation of Lingo Foundry&apos;s Liability">
            <NumberedList items={[
              "Lingo Foundry makes no representations or warranties regarding its reliability, timeliness, quality, suitability, availability, accuracy, completeness, or security. We do not guarantee that the Website or its features will meet Your expectations or requirements. This includes, but is not limited to, Services and the performance of Service Providers.",
              "We are not liable for any losses or damages arising from any failure or error by the Service Providers or by You in complying with applicable terms and conditions.",
              "The Website may be subject to limitations, delays, and other issues inherent in the use of the internet and electronic communications, including but not limited to issues with Your device or third-party systems being offline, malfunctioning, or out of range. We shall not be held responsible for any delays, delivery failures, damages, or losses resulting from such issues.",
              "We are not obligated to monitor Your access to or use of the Website. However, we may do so to ensure smooth operation and compliance with these Terms and Conditions, applicable laws, court orders, or administrative regulations.",
              "We are not responsible for resolving disputes between You and any third-party provider. While We may, at our discretion, facilitate such resolutions, any facilitation does not constitute mediation and imposes no further obligation on Lingo Foundry.",
              "Lingo Foundry is not responsible for any losses arising from information or services provided by a Tutor beyond the scope defined in these Terms and Conditions.",
            ]}/>
          </Section>

          {/* VII. PAYMENT */}
          <Section title="VII. Payment">
            <div className='flex flex-col gap-[10px]'>
              <Text><span className="font-bold">1. Payment for Services (Applicable to Student):</span></Text>
              <Text>To access the Services, You agree to pay the applicable fees as stipulated on the Website. Details regarding pricing and available payment methods will be provided at the time of purchase. During the payment process, You will be redirected to the website of our authorized payment partner to complete the transaction.</Text>
              <Text>All payments made are final and non-refundable, unless expressly stated otherwise in a specific refund policy applicable to the relevant Service.</Text>
              <Text>The Company reserves the right to modify the pricing of its Services at any time, with prior notice provided through the Website or via email.</Text>
            </div>
            <div className='flex flex-col gap-[10px]'>
              <Text><span className="font-bold">2. Payment for Services Rendered (Applicable to Tutor):</span></Text>
              <Text>Lingo Foundry shall remit salary payment to the Tutor in accordance with the number of Students who have selected the Tutor and actively participated in learning sessions that were successfully conducted by the Tutor.</Text>
              <Text>Tutor can request a salary withdrawal through Our Website before the 30th of each month, and the salary will be paid to the Tutor between the 5th and 10th of the following month to the bank account provided during the initial Tutor registration.</Text>
              <Text>If Tutor wishes to change the designated bank account for salary payment, they must notify Lingo Foundry in advance prior to the effective date of the change. The Tutor shall bear full responsibility for any failure to provide such notification, and Lingo Foundry shall not be held liable for any resulting payment delays.</Text>
            </div>
          </Section>

          {/* VIII. LINKS TO THIRD-PARTY WEBSITES */}
          <Section title="VIII. Links to Third-Party Websites">
            <Text>If Our Website contains links or provides access to websites or platforms operated by third parties, such links and access are provided for the purpose of delivering Services to You, including but not limited to the provision of meeting rooms in connection with teaching services, as well as the facilitation of payment processing.</Text>
            <Text>Lingo Foundry exercises no control over the content of such third-party websites or Websites and disclaims any responsibility or liability for the content, accuracy, or any part thereof. Your access to or use of any third-party websites or resources is subject to the terms and conditions and privacy policies established by the respective third parties, which We strongly recommend You review before engaging with or disclosing any personal information through those platforms.</Text>
          </Section>

          {/* IX. VIOLATION OF TERMS AND CONDITIONS */}
          <Section title="IX. Violation of Terms and Conditions">
            <Text>Without prejudice to any other rights of Lingo Foundry under these Terms and Conditions, in the event that You violate or disregard these Terms and Conditions, Lingo Foundry may take any actions it deems necessary to address such violation or disregard, without any obligation to provide prior or subsequent notice to You. Such actions may include, but are not limited to: (i) suspending Your access to the Website and/or Services, (ii) prohibiting You from accessing the Website and/or Services, (iii) disabling or closing Your User Account, (iv) blocking computers using Your IP address from accessing the Website, (v) contacting Your internet service provider to request the blocking of Your access to the Website, and/or (vi) pursuing legal remedies, including but not limited to initiating court proceedings against You.</Text>
            <Text>You agree to indemnify and hold harmless Lingo Foundry from and against all claims, liabilities, costs, expenses, fines, fees, damages, judgments, and/or losses incurred or suffered by Lingo Foundry, including loss of profits and opportunities, arising out of or in connection with:</Text>
            <NumberedList items={[
              "Your breach of these Terms and Conditions, the Privacy Policy, or any other policies or disclaimers that may be posted on the Website from time to time;",
              "Your breach of any representations, warranties, or undertakings as set out above;",
              "acts of third parties using Your User Account that cause harm to Lingo Foundry and/or any other parties; and/or",
              "Your negligence that results in losses to any third parties.",
            ]}/>
          </Section>

          {/* X. PRIVACY POLICY */}
          <Section title="X. Privacy Policy">
            <Text>Your privacy and Personal Data matter to Us and We are fully committed to safeguarding and protecting Your Personal Data and information. The collection, use, storage, processing, and deletion of Your Personal Data are governed by Our <LinkText href="/privacy-policy">Privacy Policy</LinkText>, which is accessible via the Privacy Policy link.</Text>
          </Section>

          {/* XI. INTELLECTUAL PROPERTY RIGHTS */}
          <Section title="XI. Intellectual Property Rights">
            <Text>All Content available on the Website is the copyright and/or intellectual property of Lingo Foundry or its licensors.</Text>
            <Text>All intellectual property rights, ownership rights, and interest in or related to the development of technology by Lingo Foundry are the sole property of Lingo Foundry, without prejudice to any intellectual property rights, ownership rights, or interests held by third parties.</Text>
            <Text>User is subject to all intellectual property rights, ownership rights, and interests in or to any content created by Lingo Foundry, including but not limited to reports, documentation, records, and user guides, which are and shall remain the exclusive property of Lingo Foundry.</Text>
            <Text>Violation of Lingo Foundry&apos;s intellectual property rights may be subject to sanctions in accordance with Copyrights and Marks Law.</Text>
          </Section>

          {/* XII. SEVERABILITY */}
          <Section title="XII. Severability">
            <Text>If any provision of these Terms and Conditions is held to be invalid, void, or unenforceable under applicable law, such provision shall be deemed severable from these Terms and Conditions and shall not affect the validity, legality, or enforceability of the remaining Terms and Conditions.</Text>
          </Section>

          {/* XIII. FORCE MAJEURE */}
          <Section title="XIII. Force Majeure">
            <Text>Our Services may be disrupted by events beyond Our control or authority (&ldquo;Force Majeure&rdquo;), including but not limited to natural disasters (such as earthquakes, tsunamis, volcanic eruptions, floods, droughts, and landslides), outbreaks of disease, fires, industrial disputes, mass strikes, civil war, rebellion, coups, acts of war with other nations, terrorism, and/or failures of networks and/or computer systems caused by power outages or other circumstances beyond Our reasonable control.</Text>
            <Text>You agree to release and hold Us harmless from any claims or liabilities arising from Our inability to provide the Services, whether in whole or in part, including the execution of any instructions You submit through the Website, due to a Force Majeure event.</Text>
          </Section>

          {/* XIV. GOVERNING LAW AND DISPUTE RESOLUTION */}
          <Section title="XIV. Governing Law and Dispute Resolution">
            <Text>These Terms and Conditions are governed by and shall be construed in accordance with the laws of the Republic of Indonesia.</Text>
            <Text>Any disputes arising from or in connection with these Terms and Conditions shall be resolved amicably through deliberation to reach a consensus. If no consensus is reached, the dispute shall be settled in accordance with the applicable laws and regulations.</Text>
          </Section>

          {/* XV. CHANGES AND UPDATES TO THE TERMS AND CONDITIONS */}
          <Section title="XV. Changes and Updates to the Terms and Conditions">
            <Text>Lingo Foundry reserves the right, at its sole discretion, to modify, amend, or update these Terms and Conditions at any time, without prior notice, in order to reflect changes in legal requirements, business practices, or the features of the Website.</Text>
            <Text>Lingo Foundry may notify you of any changes or updates to these Terms and Conditions. By continuing to use all or part of the Website&apos;s features after such changes are made, you acknowledge and agree to the updated Terms and Conditions and agree to be bound by their terms as they evolve over time.</Text>
            <Text>Changes or updates to these Terms and Conditions will be posted on this page with a revised effective date, which can be found at the top of this page.</Text>
          </Section>

          {/* XVI. CONTACT US */}
          <Section title="XVI. Contact Us">
            <Text>If You have any questions, comments, or concerns, or inquiries regarding these Terms and Conditions, You may contact the Lingo Foundry team via email at <LinkText href="mailto:admin@lingofoundry.com">admin@lingofoundry.com</LinkText>, available Monday to Friday, from 9:00 AM to 18:00 PM.</Text>
          </Section>
        </div>
      </div>
  );
};
