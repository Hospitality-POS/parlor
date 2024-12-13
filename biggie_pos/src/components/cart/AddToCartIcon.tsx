import { Badge, Box, Fab, keyframes } from "@mui/material";
import { green } from "@mui/material/colors";
import Draggable from "react-draggable";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function AddToCartIcon({ OpenCart }: any) {
  const { cartDetails } = useSelector((state: any) => state.cart);

  const { data: cartItems } = useQuery(
    ["cartItems", cartDetails?._id],
    () => fetchCartItems(cartDetails?._id),
    {
      refetchInterval: 1000,
    }
  );

  const fetchCartItems = async (cartId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/cart/cart-items/${cartId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error fetching cart items: " + error.message);
    }
  };

  const draggableRef = useRef(null);
  const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.4);
  }
  100% {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  }
`;
  return (
    <>
      <Draggable nodeRef={draggableRef}>
        <Box
          ref={draggableRef}
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "40px",
            zIndex: 999,
            animation: `${glowAnimation} 2s ease-in-out infinite`,
            borderRadius: "50%",
          }}
        >
          <Fab
            color="primary"
            onClick={OpenCart}
            sx={{
              backgroundColor: "#914F1E",
              width: "60px",
              height: "60px",
              "&:hover": {
                backgroundColor: "#914F1E",
              },
            }}
          >
            <Badge
              badgeContent={cartItems?.length}
              max={50}
              color="error"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 36 }} />
            </Badge>
          </Fab>
        </Box>
      </Draggable>
    </>
  );
}

export default AddToCartIcon;
