interface Props {
    seed: string;
    variant: "bottts" | "initials";
};

export const generateAvatarUri = ({ seed, variant }: Props) => {
    const collection = variant === "bottts" ? "bottts" : "initials";
    const url = `https://api.dicebear.com/8.x/${collection}/svg?seed=${seed}`;
    if (variant === "initials") {
        return `${url}&fontWeight=500&fontSize=42`;
    }
    return url;
};