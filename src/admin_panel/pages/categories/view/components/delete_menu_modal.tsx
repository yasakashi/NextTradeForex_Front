import {
  Button,
  ButtonGroup,
  Dialog,
  DialogProps,
  Grid,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";


import { TransitionProps } from "@mui/material/transitions";

const DeleteMenuModal = ({
  props,
  menu_name,
  onYesClick,
  title,
  disabled,
}: {
  props: DialogProps;
  disabled: boolean;
  menu_name?: string;
  title?: JSX.Element;
  onYesClick: () => void;
}) => {
  return (
    <Dialog {...props} TransitionComponent={UpTransition}>
      <Grid item xs={12} style={{padding:"16px 24px"}}>
        {title || <CancelMenuText order_number={menu_name} />}
        <Grid item xs={12} container justifyContent={"flex-end"} marginTop={2}>
          <ButtonGroup variant="text">
            <Button
              disabled={disabled}
              onClick={(e) => props?.onClose?.(e, "escapeKeyDown")}
            >
              {"No"}
            </Button>
            <Button disabled={disabled} onClick={() => onYesClick()}>
              {"Yes"}
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default DeleteMenuModal;
export const CancelMenuText = ({ order_number }: { order_number?: string }) => {
  const theme = useTheme();
  if (theme.direction === "ltr")
    return (
      <Typography>
        Are you sure for deleting{" "}
        {<b style={{ textTransform: "uppercase" }}> {order_number}</b>} ?
      </Typography>
    );
  return (
    <Typography>
      آیا از حذف {<b style={{ textTransform: "uppercase" }}>{order_number}</b>}{" "}
      مطمعن هستید ؟
    </Typography>
  );
};
export const CancelCategoryText = ({
  order_number,
}: {
  order_number?: string;
}) => {
  const theme = useTheme();
  if (theme.direction === "ltr")
    return (
      <Typography>
        Are you sure for deleting{" "}
        {<b style={{ textTransform: "uppercase" }}> {order_number}</b>} Category
        ?
      </Typography>
    );
  return (
    <Typography>
      آیا از حذف {<b style={{ textTransform: "uppercase" }}>{order_number}</b>}{" "}
      دسته بندی مطمعن هستید ؟
    </Typography>
  );
};
export const CancelSubCategoryText = ({
  order_number,
}: {
  order_number?: string;
}) => {
  const theme = useTheme();
  if (theme.direction === "ltr")
    return (
      <Typography>
        Are you sure for deleting{" "}
        {<b style={{ textTransform: "uppercase" }}> {order_number}</b>} Sub
        Category ?
      </Typography>
    );
  return (
    <Typography>
      آیا از حذف {<b style={{ textTransform: "uppercase" }}>{order_number}</b>}{" "}
      محصول مطمعن هستید ؟
    </Typography>
  );
};
const UpTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
