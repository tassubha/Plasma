import {
    UserBloodGroups,
    UserDistricts,
} from "./user/user";

type PostInfo = {
    userId: string,
    name: string,
    phoneNumber: number,
    district: number,
    bloodGroup: number,
    additionalMessage: string,
}

function PostGetInfo(form: FormData): PostInfo {
    return {
        name: form.get("name") as string,
        phoneNumber: Number(form.get("phoneNumber")),
        district: UserDistricts.indexOf(form.get("district") as string),
        bloodGroup: UserBloodGroups.indexOf(form.get("bloodGroup") as string),
        additionalMessage: form.get("additionalMessage") as string,
    } as PostInfo;
}

export type {
    PostInfo,
}

export {
    PostGetInfo,
}