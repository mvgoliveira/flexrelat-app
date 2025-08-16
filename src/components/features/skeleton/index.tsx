import { Theme } from "@/themes";
import React, { ReactElement } from "react";
import ReactLoadingSkeleton from "react-loading-skeleton";

interface ISkeletonProps {
    width: number | string;
    height: number | string;
    color?: keyof typeof Theme.colors;
    borderRadius?: number;
}

const Skeleton = ({
    width,
    height,
    color = "gray80",
    borderRadius = 4,
}: ISkeletonProps): ReactElement => (
    <ReactLoadingSkeleton
        height={height}
        width={width}
        baseColor={Theme.colors[color]}
        borderRadius={borderRadius}
    />
);

export { Skeleton };
