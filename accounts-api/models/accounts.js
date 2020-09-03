import mongoose from 'mongoose';

const accountsSchema = mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    validate(balance) {
      if (balance < 0) throw new Error('Balance não pode ser negativo');
    },
  },
});

const accountsModel = mongoose.model('account', accountsSchema, 'account');

export { accountsModel };
