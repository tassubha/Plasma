type Info = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    dateOfBirth: string,
    district: number,
    bloodGroup: number
}

const districts: string[] = [
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

const bloodGroups: string[] = [
    "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
];

function getUserInfo(form: FormData): Info {
    return {
        firstName: form.get("firstName"),
        lastName: form.get("lastName"),
        phoneNumber: form.get("phoneNumber"),
        email: form.get("email"),
        dateOfBirth: `${form.get("year")}-${form.get("month")}-${form.get("day")}`,
        district: districts.indexOf(form.get("district") as string),
        bloodGroup: bloodGroups.indexOf(form.get("bloodGroup") as string),
    } as Info;
}

export type {
    Info,
};

export {
    districts,
    bloodGroups,
    getUserInfo,
};
