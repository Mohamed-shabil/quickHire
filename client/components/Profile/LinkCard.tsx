import { LinkIcon } from "lucide-react";

const LinkCard = ({
    link,
}: {
    link: { title: string; url: string; content: string };
}) => {
    return (
        <div className="flex-1 space-y-1">
            <small className="text-foreground md:text-primary">
                {link.title}
            </small>
            <br />
            <a className="font-semibold flex" href={link.url}>
                {link.content}
                <LinkIcon className="ms-2 mt-1" size="1em" />
            </a>
        </div>
    );
}
 
export default LinkCard;