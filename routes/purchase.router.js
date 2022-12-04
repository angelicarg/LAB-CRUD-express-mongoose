import express from 'express';
import AlbumModel from '../models/album.model.js';
import PurchaseModel from '../models/purchase.model.js';

const purchaseRoute = express.Router();

purchaseRoute.post('/create-purchase', async (req, res) => {
  try {
    const purchase = req.body;

    const newPurchase = await PurchaseModel.create(purchase);

    return res.status(201).json(newPurchase);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

purchaseRoute.get('/all-purchase', async (req, res) => {
  try {
    const purchase = await PurchaseModel;

    return res.status(200).json(purchase);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

purchaseRoute.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPurchase = await PurchaseModel.findByIdAndDelete(id);

    if (!deletedPurchase) {
      return res.status(400).json({ msg: 'Usuário não encontrado!' });
    }

    const purchase = await PurchaseModel.find();

    await AlbumModel.deleteMany({ Album: id });

    return res.status(200).json(purchase);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

purchaseRoute.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPurchase = await PurchaseModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedPurchase);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

export default purchaseRoute;
