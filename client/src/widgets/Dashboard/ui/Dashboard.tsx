import { FreeCourse } from "@/src/features/FreeCourse";
import { UserDashboard } from "@/src/features/UserDashboard";
import { User } from "@entities/user/model/types";
type DashBoardProps = {
  user: User | null;
};
export function Dashboard({ user }: DashBoardProps) {
  return user ? <UserDashboard /> : <FreeCourse />;
}
