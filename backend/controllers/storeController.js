const { Store, Rating, User } = require('../models');
const { Op } = require('sequelize');

const getStores = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy = 'name', sortOrder = 'ASC' } = req.query;
    
    const where = {};
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { address: { [Op.like]: `%${search}%` } }
      ];
    }

    const stores = await Store.findAndCountAll({
      where,
      include: [
        {
          model: Rating,
          attributes: ['rating'],
          include: [{ model: User, attributes: ['name'] }]
        }
      ],
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: (page - 1) * limit
    });

    const storesWithAvgRating = stores.rows.map(store => {
      const ratings = store.Ratings || [];
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
        : 0;

      return {
        ...store.toJSON(),
        averageRating: Math.round(avgRating * 10) / 10,
        ratingCount: ratings.length
      };
    });

    res.json({
      stores: storesWithAvgRating,
      total: stores.count,
      page: parseInt(page),
      totalPages: Math.ceil(stores.count / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createStore = async (req, res) => {
  try {
    const { name, address, description } = req.body;

    const store = await Store.create({ name, address, description });
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, description } = req.body;

    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    await store.update({ name, address, description });
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    await store.destroy();
    res.json({ message: 'Store deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getStoreRatings = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;

    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const ratings = await Rating.findAndCountAll({
      where: { storeId },
      include: [{ model: User, attributes: ['name'] }],
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: (page - 1) * limit
    });

    const avgRating = ratings.rows.length > 0 
      ? ratings.rows.reduce((sum, r) => sum + r.rating, 0) / ratings.rows.length 
      : 0;

    res.json({
      store,
      ratings: ratings.rows,
      averageRating: Math.round(avgRating * 10) / 10,
      total: ratings.count,
      page: parseInt(page),
      totalPages: Math.ceil(ratings.count / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getStores, createStore, updateStore, deleteStore, getStoreRatings }; 