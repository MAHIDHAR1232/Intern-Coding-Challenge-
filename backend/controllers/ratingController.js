const { Rating, Store, User } = require('../models');

const getRatings = async (req, res) => {
  try {
    const { page = 1, limit = 10, storeId, userId, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;
    
    const where = {};
    if (storeId) where.storeId = storeId;
    if (userId) where.userId = userId;

    const ratings = await Rating.findAndCountAll({
      where,
      include: [
        { model: User, attributes: ['name'] },
        { model: Store, attributes: ['name', 'address'] }
      ],
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: (page - 1) * limit
    });

    res.json({
      ratings: ratings.rows,
      total: ratings.count,
      page: parseInt(page),
      totalPages: Math.ceil(ratings.count / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createRating = async (req, res) => {
  try {
    const { storeId, rating, comment } = req.body;
    const userId = req.user.id;

    const existingRating = await Rating.findOne({ where: { userId, storeId } });
    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this store' });
    }

    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const newRating = await Rating.create({ userId, storeId, rating, comment });
    const ratingWithDetails = await Rating.findByPk(newRating.id, {
      include: [
        { model: User, attributes: ['name'] },
        { model: Store, attributes: ['name'] }
      ]
    });

    res.status(201).json(ratingWithDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const ratingRecord = await Rating.findByPk(id);
    if (!ratingRecord) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    if (req.user.role !== 'admin' && req.user.id !== ratingRecord.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await ratingRecord.update({ rating, comment });
    const updatedRating = await Rating.findByPk(id, {
      include: [
        { model: User, attributes: ['name'] },
        { model: Store, attributes: ['name'] }
      ]
    });

    res.json(updatedRating);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;

    const rating = await Rating.findByPk(id);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    if (req.user.role !== 'admin' && req.user.id !== rating.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await rating.destroy();
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserRatings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;

    const ratings = await Rating.findAndCountAll({
      where: { userId },
      include: [{ model: Store, attributes: ['name', 'address'] }],
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: (page - 1) * limit
    });

    res.json({
      ratings: ratings.rows,
      total: ratings.count,
      page: parseInt(page),
      totalPages: Math.ceil(ratings.count / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getRatings, createRating, updateRating, deleteRating, getUserRatings }; 