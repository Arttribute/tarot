import React, { useState } from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

interface ModalProps {
  title: string;
  description: string;
  imageUrl: string;
  onClose: () => void;
  open: boolean;
  timePeriod: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  imageUrl,
  onClose,
  open,
  timePeriod,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <img
              src={imageUrl}
              className=" aspect-[1] rounded-xl"
              alt={title}
            />
          </div>
          <div className="col-span-6">
            <div className="px-6">
              <h2 className="text-base text-gray-500 ">{timePeriod}</h2>
              <h2 className="text-2xl font-semibold mb-4">{title}</h2>

              <p className="text-sm mb-4">{description}</p>
              <button
                onClick={onClose}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
              >
                Mint
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
