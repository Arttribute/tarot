import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { TarotABI } from "@/lib/abi/TarotABI";
import Web3Modal from "web3modal";

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
  async function mintCard() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const TarotAddress = "0x7d20F77DE1E4Ebc3Ac1C2C3a369B11b4a1f6B509";
    const address = await signer.getAddress();
    const TarotContract = new ethers.Contract(TarotAddress, TarotABI, signer);
    const tokenUri = "https://mosaicsnft.com/api/metadata/1";
    await TarotContract.mintCertificate(address, tokenUri);
  }
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
              <Button onClick={mintCard} className="w-full">
                Mint
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
