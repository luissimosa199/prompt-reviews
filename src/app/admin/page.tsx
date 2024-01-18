import { useQuery } from "@tanstack/react-query";
import GlobalInfoTable from "@/components/AdminPanelGlobalInfoTable";
import TenUsersInfoTable from "@/components/AdminPanelTenUsersInfoTable";
import { fetchUserAgentData } from "@/utils/adminPanelHelpers";
import UTMAnalyticsTable from "@/components/AdminPanelUTMAnalitycsTable";
import { UserAgent } from "@/utils/adminPanelHelpers";
import VisitsTable from "@/components/AdminPanelVisitsTable";
import { useSession } from "next-auth/react";
import { CustomSession } from "../api/auth/[...nextauth]/route";
import { useRouter } from "next/navigation";

const Admin = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user_agent_data"],
    queryFn: fetchUserAgentData,
  });

  if (!session || (session as CustomSession)?.role !== "ADMIN") {
    router.push("/login");
  }

  const name = session?.user?.name;
  const email = session?.user?.email;

  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error. {JSON.stringify(error)}</p>;
  }

  const allVisits = data.userAgentData.flatMap(
    (item: UserAgent) => item.visits
  );

  // Your component logic remains here
  return (
    <div>
      <p className="mb-6 p-4">
        Logueado como {name} ({email})
      </p>

      <div className="mb-12">
        <GlobalInfoTable
          data={data.userAgentData}
          users={data.users}
        />
      </div>

      <div className="mb-12">
        <TenUsersInfoTable
          data={data.userAgentData}
          users={data.users}
        />
      </div>

      <div className="mb-12">
        <UTMAnalyticsTable data={data.userAgentData} />
      </div>

      <div className="mb-12">
        <VisitsTable visits={allVisits} />
      </div>
    </div>
  );
};

export default Admin;
