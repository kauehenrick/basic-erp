import { PiUserCircleFill } from "react-icons/pi";


type HeaderProps = {
    pageName: string,
}

export default function Header(props: HeaderProps) {
    return (
        <header className="flex items-center justify-between h-[60px] w-full border-b px-6">
            <p className="font-medium text-2xl">{props.pageName}</p>
            <div className="flex space-x-4">
                <PiUserCircleFill className="cursor-pointer" size={'25px'} />
            </div>
        </header>
    );
}