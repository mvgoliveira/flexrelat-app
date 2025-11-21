import { Theme } from "@/themes";
import { ISVGsDynamicColorAndSize } from "@/types/core";
import React, { ReactElement } from "react";

export const IconFormatInkHighlighter = ({
    size = 25,
    color = "white",
}: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            height={size}
            fill={Theme.colors[color]}
        >
            <path d="M80 0v-160h800V0H80Zm504-480L480-584 320-424l103 104 161-160Zm-47-160 103 103 160-159-104-104-159 160Zm-84-29 216 216-189 190q-24 24-56.5 24T367-263l-27 23H140l126-125q-24-24-25-57.5t23-57.5l189-189Zm0 0 187-187q24-24 56.5-24t56.5 24l104 103q24 24 24 56.5T857-640L669-453 453-669Z" />
        </svg>
    );
};

export const IconElementTitle = ({ size = 24, color }: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 77 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="75.6667" height="23" rx="3.5" fill="white" />
            <rect x="0.5" y="0.5" width="75.6667" height="23" rx="3.5" stroke="#E0E0E0" />
            <path
                d="M18.0498 15.596V13.52H14.6538V15.944L15.3498 15.98V17H12.4458V16.028L12.8418 15.992C13.0738 15.968 13.1898 15.856 13.1898 15.656V10.076L12.5058 10.04V9.02H15.4098V9.992L15.0138 10.028C14.8858 10.044 14.7938 10.08 14.7378 10.136C14.6818 10.184 14.6538 10.28 14.6538 10.424V12.284H18.0498V10.076L17.3658 10.04V9.02H20.2698V9.992L19.8738 10.028C19.6418 10.052 19.5258 10.18 19.5258 10.412V15.944L20.2098 15.98V17H17.3058V16.028L17.7018 15.992C17.8218 15.976 17.9098 15.944 17.9658 15.896C18.0218 15.84 18.0498 15.74 18.0498 15.596Z"
                fill={Theme.colors[color || "gray40"]}
            />

            <rect
                x="24.8333"
                y="10"
                width="40"
                height="4"
                rx="2"
                fill={Theme.colors[color || "gray20"]}
            />
        </svg>
    );
};

export const IconElementText = ({ size = 24, color }: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 78 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.16669" y="0.5" width="75.6667" height="23" rx="3.5" fill="white" />
            <rect x="1.16669" y="0.5" width="75.6667" height="23" rx="3.5" stroke="#E0E0E0" />
            <path
                d="M16.2996 15.656V10.208H15.3636C15.1796 10.208 15.0876 10.332 15.0876 10.58V11.144L13.8636 11.06V9.02H20.1396V11.06L18.9156 11.144V10.58C18.9156 10.444 18.8956 10.348 18.8556 10.292C18.8156 10.236 18.7196 10.208 18.5676 10.208H17.7516V15.944L18.6996 15.98V17H15.3156V16.028L15.9516 15.992C16.1836 15.968 16.2996 15.856 16.2996 15.656Z"
                fill={Theme.colors[color || "gray40"]}
            />
            <rect
                x="24.5"
                y="7.5"
                width="40"
                height="4"
                rx="2"
                fill={Theme.colors[color || "gray20"]}
            />
            <rect
                x="24.5"
                y="12.5"
                width="40"
                height="4"
                rx="2"
                fill={Theme.colors[color ? "blue40" : "gray10"]}
            />
        </svg>
    );
};

