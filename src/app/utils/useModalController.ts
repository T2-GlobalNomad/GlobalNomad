import { useState } from "react";

export function useModalController() {
  const [showModal, setShowModal] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState("");

  return {
    showModal: showModal ?? false,
    setShowModal: setShowModal ?? (() => {}),
    isModalMessage: isModalMessage ?? "",
    setIsModalMessage: setIsModalMessage ?? (() => {}),
  };
}

