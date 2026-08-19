
import { TasksProvider } from "@/contexts/TasksContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContect";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <UserProvider>
          <TasksProvider>{children}</TasksProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}