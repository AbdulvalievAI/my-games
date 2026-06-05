import type { IAnyObject } from "./common.interfaces";

export interface IYdxDiskDownRes {
    method: string;
    href: string;
    templated: boolean;
}

export interface IYdxDiskUpRes {
    method: string;
    href: string;
    templated: boolean;
    operation_id: string;
}

export interface IYdxUserInfo {
    total_space: number;
    used_space: number;
    trash_size: number;
    max_file_size: number;
    paid_max_file_size: number;
    photounlim_size: number;
    system_folders: IAnyObject;
    is_paid: boolean;
    revision: number;
    user: {
        uid: string;
        login: string;
        display_name: string;
        country: string;
        is_child: boolean;
        reg_time: string;
    },
    unlimited_autoupload_enabled: boolean;
    reg_time: string;
    is_idm_managed_public_access: boolean;
    is_idm_managed_folder_address_access: boolean;
    is_sync_shared_folder_desktop: boolean;
    is_sync_vd_desktop: boolean;
    payment_flow: boolean;
    hide_screenshots_in_photoslice: boolean;
    is_legal_entity: boolean;
    monthly_traffic_limit: number
    monthly_traffic_limit_upgrades: {
        pro: number;
    };
    file_size_limit_upgrades: {
        paid: number;
        pro: number;
    }
}

export interface IYdxFolderInfo {
    path: string
    type: "dir",
    name: string;
    created: string
    modified: string
    _embedded: {
        path: string
        limit: number;
        offset: number;
        sort: string;
        total: number;
        items: {
            path: string;
            type: string;
            name: string;
            created: string;
            modified: string;
            size: number;
            mime_type: string;
            md5: string;
            sha256: string;
            media_type: string;
            resource_id: string;
            revision: number;
            comment_ids: {
                public_resource: string;
                private_resource: string;
            },
            antivirus_status: string;
            file: string;
        }[];
    },
    resource_id: string;
    revision: string;
    comment_ids: {
        public_resource: string;
        private_resource: string;
    }
}

export interface IYdxErrorRes {
    status: number,
    statusText: string;
    url: string;
    ok: false,
    name: string;
    message: string;
    error: {
        error: string;
        description: string;
        message: string;
    }
}
