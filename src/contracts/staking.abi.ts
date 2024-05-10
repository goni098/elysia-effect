export const STAKING_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_launchPadToken", type: "address" },
      { internalType: "address", name: "_initialOnwer", type: "address" },
      {
        components: [
          { internalType: "uint16", name: "unstakeFee", type: "uint16" },
          { internalType: "uint16", name: "apy", type: "uint16" },
          { internalType: "uint16", name: "multiplier", type: "uint16" },
          { internalType: "uint32", name: "lockDay", type: "uint32" },
          { internalType: "uint32", name: "unstakeTime", type: "uint32" },
          { internalType: "uint256", name: "totalStaked", type: "uint256" },
          { internalType: "uint256", name: "numberStaker", type: "uint256" },
          { internalType: "enum PoolType", name: "poolType", type: "uint8" }
        ],
        internalType: "struct PoolInfo[]",
        name: "_pools",
        type: "tuple[]"
      },
      {
        components: [
          {
            internalType: "uint16",
            name: "lotteryProbabilities",
            type: "uint16"
          },
          { internalType: "uint16", name: "poolWeight", type: "uint16" },
          { internalType: "uint256", name: "pPoint", type: "uint256" },
          { internalType: "enum TierType", name: "tierType", type: "uint8" }
        ],
        internalType: "struct TierInfo[]",
        name: "_tiers",
        type: "tuple[]"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "AddressInsufficientBalance",
    type: "error"
  },
  { inputs: [], name: "CanNotWithClaimPoolOne", type: "error" },
  { inputs: [], name: "EnforcedPause", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "ExceedBalance",
    type: "error"
  },
  { inputs: [], name: "ExpectedPause", type: "error" },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "InsufficientAlowances",
    type: "error"
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "InsufficientAmount",
    type: "error"
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "InsufficientBalance",
    type: "error"
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "InvalidAmount",
    type: "error"
  },
  {
    inputs: [{ internalType: "uint256", name: "itemId", type: "uint256" }],
    name: "InvalidItemId",
    type: "error"
  },
  {
    inputs: [{ internalType: "uint256", name: "point", type: "uint256" }],
    name: "InvalidPoint",
    type: "error"
  },
  { inputs: [], name: "InvalidPoolType", type: "error" },
  {
    inputs: [{ internalType: "address", name: "staker", type: "address" }],
    name: "InvalidStaker",
    type: "error"
  },
  { inputs: [], name: "MathOverflowedMulDiv", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "staker",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "itemId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "claimTime",
        type: "uint64"
      }
    ],
    name: "ClaimPendingReward",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "claimer",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "itemId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "claimAt",
        type: "uint64"
      }
    ],
    name: "ClaimReward",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "staker",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "itemId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "claimTime",
        type: "uint64"
      }
    ],
    name: "ClaimUnstakePoolOne",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "Paused",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pPoint",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "updateAt",
        type: "uint64"
      },
      { indexed: false, internalType: "uint64", name: "end", type: "uint64" },
      {
        indexed: false,
        internalType: "enum PoolType",
        name: "poolType",
        type: "uint8"
      }
    ],
    name: "Stake",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "staker",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "itemId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unStakeAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lossPoint",
        type: "uint256"
      },
      { indexed: false, internalType: "uint64", name: "time", type: "uint64" },
      {
        indexed: false,
        internalType: "enum PoolType",
        name: "pool",
        type: "uint8"
      }
    ],
    name: "UnStake",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "Unpaused",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "unstakeFee", type: "uint16" },
          { internalType: "uint16", name: "apy", type: "uint16" },
          { internalType: "uint16", name: "multiplier", type: "uint16" },
          { internalType: "uint32", name: "lockDay", type: "uint32" },
          { internalType: "uint32", name: "unstakeTime", type: "uint32" },
          { internalType: "uint256", name: "totalStaked", type: "uint256" },
          { internalType: "uint256", name: "numberStaker", type: "uint256" },
          { internalType: "enum PoolType", name: "poolType", type: "uint8" }
        ],
        indexed: false,
        internalType: "struct PoolInfo",
        name: "pool",
        type: "tuple"
      }
    ],
    name: "UpdatePool",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint16",
            name: "lotteryProbabilities",
            type: "uint16"
          },
          { internalType: "uint16", name: "poolWeight", type: "uint16" },
          { internalType: "uint256", name: "pPoint", type: "uint256" },
          { internalType: "enum TierType", name: "tierType", type: "uint8" }
        ],
        indexed: false,
        internalType: "struct TierInfo",
        name: "tier",
        type: "tuple"
      }
    ],
    name: "UpdateTier",
    type: "event"
  },
  {
    inputs: [],
    name: "SECOND_YEAR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "addFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_itemId", type: "uint256" }],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_itemId", type: "uint256" }],
    name: "claimUnstakePoolOne",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_itemId", type: "uint256" }],
    name: "getPendingReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getTotalStakedPool",
    outputs: [
      { internalType: "uint256", name: "totalStaked", type: "uint256" },
      { internalType: "uint256", name: "totalNumberStaker", type: "uint256" },
      { internalType: "uint256", name: "totalReward", type: "uint256" },
      { internalType: "uint256", name: "avgAPY", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserItemId",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserTotalStaked",
    outputs: [
      { internalType: "uint256", name: "totalStaked", type: "uint256" },
      { internalType: "uint256", name: "totalPoint", type: "uint256" },
      { internalType: "uint256", name: "totalReward", type: "uint256" },
      { internalType: "uint256", name: "balance", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "itemId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "itemId", type: "uint256" }],
    name: "itemIdIndexInfo",
    outputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "launchPadToken",
    outputs: [
      { internalType: "contract PurrToken", name: "", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "enum PoolType", name: "poolType", type: "uint8" }
    ],
    name: "poolInfo",
    outputs: [
      { internalType: "uint16", name: "unstakeFee", type: "uint16" },
      { internalType: "uint16", name: "apy", type: "uint16" },
      { internalType: "uint16", name: "multiplier", type: "uint16" },
      { internalType: "uint32", name: "lockDay", type: "uint32" },
      { internalType: "uint32", name: "unstakeTime", type: "uint32" },
      { internalType: "uint256", name: "totalStaked", type: "uint256" },
      { internalType: "uint256", name: "numberStaker", type: "uint256" },
      { internalType: "enum PoolType", name: "poolType", type: "uint8" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "enum PoolType", name: "_poolType", type: "uint8" }
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "enum TierType", name: "tierType", type: "uint8" }
    ],
    name: "tierInfo",
    outputs: [
      { internalType: "uint16", name: "lotteryProbabilities", type: "uint16" },
      { internalType: "uint16", name: "poolWeight", type: "uint16" },
      { internalType: "uint256", name: "pPoint", type: "uint256" },
      { internalType: "enum TierType", name: "tierType", type: "uint8" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint256", name: "_itemId", type: "uint256" }
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint16", name: "unstakeFee", type: "uint16" },
          { internalType: "uint16", name: "apy", type: "uint16" },
          { internalType: "uint16", name: "multiplier", type: "uint16" },
          { internalType: "uint32", name: "lockDay", type: "uint32" },
          { internalType: "uint32", name: "unstakeTime", type: "uint32" },
          { internalType: "uint256", name: "totalStaked", type: "uint256" },
          { internalType: "uint256", name: "numberStaker", type: "uint256" },
          { internalType: "enum PoolType", name: "poolType", type: "uint8" }
        ],
        internalType: "struct PoolInfo",
        name: "_pool",
        type: "tuple"
      }
    ],
    name: "updatePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint16",
            name: "lotteryProbabilities",
            type: "uint16"
          },
          { internalType: "uint16", name: "poolWeight", type: "uint16" },
          { internalType: "uint256", name: "pPoint", type: "uint256" },
          { internalType: "enum TierType", name: "tierType", type: "uint8" }
        ],
        internalType: "struct TierInfo",
        name: "_tier",
        type: "tuple"
      }
    ],
    name: "updateTier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "staker", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "userItemInfo",
    outputs: [{ internalType: "uint256", name: "itemIds", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "itemId", type: "uint256" }],
    name: "userPoolInfo",
    outputs: [
      { internalType: "uint64", name: "updateAt", type: "uint64" },
      { internalType: "uint64", name: "end", type: "uint64" },
      { internalType: "uint64", name: "timeUnstaked", type: "uint64" },
      { internalType: "uint256", name: "amountAvailable", type: "uint256" },
      { internalType: "address", name: "staker", type: "address" },
      { internalType: "uint256", name: "pPoint", type: "uint256" },
      { internalType: "uint256", name: "stakedAmount", type: "uint256" },
      { internalType: "enum PoolType", name: "poolType", type: "uint8" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdrawFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const;
