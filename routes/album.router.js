import express from 'express';
import AlbumModel from '../models/album.model.js';

const albumRoute = express.Router();

albumRoute.post('/create-album/:idAlbum', async (req, res) => {
  try {
    const { idAlbum } = req.params;

    const newAlbum = await AlbumModel.create({ ...req.body, album: idAlbum });

    const AlbumUpdated = await AlbumModel.findByIdAndUpdate(
      idAlbum,
      {
        $push: {
          album: newAlbum._id,
        },
      },
      { new: true, runValidators: true }
    );

    return res.status(201).json(newAlbum);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

albumRoute.get('/oneAlbum/:idAlbum', async (req, res) => {
  try {
    const { idAlbum } = req.params;

    const oneAlbum = await AlbumModel.findById(idAlbum).populate('album');

    return res.status(200).json(oneAlbum);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

albumRoute.get('/all-albuns', async (req, res) => {
  try {
    const allAlbuns = await AlbumModel.find({}).populate('album');

    return res.status(200).json(allAlbuns);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

albumRoute.put('/edit/:idAlbum', async (req, res) => {
  try {
    const { idAlbum } = req.params;

    const updatedAlbum = await AlbumModel.findOneAndUpdate(
      { _id: idAlbum },
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedAlbum);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

albumRoute.delete('/delete/:idAlbum', async (req, res) => {
  try {
    const { idAlbum } = req.params;

    const deletedAlbum = await AlbumModel.findByIdAndDelete(idAlbum);

    await AlbumModel.findByIdAndUpdate(
      deletedAlbum.user,
      {
        $pull: {
          albuns: idAlbum,
        },
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json(deletedAlbum);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

export default albumRoute;
