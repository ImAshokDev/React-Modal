import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import camera from "./camera.jpg";

export const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModalFunc = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  /*  <<<========    KeyPress Modal Open  & Close   =========>>>*/

  const keyPress = useCallback(
    (e) => {
      // Modal Close when Press Escape key
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }

      // Modal Open when Press Escape key
      if (e.key === "Escape" && !showModal) {
        setShowModal(true);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModalFunc}>
          <animated.div style={animation}>
            <ModalWrapper>
              <ModalImg src={camera} alt="image" />
              <ModalContent>
                <h1>Are you ready?</h1>
                <p>Get exclusive access to our next launch</p>
                <button>Join Now</button>
              </ModalContent>
              <CloseModalButton
                aria-label="Close Modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

/*  <<<========    Styles    =========>>>*/

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #555555;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #555555;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1;
  color: #555555;

  p {
    margin: 1rem 0;
  }

  button {
    padding: 10px 24px;
    background: #555555;
    color: #fff;
    border: none;
    outline: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 24px;
  right: 24px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;
