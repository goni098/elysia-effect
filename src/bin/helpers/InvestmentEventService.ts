import { DateTime } from "luxon";
import type { WatchContractEventOnLogsParameter } from "viem";

import type { DEPOSIT_ABI } from "@root/contracts/deposit.abi";
import { retrieveErrorMessage } from "@root/helpers/retrieve-error";
import { TracingRepository } from "@root/repositories/tracing.repository";
import { TransactionRepository } from "@root/repositories/transaction.repository";

export type DepositEvent = WatchContractEventOnLogsParameter<
  typeof DEPOSIT_ABI,
  "Deposit"
>[number];

export type WithdrawEvent = WatchContractEventOnLogsParameter<
  typeof DEPOSIT_ABI,
  "WithDrawUser"
>[number];

export abstract class InvestmentEventService {
  static async handleDepositEvent(event: DepositEvent) {
    const depositor = event.args.depositor;
    const amount = event.args.amount;
    const timestamp = event.args.timeDeposit;
    const txHash = event.transactionHash;

    try {
      if (!depositor || !amount || !timestamp) {
        throw new Error("Deposit missing event arguments");
      }

      await TransactionRepository.createDepositTx({
        address: depositor,
        amount: amount.toString(),
        date: DateTime.fromSeconds(parseInt(timestamp.toString())),
        txHash
      });

      await TracingRepository.createStreamEvent({
        context: "deposit",
        payload: {
          depositor,
          amount: amount.toString(),
          timeDeposit: timestamp.toString()
        },
        txHash
      });

      console.log(`done handle event ${event.eventName} ${txHash}`);
    } catch (error) {
      console.log(`Failed to handle deposit event`);

      await TracingRepository.createStreamEvent({
        context: "deposit",
        payload: {
          depositor,
          amount: amount?.toString(),
          timeDeposit: timestamp?.toString()
        },
        txHash,
        isFailure: true,
        errorMessage: retrieveErrorMessage(error)
      });
    }
  }

  static async handleWithdrawEvent(event: WithdrawEvent) {
    const amount = event.args.amount;
    const timestamp = event.args.timeWithDraw;
    const sender = event.args.sender;
    const txHash = event.transactionHash;

    try {
      if (!sender || !amount || !timestamp) {
        throw new Error("withdraw missing event arguments");
      }

      await TransactionRepository.createWithdrawTx({
        address: sender,
        amount: amount.toString(),
        date: DateTime.fromSeconds(parseInt(timestamp.toString())),
        txHash
      });

      await TracingRepository.createStreamEvent({
        context: "withdraw",
        payload: {
          sender,
          amount: amount.toString(),
          timeWithDraw: timestamp.toString()
        },
        txHash
      });

      console.log(`done handle event ${event.eventName} ${txHash}`);
    } catch (error) {
      console.log(`Failed to handle withdraw event`);

      await TracingRepository.createStreamEvent({
        context: "withdraw",
        payload: {
          sender,
          amount: amount?.toString(),
          timeWithDraw: timestamp?.toString()
        },
        txHash,
        isFailure: true,
        errorMessage: retrieveErrorMessage(error)
      });
    }
  }
}
