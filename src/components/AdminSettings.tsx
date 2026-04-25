"use client";

import { useRouter } from "next/navigation";

import { adminToggleMaintenanceMode } from "@/app/api/serviceFacade";
import withErrorAnnouncer, {
    WithErrorAnnouncerProps,
} from "@/components/common/error/withErrorAnnouncer";

import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Switch,
    Typography,
} from "@mui/material";
import AdminIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { useMutation } from "@tanstack/react-query";

const AdminSettings = ({
    showErrorAnnouncer,
    maintenance,
}: WithErrorAnnouncerProps & {
    maintenance: boolean;
}) => {
    const router = useRouter();

    const { mutate: toggleMaintenanceMode, isPending } = useMutation({
        mutationFn: adminToggleMaintenanceMode,
        onSuccess: () => {
            router.refresh();
        },
        onError: (error) => {
            showErrorAnnouncer(
                "There was an error toggling Maintenance Mode.",
                error,
            );
        },
    });

    return (
        <Card>
            <CardHeader
                avatar={<AdminIcon fontSize="large" />}
                title={
                    <Typography component="span" variant="h6">
                        Admin Settings
                    </Typography>
                }
            />
            <Divider />
            <CardContent>
                <FormControl>
                    <FormControlLabel
                        label={`${maintenance ? "Disable" : "Enable"} Maintenance`}
                        control={
                            <Switch
                                checked={maintenance}
                                disabled={isPending}
                                onChange={() => {
                                    toggleMaintenanceMode();
                                }}
                            />
                        }
                    />
                    <FormHelperText>
                        Turn Maintenance Mode {maintenance ? "off" : "on"}
                    </FormHelperText>
                </FormControl>
            </CardContent>
        </Card>
    );
};

export default withErrorAnnouncer(AdminSettings);