export const IconElementCitation = ({
    size = 24,
    color,
}: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 77 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.833344" y="0.5" width="75.6667" height="23" rx="3.5" fill="white" />
            <rect x="0.833344" y="0.5" width="75.6667" height="23" rx="3.5" stroke="#E0E0E0" />
            <path
                d="M18.7221 15.104C18.2101 15.104 17.7941 14.92 17.4741 14.552C17.1701 14.168 17.0181 13.648 17.0181 12.992C17.0181 12.24 17.2501 11.512 17.7141 10.808C18.1781 10.104 18.9141 9.488 19.9221 8.96L20.3301 9.536C19.4661 10.048 18.8821 10.568 18.5781 11.096C18.2901 11.608 18.1461 12.168 18.1461 12.776L17.5941 13.784C17.5941 13.4 17.7141 13.088 17.9541 12.848C18.2101 12.592 18.5221 12.464 18.8901 12.464C19.2581 12.464 19.5621 12.584 19.8021 12.824C20.0581 13.064 20.1861 13.376 20.1861 13.76C20.1861 14.144 20.0501 14.464 19.7781 14.72C19.5061 14.976 19.1541 15.104 18.7221 15.104ZM14.6661 15.104C14.1541 15.104 13.7381 14.92 13.4181 14.552C13.1141 14.168 12.9621 13.648 12.9621 12.992C12.9621 12.24 13.1941 11.512 13.6581 10.808C14.1221 10.104 14.8581 9.488 15.8661 8.96L16.2741 9.536C15.4101 10.048 14.8261 10.568 14.5221 11.096C14.2341 11.608 14.0901 12.168 14.0901 12.776L13.5381 13.784C13.5381 13.4 13.6581 13.088 13.8981 12.848C14.1541 12.592 14.4661 12.464 14.8341 12.464C15.2021 12.464 15.5061 12.584 15.7461 12.824C16.0021 13.064 16.1301 13.376 16.1301 13.76C16.1301 14.144 15.9941 14.464 15.7221 14.72C15.4501 14.976 15.0981 15.104 14.6661 15.104Z"
                fill={Theme.colors[color || "gray40"]}
            />
            <rect
                x="25.6667"
                y="7.5"
                width="40"
                height="4"
                rx="2"
                fill={Theme.colors[color || "gray20"]}
            />
            <rect
                x="25.6667"
                y="12.5"
                width="40"
                height="4"
                rx="2"
                fill={Theme.colors[color ? "blue40" : "gray10"]}
            />
        </svg>
    );
};

export const IconElementSeparator = ({
    size = 50,
    color,
}: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 77 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="75.6667" height="49" rx="3.5" fill="white" />
            <rect x="0.5" y="0.5" width="75.6667" height="49" rx="3.5" stroke="#E0E0E0" />
            <rect
                x="5"
                y="5"
                width="66.6667"
                height="12"
                rx="5"
                fill="white"
                stroke={Theme.colors[color || "gray40"]}
                strokeDasharray="5 5"
            />
            <rect
                x="7.33331"
                y="24"
                width="62"
                height="2"
                rx="1"
                fill={Theme.colors[color || "gray40"]}
            />
            <rect
                x="5"
                y="33"
                width="66.6667"
                height="12"
                rx="5"
                fill="white"
                stroke={Theme.colors[color || "gray40"]}
                strokeDasharray="5 5"
            />
        </svg>
    );
};

export const IconElementGeometric = ({
    size = 50,
    color,
}: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 78 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.16669" y="0.5" width="75.6667" height="49" rx="3.5" fill="white" />
            <rect x="1.16669" y="0.5" width="75.6667" height="49" rx="3.5" stroke="#E0E0E0" />
            <rect
                x="24.6667"
                y="17"
                width="15"
                height="14"
                fill={Theme.colors[color || "gray10"]}
                stroke={Theme.colors[color || "gray40"]}
            />
            <path
                d="M49.7907 36.5H38.5427L44.1667 26.9824L49.7907 36.5Z"
                fill={Theme.colors[color || "gray10"]}
                stroke={Theme.colors[color || "gray40"]}
            />
            <rect
                x="41.6667"
                y="14"
                width="11"
                height="11"
                rx="5.5"
                fill={Theme.colors[color || "gray10"]}
                stroke={Theme.colors[color || "gray40"]}
            />
        </svg>
    );
};

export const IconElementImage = ({ size = 30, color }: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.666687" y="0.5" width="40" height="29" rx="3.5" fill="white" />
            <rect x="0.666687" y="0.5" width="40" height="29" rx="3.5" stroke="#E0E0E0" />
            <mask
                id="mask0_80_255"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="8"
                y="3"
                width="25"
                height="24"
            >
                <rect x="8.66669" y="3" width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_80_255)">
                <path
                    d="M9.66669 21L15.6667 13L20.1667 19H27.6667L22.6667 12.35L20.1667 15.65L18.9167 14L22.6667 9L31.6667 21H9.66669ZM13.6667 19H17.6667L15.6667 16.325L13.6667 19Z"
                    fill={Theme.colors[color || "gray40"]}
                />
            </g>
        </svg>
    );
};

