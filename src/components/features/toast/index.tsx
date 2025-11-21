import { Typography } from "@/components/features/typography";
import toast from "react-hot-toast";

import { Root } from "./styles";

export const toastError = (): void => {
    toast.error(
        <Root>
            <Typography tag="p" fontSize={{ xs: "fs75" }} color="black" fontWeight="bold">
                Ocorreu um erro
            </Typography>

            <Typography tag="p" fontSize={{ xs: "fs75" }} color="gray90" fontWeight="regular">
                Tente novamente mais tarde!
            </Typography>
        </Root>
    );
};
