import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Content as RadixContent } from "@radix-ui/react-popover";

const scaleIn = keyframes`
	from {
		opacity: 0;
		transform: scale(0);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
`;

export const StyledContent = styled(RadixContent)`
    min-width: var(--radix-popover-trigger-width);
    z-index: 996;

    transform-origin: var(--radix-popover-content-transform-origin);
    animation: ${scaleIn} 0.1s ease-out;
`;