export const IconElementTable = ({ size = 44, color }: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 61 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_80_170)">
                <rect width="60.6667" height="44" rx="4" fill="white" />
                <rect width="60.6667" height="8" fill={Theme.colors[color || "gray30"]} />
                <rect y="8" width="25" height="9" stroke="#E0E0E0" />
                <rect x="6" y="11" width="13" height="3" rx="1.5" fill="#E0E0E0" />
                <rect x="25" y="8" width="35.6667" height="9" stroke="#E0E0E0" />
                <rect x="30" y="11" width="25.6667" height="3" rx="1.5" fill="#F6F6F6" />
                <rect y="17" width="25" height="9" stroke="#E0E0E0" />
                <rect x="6" y="20" width="13" height="3" rx="1.5" fill="#E0E0E0" />
                <rect x="25" y="17" width="35.6667" height="9" stroke="#E0E0E0" />
                <rect x="30" y="20" width="25.6667" height="3" rx="1.5" fill="#F6F6F6" />
                <rect y="26" width="25" height="9" stroke="#E0E0E0" />
                <rect x="6" y="29" width="13" height="3" rx="1.5" fill="#E0E0E0" />
                <rect x="25" y="26" width="35.6667" height="9" stroke="#E0E0E0" />
                <rect x="30" y="29" width="25.6667" height="3" rx="1.5" fill="#F6F6F6" />
                <rect y="35" width="25" height="9" stroke="#E0E0E0" />
                <rect x="6" y="38" width="13" height="3" rx="1.5" fill="#E0E0E0" />
                <rect x="25" y="35" width="35.6667" height="9" stroke="#E0E0E0" />
                <rect x="30" y="38" width="25.6667" height="3" rx="1.5" fill="#F6F6F6" />
            </g>
            <rect
                x="0.5"
                y="0.5"
                width="59.6667"
                height="43"
                rx="3.5"
                stroke={Theme.colors[color || "gray30"]}
            />
            <defs>
                <clipPath id="clip0_80_170">
                    <rect width="60.6667" height="44" rx="4" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const IconElementCode = ({ size = 44, color }: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 62 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_80_195)">
                <rect x="0.666687" width="60.6667" height="44" rx="4" fill="white" />
                <path
                    d="M10.6667 3H11.1667V0H10.6667H10.1667V3H10.6667Z"
                    fill={Theme.colors[color || "gray30"]}
                />
                <path
                    d="M5.55643 7.06167V5.09667L4.97143 5.39667L4.75143 5.01167L5.66143 4.44667H6.15143V7.21667L6.67143 7.24167V7.66667H4.93143V7.25667L5.41143 7.22667C5.46143 7.22334 5.4981 7.21001 5.52143 7.18667C5.54477 7.16334 5.55643 7.12167 5.55643 7.06167Z"
                    fill={Theme.colors[color || "gray30"]}
                />
                <path
                    d="M10.6667 9.33333H11.1667V3H10.6667H10.1667V9.33333H10.6667Z"
                    fill={Theme.colors[color || "gray30"]}
                />
                <rect x="15.6667" y="4.66667" width="40.6667" height="3" rx="1.5" fill="#F6F6F6" />
                <path
                    d="M4.67995 14V13.615L5.67495 12.36C5.77828 12.2267 5.84662 12.1383 5.87995 12.095C5.91328 12.0483 5.94495 11.985 5.97495 11.905C6.00828 11.8217 6.02495 11.7233 6.02495 11.61C6.02495 11.4933 5.98495 11.3983 5.90495 11.325C5.82828 11.2517 5.72828 11.215 5.60495 11.215C5.48495 11.215 5.39328 11.225 5.32995 11.245C5.26995 11.265 5.23328 11.2883 5.21995 11.315C5.20995 11.3383 5.20495 11.3767 5.20495 11.43V11.785L4.69495 11.75V10.95C5.00828 10.7933 5.32995 10.715 5.65995 10.715C5.98995 10.715 6.23828 10.7967 6.40495 10.96C6.57162 11.12 6.65495 11.34 6.65495 11.62C6.65495 11.9 6.51328 12.2117 6.22995 12.555L5.42495 13.505H6.67495V14H4.67995Z"
                    fill={Theme.colors[color || "gray30"]}
                />
                <path
                    d="M10.6667 15.6667H11.1667V9.33333H10.6667H10.1667V15.6667H10.6667Z"
                    fill={Theme.colors[color || "gray30"]}
                />
                <rect x="15.6667" y="11" width="40.6667" height="3" rx="1.5" fill="#F6F6F6" />
                <path
                    d="M5.19553 18.4683H5.71053C5.91053 18.3417 6.01053 18.1633 6.01053 17.9333C6.01053 17.6767 5.86553 17.5483 5.57553 17.5483C5.46887 17.5483 5.37887 17.56 5.30553 17.5833C5.23553 17.6067 5.19387 17.6317 5.18053 17.6583C5.17053 17.6817 5.16553 17.72 5.16553 17.7733V18.1333L4.65553 18.0983V17.2983C4.98887 17.1317 5.31887 17.0483 5.64553 17.0483C5.9722 17.0483 6.21553 17.1233 6.37553 17.2733C6.53887 17.42 6.62053 17.6117 6.62053 17.8483C6.62053 18.0217 6.57887 18.18 6.49553 18.3233C6.4122 18.4633 6.3022 18.5767 6.16553 18.6633C6.5022 18.77 6.67053 19.0067 6.67053 19.3733C6.67053 19.68 6.57553 19.9283 6.38553 20.1183C6.19553 20.305 5.91387 20.3983 5.54053 20.3983C5.3572 20.3983 5.17387 20.3733 4.99053 20.3233C4.81053 20.2733 4.6672 20.215 4.56053 20.1483L4.73553 19.6733C4.99887 19.82 5.26053 19.8933 5.52053 19.8933C5.88387 19.8933 6.06553 19.7317 6.06553 19.4083C6.06553 19.2417 6.01053 19.12 5.90053 19.0433C5.79053 18.9633 5.60387 18.9233 5.34053 18.9233H5.15053L5.19553 18.4683Z"
                    fill={Theme.colors[color || "gray30"]}
                />
                <path
                    d="M10.6667 22H11.1667V15.6667H10.6667H10.1667V22H10.6667Z"
                    fill={Theme.colors[color || "gray30"]}
                />
                <rect x="15.6667" y="17.3333" width="40.6667" height="3" rx="1.5" fill="#F6F6F6" />
                <path
                    d="M6.06135 24.3567H6.41136V25.2917H6.85636V25.7667H6.40636V26.2167L6.82136 26.2417V26.6667H5.35136V26.2567L5.66136 26.2317C5.75802 26.225 5.80635 26.1783 5.80635 26.0917V25.7617H4.52635V25.3467L5.46636 23.3717L5.94136 23.6067L5.13635 25.2917H5.85136V25.0217L6.06135 24.3567Z"
                    fill={Theme.colors[color || "gray30"]}
                />
                <path
                    d="M10.6667 28.3333H11.1667V22H10.6667H10.1667V28.3333H10.6667Z"
                    fill={Theme.colors[color || "gray30"]}
                />
                <rect x="15.6667" y="23.6667" width="40.6667" height="3" rx="1.5" fill="#F6F6F6" />
                <path
                    d="M6.6096 30.255H5.4646L5.3646 31.02C5.73793 31.0467 6.04126 31.145 6.2746 31.315C6.51126 31.4817 6.6296 31.73 6.6296 32.06C6.6296 32.33 6.5396 32.5633 6.3596 32.76C6.1796 32.9567 5.8996 33.055 5.5196 33.055C5.33293 33.055 5.1496 33.03 4.9696 32.98C4.79293 32.93 4.65126 32.8717 4.5446 32.805L4.7446 32.345C5.0046 32.4883 5.2546 32.56 5.4946 32.56C5.8346 32.56 6.0046 32.3967 6.0046 32.07C6.0046 31.6633 5.60626 31.46 4.8096 31.46L5.0246 29.78H6.0196C6.09626 29.78 6.1346 29.7333 6.1346 29.64V29.425L6.6096 29.46V30.255Z"
                    fill={Theme.colors[color || "gray30"]}
                />
                <path
                    d="M10.6667 34.6667H11.1667V28.3333H10.6667H10.1667V34.6667H10.6667Z"
                    fill={Theme.colors[color || "gray30"]}
                />
                <rect x="15.6667" y="30" width="40.6667" height="3" rx="1.5" fill="#F6F6F6" />
                <path
                    d="M6.30624 35.9783L6.42124 36.4283C5.7079 36.5183 5.30957 36.8717 5.22624 37.4883C5.43624 37.3517 5.66957 37.2833 5.92624 37.2833C6.18624 37.2833 6.3929 37.37 6.54624 37.5433C6.69957 37.7167 6.77624 37.9633 6.77624 38.2833C6.77624 38.6 6.68124 38.8633 6.49124 39.0733C6.30457 39.2833 6.02957 39.3883 5.66624 39.3883C5.30624 39.3883 5.0379 39.2583 4.86124 38.9983C4.6879 38.7383 4.60124 38.39 4.60124 37.9533C4.60124 36.7633 5.16957 36.105 6.30624 35.9783ZM6.19124 38.2783C6.19124 37.8983 6.0429 37.7083 5.74624 37.7083C5.65957 37.7083 5.55957 37.7283 5.44624 37.7683C5.33624 37.8083 5.25124 37.8533 5.19124 37.9033C5.19124 37.9367 5.19124 37.97 5.19124 38.0033C5.19124 38.2667 5.22957 38.4867 5.30624 38.6633C5.3829 38.84 5.51624 38.9283 5.70624 38.9283C5.84957 38.9283 5.96624 38.8717 6.05624 38.7583C6.14624 38.6417 6.19124 38.4817 6.19124 38.2783Z"
                    fill={Theme.colors[color || "gray30"]}
                />
                <path
                    d="M10.6667 41H11.1667V34.6667H10.6667H10.1667V41H10.6667Z"
                    fill={Theme.colors[color || "gray30"]}
                />
                <rect x="15.6667" y="36.3333" width="40.6667" height="3" rx="1.5" fill="#F6F6F6" />
                <path
                    d="M10.6667 44H11.1667V41H10.6667H10.1667V44H10.6667Z"
                    fill={Theme.colors[color || "gray30"]}
                />
            </g>
            <rect
                x="1.16669"
                y="0.5"
                width="59.6667"
                height="43"
                rx="3.5"
                stroke={Theme.colors[color || "gray30"]}
            />
            <defs>
                <clipPath id="clip0_80_195">
                    <rect x="0.666687" width="60.6667" height="44" rx="4" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const IconElementMath = ({ size = 44, color }: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 61 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.833344" y="0.5" width="59.6667" height="43" rx="3.5" fill="white" />
            <rect x="0.833344" y="0.5" width="59.6667" height="43" rx="3.5" stroke="#E0E0E0" />
            <path
                d="M24.7115 31.5V29.724L30.3755 22.644L24.9515 16.164V14.364H36.3035V16.284H30.1355C29.7835 16.284 29.3515 16.284 28.8395 16.284C28.3435 16.284 27.9675 16.276 27.7115 16.26L32.6315 22.092V22.74L27.1835 29.58C27.7915 29.58 28.3755 29.58 28.9355 29.58C29.5115 29.564 30.1195 29.556 30.7595 29.556H36.5915V31.5H24.7115Z"
                fill={Theme.colors[color || "gray40"]}
            />
        </svg>
    );
};

