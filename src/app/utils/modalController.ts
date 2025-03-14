import { useState } from "react";

export function modalController() {
  const [showModal, setShowModal] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState("");

  return {
    showModal: showModal ?? false,
    setShowModal: setShowModal ?? (() => {}),
    isModalMessage: isModalMessage ?? "",
    setIsModalMessage: setIsModalMessage ?? (() => {}),
  };
}

