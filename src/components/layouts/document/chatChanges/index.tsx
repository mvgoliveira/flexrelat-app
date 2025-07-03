import { Typography } from "@/components/features/typography";
import { AiChange } from "@/repositories/flexbotApi";
import { Theme } from "@/themes";
import { getElapsedTime } from "@/utils/date";
import { ReactElement } from "react";
import { MdDoneAll } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
    ColorContainer,
    Content,
    Root,
    StyledBadge,
    StyledCheckBox,
    StyledSmlButton,
} from "./styles";
import { CHANGES_BADGE_VARIANTS, CHANGES_TEXT_VARIANTS } from "./variants";

interface IChatChangesProps {
    metadata: AiChange;
    activeChange: AiChange | null;
    onUpdateActiveChange: (change: AiChange | null) => void;
}

export const ChatChanges = ({
    metadata,
    activeChange,
    onUpdateActiveChange,
}: IChatChangesProps): ReactElement => {
    return (
        <Root
            variant={metadata.type}
            active={activeChange?.id === metadata.id}
            onClick={() => onUpdateActiveChange(metadata)}
        >
            <ColorContainer variant={metadata.type} />

            <Content>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs50" }}
                            color="black"
                            fontWeight="medium"
                            textAlign="center"
                        >
                            FlexBot
                        </Typography>

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs50" }}
                            color="gray70"
                            fontWeight="regular"
                            textAlign="center"
                        >
                            {getElapsedTime(metadata.created_at)}
                        </Typography>
                    </div>

                    <StyledCheckBox
                        variant={metadata.type}
                        active={activeChange?.id === metadata.id}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <StyledBadge variant={metadata.type}>
                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs25" }}
                            color={CHANGES_BADGE_VARIANTS[metadata.type].textColor}
                            fontWeight="bold"
                            textAlign="center"
                        >
                            {CHANGES_TEXT_VARIANTS[metadata.type]}
                        </Typography>
                    </StyledBadge>

                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs50" }}
                        color="black"
                        fontWeight="medium"
                        textAlign="left"
                    >
                        {metadata.text}
                    </Typography>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <StyledSmlButton>
                        <MdDoneAll
                            size={14}
                            color={Theme.colors.black}
                            onClick={e => e.stopPropagation()}
                        />
                    </StyledSmlButton>

                    <StyledSmlButton>
                        <RiDeleteBin6Line
                            size={12}
                            color={Theme.colors.black}
                            onClick={e => e.stopPropagation()}
                        />
                    </StyledSmlButton>
                </div>
            </Content>
        </Root>
    );
};
