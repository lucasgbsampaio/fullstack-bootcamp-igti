import express from 'express';

import { accountsModel } from '../models/accounts.js';

const app = express();

app.put('/account/deposit', async (req, res) => {
  try {
    const { agencia, conta, deposit } = req.body;

    const account = await accountsModel.findOneAndUpdate(
      { agencia, conta },
      { $inc: { balance: deposit } },
      { new: true }
    );

    if (!account) {
      return res.status(404).send('Conta inválida');
    }

    return res.status(200).send(account);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.put('/account/withdraw', async (req, res) => {
  try {
    const { agencia, conta, withdraw } = req.body;

    const account = await accountsModel.findOne({ agencia, conta });

    if (!account) {
      return res.status(404).send('Conta inválida');
    }

    const newBalance = account.balance - withdraw;

    if (newBalance < 0) {
      return res.status(404).send('Saque não pode ser maior que o Saldo');
    }

    account.balance = newBalance;

    await account.save();

    return res.status(200).send(account);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get('/account/balance', async (req, res) => {
  try {
    const { agencia, conta } = req.body;

    const account = await accountsModel.find({ agencia, conta });

    if (!account) {
      return res.status(404).send('Conta inválida');
    }

    return res.status(200).send(account);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.delete('/account/delete', async (req, res) => {
  try {
    const { agencia, conta } = req.body;

    const account = await accountsModel.findOneAndDelete({ agencia, conta });

    if (!account) {
      return res.status(404).send('Conta inválida');
    }

    const activeAccounts = await accountsModel.find({ agencia });

    return res
      .status(200)
      .send(`Número de contas ativas desta agencia: ${activeAccounts.length}`);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.post('/account/transfer', async (req, res) => {
  try {
    const { origin, destiny, transfer } = req.body;

    const originAccount = await accountsModel.findOne({ conta: origin });
    const destinyAccount = await accountsModel.findOne({ conta: destiny });

    if (originAccount.agencia !== destinyAccount.agencia) {
      originAccount.balance -= 8;
    }

    originAccount.balance -= transfer;
    destinyAccount.balance += transfer;

    await originAccount.save();
    await destinyAccount.save();

    return res.status(200).send(originAccount);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get('/account/avg', async (req, res) => {
  try {
    const { agencia } = req.body;

    const accounts = await accountsModel.find({ agencia });

    const avg = accounts.reduce((acc, cur) => {
      return acc + cur.balance;
    }, 0);

    return res.status(200).send(`AVG: ${avg / accounts.length}`);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get('/account/lowest', async (req, res) => {
  try {
    const { limit } = req.body;

    const accounts = await accountsModel
      .aggregate([{ $sort: { balance: 1 } }])
      .limit(Number(limit));

    return res.status(200).send(accounts);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get('/account/highest', async (req, res) => {
  try {
    const { limit } = req.body;

    const accounts = await accountsModel
      .aggregate([{ $sort: { balance: -1 } }])
      .limit(Number(limit));

    return res.status(200).send(accounts);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get('/account/topBalances', async (_, res) => {
  try {
    const findAgencies = await accountsModel.distinct('agencia');

    for (const agency of findAgencies) {
      const findTopAccount = await accountsModel
        .find({ agencia: agency })
        .sort({ balance: -1 })
        .limit(1);

      const { name, balance, conta } = findTopAccount[0];

      await accountsModel.create({
        agencia: 99,
        name,
        balance,
        conta,
      });
    }

    const findPrivateAgency = await accountsModel.find({ agencia: 99 });

    return res.status(200).send(findPrivateAgency);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export { app as accountsRouter };
