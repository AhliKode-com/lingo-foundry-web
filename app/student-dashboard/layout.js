import StudentNavbar from "@/components/organisms/dashboard/student-navbar";

export default function RootLayout({ children }) {

  return (
        <div>
          <StudentNavbar/>
          {children}
        </div>
  );
}
