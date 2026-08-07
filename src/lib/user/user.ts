type UserInfo = {
    id: string,
    username: string,
    age: number,
    district: number,
}

const UserDistricts: string[] = [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria",
    "Chandpur", "Chapai Nawabganj", "Chittagong", "Chuadanga", "Cox's Bazar", "Cumilla",
    "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj",
    "Habiganj", "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", "Joypurhat",
    "Khagrachhari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur",
    "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar",
    "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore",
    "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali",
    "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur",
    "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];

const UserBloodGroups: string[] = [
    "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
];

function UserGetInfo(form: FormData): UserInfo {
    return {
        username: form.get("username"),
        age: Number(form.get("age")),
        district: UserDistricts.indexOf(form.get("district") as string),
    } as UserInfo;
}

export type {
    UserInfo,
};

export {
    UserDistricts,
    UserBloodGroups,
    UserGetInfo,
};
