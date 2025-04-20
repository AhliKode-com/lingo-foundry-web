import TutorNavbar from "@/components/organisms/dashboard/tutor-navbar";

export default function RootLayout({ children }) {

  return (
        <div>
          <TutorNavbar/>
          {children}
        </div>
  );
}
