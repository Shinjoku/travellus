import { forwardRef, type ReactNode, type Ref } from "react";
import { XIcon } from "@phosphor-icons/react";

import Button from "../Button";
import { Container, Header, Title } from "./style";

interface ModalProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

function Modal(
  { id, title, children, className, onClose }: ModalProps,
  ref: Ref<HTMLDialogElement>,
) {
  return (
    <Container id={id} ref={ref} className={className} onClose={onClose}>
      <Header>
        <Title>{title}</Title>
        <Button icon className="close-btn" command="close" commandfor={id}>
          <XIcon />
        </Button>
      </Header>
      {children}
    </Container>
  );
}

export default forwardRef(Modal);