export const IconElementlineChart = ({
    size = 50,
    color,
}: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 77 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_435_51)">
                <mask id="path-1-inside-1_435_51" fill="white">
                    <path d="M0 50L-2.18557e-06 0L76.6667 -3.35121e-06L76.6667 50L0 50Z" />
                </mask>
                <path
                    d="M12 22.6829L0 41.4634V50H78V35.8818V28.2317L62 15L49.5 22.6829L42 38.0488L31.5 33.7805L23 38.0488L12 22.6829Z"
                    fill="white"
                    stroke={Theme.colors[color || "gray40"]}
                />
            </g>
            <path
                d="M0 50L-1 50L-1 51L4.37114e-08 51L0 50ZM0 50L1 50L0.999998 -4.37114e-08L-2.18557e-06 0L-1 4.37114e-08L-1 50L0 50ZM76.6667 50L76.6667 49L-4.37114e-08 49L0 50L4.37114e-08 51L76.6667 51L76.6667 50Z"
                fill={Theme.colors[color || "gray40"]}
                mask="url(#path-1-inside-1_435_51)"
            />
            <defs>
                <clipPath id="clip0_435_51">
                    <path
                        d="M0 50L-2.18557e-06 0L76.6667 -3.35121e-06L76.6667 50L0 50Z"
                        fill="white"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export const IconElementbarChart = ({
    size = 50,
    color,
}: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 78 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_435_78)">
                <mask id="path-1-inside-1_435_78" fill="white">
                    <path d="M0.666687 50L0.666685 0L77.3334 -3.35121e-06L77.3334 50L0.666687 50Z" />
                </mask>
                <rect
                    x="11.1667"
                    y="17.5"
                    width="7"
                    height="32"
                    fill="white"
                    stroke={Theme.colors[color || "gray40"]}
                />
                <rect
                    x="23.6667"
                    y="38.5"
                    width="7"
                    height="11"
                    fill={Theme.colors[color || "gray20"]}
                    stroke={Theme.colors[color || "gray40"]}
                />
                <rect
                    x="36.1667"
                    y="27.5"
                    width="7"
                    height="22"
                    fill="white"
                    stroke={Theme.colors[color || "gray40"]}
                />
                <rect
                    x="48.6667"
                    y="9.5"
                    width="7"
                    height="40"
                    fill={Theme.colors[color || "gray20"]}
                    stroke={Theme.colors[color || "gray40"]}
                />
                <rect
                    x="61.1667"
                    y="21.5"
                    width="7"
                    height="28"
                    fill="white"
                    stroke={Theme.colors[color || "gray40"]}
                />
            </g>
            <path
                d="M0.666687 50L-0.333313 50L-0.333313 51L0.666687 51L0.666687 50ZM0.666687 50L1.66669 50L1.66668 -4.37114e-08L0.666685 0L-0.333315 4.37114e-08L-0.333313 50L0.666687 50ZM77.3334 50L77.3334 49L0.666687 49L0.666687 50L0.666687 51L77.3334 51L77.3334 50Z"
                fill={Theme.colors[color || "gray40"]}
                mask="url(#path-1-inside-1_435_78)"
            />
            <defs>
                <clipPath id="clip0_435_78">
                    <path
                        d="M0.666687 50L0.666685 0L77.3334 -3.35121e-06L77.3334 50L0.666687 50Z"
                        fill="white"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export const IconElementPieChart = ({
    size = 50,
    color,
}: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 77 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_437_26)">
                <mask id="path-1-inside-1_437_26" fill="white">
                    <path d="M0.333344 50L0.333341 0L77 -3.35121e-06L77 50L0.333344 50Z" />
                </mask>
                <path
                    d="M38 9C34.6377 9 31.3509 9.96771 28.5553 11.7808C25.7597 13.5938 23.5807 16.1707 22.294 19.1857C21.0074 22.2007 20.6707 25.5183 21.3267 28.719C21.9826 31.9197 23.6017 34.8597 25.9792 37.1673L38 25.5L38 9Z"
                    fill={Theme.colors[color || "gray40"]}
                />
                <path
                    d="M25.9792 37.1673C28.0318 39.1595 30.5757 40.6084 33.3687 41.3759C36.1617 42.1435 39.1107 42.2041 41.9347 41.552C44.7586 40.8999 47.3635 39.5568 49.5012 37.6507C51.6388 35.7446 53.238 33.339 54.1463 30.6631L38 25.5L25.9792 37.1673Z"
                    fill="white"
                />
                <path
                    d="M53.9393 31.237C54.9043 28.7113 55.2175 25.9947 54.8516 23.3244C54.4856 20.6541 53.4516 18.1114 51.8399 15.9184C50.2282 13.7253 48.0878 11.9486 45.6057 10.7434C43.1235 9.53824 40.3751 8.94124 37.6004 9.00456L38 25.5L53.9393 31.237Z"
                    fill={Theme.colors[color ? "blue40" : "gray20"]}
                />
                <path
                    d="M38 9.5C47.1269 9.5 54.5 16.6774 54.5 25.5C54.5 34.3226 47.1269 41.5 38 41.5C28.8731 41.5 21.5 34.3226 21.5 25.5C21.5 16.6774 28.8731 9.5 38 9.5Z"
                    stroke={Theme.colors[color || "gray40"]}
                />
            </g>
            <path
                d="M0.333344 50L-0.666656 50L-0.666656 51L0.333344 51L0.333344 50ZM0.333344 50L1.33334 50L1.33334 -4.37114e-08L0.333341 0L-0.666659 4.37114e-08L-0.666656 50L0.333344 50ZM77 50L77 49L0.333343 49L0.333344 50L0.333344 51L77 51L77 50Z"
                fill={Theme.colors[color || "gray40"]}
                mask="url(#path-1-inside-1_437_26)"
            />
            <defs>
                <clipPath id="clip0_437_26">
                    <path
                        d="M0.333344 50L0.333341 0L77 -3.35121e-06L77 50L0.333344 50Z"
                        fill="white"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export const IconElementLine = ({ size = 77, color }: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 77 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="75.6667" height="49" rx="3.5" fill="white" />
            <rect x="0.5" y="0.5" width="75.6667" height="49" rx="3.5" stroke="#E0E0E0" />
            <rect
                x="7.5"
                y="7.5"
                width="61.6667"
                height="35"
                rx="5"
                fill={Theme.colors[color ? "blue30" : "gray10"]}
                stroke={Theme.colors[color || "gray60"]}
                strokeDasharray="5 5"
            />
        </svg>
    );
};

