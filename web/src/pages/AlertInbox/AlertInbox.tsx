import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import AlertList from "./AlertList";
import AlertDetail from "./AlertDetail";
import { useState } from "react";
import { getCurrentUser } from "@cbr/common/util/hooks/currentUser";
import { APILoadError } from "@cbr/common/util/endpoints";
import { IUser } from "@cbr/common/util/users";
import { apiFetch, Endpoint } from "@cbr/common/util/endpoints";
import { IAlert } from "@cbr/common/util/alerts";

const AlertInbox = () => {
    const [selectedAlert, setSelectedAlert] = useState<number>(-1);
    const [userID, setUserID] = useState<string>("unknown");
    const [alertData, setAlertData] = useState<IAlert[]>([]);

    const alertListProps = {
        onAlertSelectionEvent: (itemNum: number) => {
            setSelectedAlert(itemNum);
        },
        selectAlert: selectedAlert,
        userID: userID,
        alertData: alertData,
        onAlertSetEvent: (alertData: IAlert[]) => {
            setAlertData(alertData);
        },
    };

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                setAlertData(await (await apiFetch(Endpoint.ALERTS)).json());
            } catch (e) {
                console.log(`Error fetching Alerts: ${e}`);
            }
        };
        fetchAlerts();
    }, []);

    useEffect(() => {
        const getUserProfile = async () => {
            let user: IUser | typeof APILoadError = await getCurrentUser();
            if (user !== APILoadError) {
                setUserID(user.id);
            }
        };
        getUserProfile();
    }, []);

    const refreshAlert = async () => {
        try {
            setAlertData(await (await apiFetch(Endpoint.ALERTS)).json());
        } catch (e) {
            console.log(`Error fetching Alerts: ${e}`);
        }
    };

    const alertDetailProps = {
        selectAlert: selectedAlert,
        userID: userID,
        alertData: alertData,
        refreshAlert: refreshAlert,
    };

    return (
        <Grid container justify="center" alignItems="stretch" spacing={3}>
            <AlertList {...alertListProps} />
            <AlertDetail {...alertDetailProps} />
            {/* TODO: 
              API call should be placed in this component, need to check how to pass those as props
            */}
            {/* <AlertList alertListProps={alertListProps} alertData={alertData} />
            <AlertDetail alertDetailProps={alertDetailProps} alertData={alertData} /> */}
        </Grid>
    );
};

export default AlertInbox;
