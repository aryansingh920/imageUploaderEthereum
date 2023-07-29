// imageController.ts
import { Request, Response } from 'express';
import { upload } from '../middleware/uploadMiddleware';
import { ImageStorageContract } from '../contracts/imageStorageContract';

const contractAddress = '0x...'; // Replace with the deployed contract address on Ganache

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    await upload(req, res, (err: any) => {
  if (err) {
    res.status(500).json({ message: 'Failed to upload the image.', error: err.message });
  }
});


    if (!req.file) {
      res.status(400).json({ message: 'Image file not provided.' });
      return;
    }

    const fileName = req.file.filename;
    const imageHash = '0x' + req.file.buffer.toString('hex');

    // Store the image hash on the blockchain
    const contract = new ImageStorageContract(contractAddress);
    await contract.storeImageHash(fileName, imageHash);

    res.status(200).json({ message: 'Image uploaded and stored on the blockchain.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload the image.' });
  }
};

export const getImageHash = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fileName } = req.params;

    const contract = new ImageStorageContract(contractAddress);
    const imageHash = await contract.getImageHash(fileName);

    res.status(200).json({ hash: imageHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get the image hash from the blockchain.' });
  }
};
