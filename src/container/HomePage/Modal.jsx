import React from "react";
import { Grid, Box, Modal } from "@mui/material";
import { Col, Container } from "react-bootstrap";
import FMTypography from "components/FMTypography/FMTypography";
import crossIcon from "assets/crossIcon.svg";

const ModalWrapper = (props) => {
  const {open,handleClose,setCloseDialog, children,modalTitle } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "grid",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0, .8)",
        zIndex: "1000",
        overflowY:"auto"
      }}
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          sx={{
            backgroundColor: "white",
            width: "36.5rem",
            borderRadius: "0.5rem",
            height: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              boxShadow: " 0px 1px 12px rgba(181, 180, 180, 0.12)",
            }}
          >
            <Col className="col-11">
              <FMTypography
                displayText={modalTitle}
                styleData={{
                  fontWeight: "500",
                  fontSize: "1.125rem",
                  fontFamily: "'Inter', sans-serif",
                  margin: "1rem",
                  textAlign: "center",
                }}
              />
            </Col>
            <Col className="col-1">
              <img
                src={crossIcon}
                alt="cross-icon"
                style={{
                  cursor: "pointer",
                  width: "1rem",
                  margin: "1rem",
                }}
                onClick={setCloseDialog}
              />
            </Col>
          </Box>
          <Container style={{margin:"10px 0px 20px 0"}}>{children}</Container>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalWrapper;