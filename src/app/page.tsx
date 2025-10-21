"use client";

import withSession from "@/hoc/withSession";
import { ReactElement } from "react";

function Home(): ReactElement {
    return <main></main>;
}

export default withSession(Home);