export const IconElementColumns = ({
    size = 77,
    color,
}: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 77 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="75.6667" height="49" rx="3.5" fill="white" />
            <rect x="0.5" y="0.5" width="75.6667" height="49" rx="3.5" stroke="#E0E0E0" />
            <rect
                x="5"
                y="5"
                width="19.5556"
                height="40"
                rx="5"
                fill={Theme.colors[color ? "blue30" : "gray10"]}
                stroke={Theme.colors[color || "gray60"]}
                strokeDasharray="5 5"
            />
            <rect
                x="28.5556"
                y="5"
                width="19.5556"
                height="40"
                rx="5"
                fill={Theme.colors[color ? "blue30" : "gray10"]}
                stroke={Theme.colors[color || "gray60"]}
                strokeDasharray="5 5"
            />
            <rect
                x="52.1111"
                y="5"
                width="19.5556"
                height="40"
                rx="5"
                fill={Theme.colors[color ? "blue30" : "gray10"]}
                stroke={Theme.colors[color || "gray60"]}
                strokeDasharray="5 5"
            />
        </svg>
    );
};

export const IconElementNotUniformColumns = ({
    size = 77,
    color,
}: ISVGsDynamicColorAndSize): ReactElement => {
    return (
        <svg height={size} viewBox="0 0 77 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="75.6667" height="49" rx="3.5" fill="white" />
            <rect x="0.5" y="0.5" width="75.6667" height="49" rx="3.5" stroke="#E0E0E0" />
            <rect
                x="5"
                y="5"
                width="42"
                height="40"
                rx="5"
                fill={Theme.colors[color ? "blue30" : "gray10"]}
                stroke={Theme.colors[color || "gray60"]}
                strokeDasharray="5 5"
            />
            <rect
                x="51"
                y="5"
                width="20.6667"
                height="40"
                rx="5"
                fill={Theme.colors[color ? "blue30" : "gray10"]}
                stroke={Theme.colors[color || "gray60"]}
                strokeDasharray="5 5"
            />
        </svg>
    );
};
