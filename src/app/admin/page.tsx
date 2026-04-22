import { auth } from "@/auth";
import { maintenanceEnabled } from "@/db";
import AdminSettings from "@/components/AdminSettings";
import { NotAuthorizedCard } from "@/components/common/error/ErrorHandler";

export default async function AdminPage() {
    const session = await auth();
    const admin = session?.user?.admin;

    if (!admin) {
        return <NotAuthorizedCard />;
    }

    const maintenance = await maintenanceEnabled();

    return <AdminSettings maintenance={maintenance} />;
}
