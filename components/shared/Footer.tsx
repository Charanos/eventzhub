"use react";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="border-t">
            <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
                <Link href="/">
                    <Image
                        alt="logo"
                        width={128}
                        height={38}
                        src="/assets/images/logo.svg"
                    />
                </Link>

                <p className="uppercase font-semibold text-muted-foreground text-sm">
                    &copy;EventzHub by wormwood. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
