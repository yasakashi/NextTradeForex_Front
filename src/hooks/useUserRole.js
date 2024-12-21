import { useMemo, useState } from "react";

const useUserRole = (userTypeId) => {
  const [role, setRole] = useState("");

  useMemo(() => {
    switch (userTypeId) {
      case 1:
        setRole("Super Admin");
        break;
      case 2:
        setRole("Admin");
        break;
      case 3:
        setRole("Instructor");
        break;
      case 4:
        setRole("Student");
        break;
      case 5:
        setRole("Guest");
        break;
      default:
        setRole("UnKnown");
        break;
    }
  }, [userTypeId]);

  return role;
};

export default useUserRole;
