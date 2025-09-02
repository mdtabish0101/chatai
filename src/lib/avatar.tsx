import { createAvatar } from "@dicebear/core";
import { bottts, initials } from "@dicebear/collection";


interface Props{
    seed: string;
    variant: "bottts" | "initials";
};


export const generateAvatarUri = ({ seed, variant }: Props) => {
    let avatar;
    if(variant === "bottts"){
        avatar = createAvatar(bottts, { seed });
    } else {
        avatar = createAvatar(initials, { seed, fontWeight: 500, fontSize: 42});
    }

    return avatar.toDataUri();
};