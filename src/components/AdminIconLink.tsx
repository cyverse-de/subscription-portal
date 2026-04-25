"use client";

import Link from "next/link";
import { IconButton, Tooltip } from "@mui/material";
import AdminIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

const AdminIconLink = () => {
    return (
        <Tooltip title="Admin Settings">
            <IconButton component={Link} href="/admin" color="inherit">
                <AdminIcon />
            </IconButton>
        </Tooltip>
    );
};
export default AdminIconLink;
