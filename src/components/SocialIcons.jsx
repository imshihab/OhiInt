import {
    FaGithub,
    FaFacebook,
    FaLinkedin,
    FaInstagram,
    FaYoutube,
    FaDiscord,
    FaTwitter,
    FaXTwitter,
    FaTiktok,
    FaReddit,
    FaTelegram,
    FaWhatsapp,
    FaPinterest,
    FaDribbble,
    FaBehance,
    FaMedium,
    FaDev,
    FaStackOverflow,
    FaCodepen,
    FaFigma,
    FaTwitch,
} from "react-icons/fa6";

const icons = {
    github: FaGithub,
    facebook: FaFacebook,
    linkedin: FaLinkedin,
    instagram: FaInstagram,
    youtube: FaYoutube,
    discord: FaDiscord,
    twitter: FaTwitter,
    x: FaXTwitter,
    tiktok: FaTiktok,
    reddit: FaReddit,
    telegram: FaTelegram,
    whatsapp: FaWhatsapp,
    pinterest: FaPinterest,
    dribbble: FaDribbble,
    behance: FaBehance,
    medium: FaMedium,
    dev: FaDev,
    stackoverflow: FaStackOverflow,
    codepen: FaCodepen,
    figma: FaFigma,
    twitch: FaTwitch,
};

export default function SocialIcon({
    name,
    size = 24,
    className = "",
}) {
    const Icon = icons[name.toLowerCase()];

    if (!Icon) return null;

    return <Icon size={size} className={className} />;
}