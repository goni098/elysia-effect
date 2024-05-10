export const VESTING_ABI = [
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" }
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
  { inputs: [], name: "EnforcedPause", type: "error" },
  { inputs: [], name: "ExpectedPause", type: "error" },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  { inputs: [], name: "InvalidArgCreatePool", type: "error" },
  { inputs: [], name: "InvalidArgLinearCreatePool", type: "error" },
  { inputs: [], name: "InvalidArgMileStoneCreatePool", type: "error" },
  { inputs: [], name: "InvalidArgPercentCreatePool", type: "error" },
  { inputs: [], name: "InvalidArgTotalPercentCreatePool", type: "error" },
  { inputs: [], name: "InvalidArgument", type: "error" },
  { inputs: [], name: "InvalidClaimAmount", type: "error" },
  { inputs: [], name: "InvalidClaimPercent", type: "error" },
  {
    inputs: [{ internalType: "address", name: "claimer", type: "address" }],
    name: "InvalidClaimer",
    type: "error"
  },
  { inputs: [], name: "InvalidFund", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "poolId", type: "uint256" }],
    name: "InvalidPoolIndex",
    type: "error"
  },
  {
    inputs: [{ internalType: "enum PoolState", name: "state", type: "uint8" }],
    name: "InvalidState",
    type: "error"
  },
  {
    inputs: [{ internalType: "uint256", name: "timestamp", type: "uint256" }],
    name: "InvalidTime",
    type: "error"
  },
  { inputs: [], name: "InvalidVestingType", type: "error" },
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
        internalType: "uint256",
        name: "poolId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "user",
        type: "address[]"
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "fundAmount",
        type: "uint256[]"
      }
    ],
    name: "AddFundEvent",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fundClaimed",
        type: "uint256"
      }
    ],
    name: "ClaimFundEvent",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "projectId", type: "string" },
          { internalType: "uint256", name: "tge", type: "uint256" },
          { internalType: "uint256", name: "cliff", type: "uint256" },
          { internalType: "uint256", name: "unlockPercent", type: "uint256" },
          {
            internalType: "uint256",
            name: "linearVestingDuration",
            type: "uint256"
          },
          { internalType: "uint16[]", name: "percents", type: "uint16[]" },
          { internalType: "uint64[]", name: "times", type: "uint64[]" },
          { internalType: "uint256", name: "fundsTotal", type: "uint256" },
          { internalType: "uint256", name: "fundsClaimed", type: "uint256" },
          { internalType: "address", name: "tokenFund", type: "address" },
          { internalType: "string", name: "name", type: "string" },
          {
            internalType: "enum VestingType",
            name: "vestingType",
            type: "uint8"
          },
          { internalType: "enum PoolState", name: "state", type: "uint8" }
        ],
        indexed: false,
        internalType: "struct Pool",
        name: "pool",
        type: "tuple"
      }
    ],
    name: "CreatePoolEvent",
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
        indexed: false,
        internalType: "uint256",
        name: "poolId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "user",
        type: "address[]"
      }
    ],
    name: "RemoveFundEvent",
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
    inputs: [],
    name: "ONE_HUNDRED_PERCENT_SCALED",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_poolId", type: "uint256" },
      { internalType: "uint256[]", name: "_fundAmounts", type: "uint256[]" },
      { internalType: "address[]", name: "_users", type: "address[]" }
    ],
    name: "addFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_poolId", type: "uint256" }],
    name: "claimFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "string", name: "projectId", type: "string" },
          { internalType: "uint256", name: "tge", type: "uint256" },
          { internalType: "uint256", name: "cliff", type: "uint256" },
          { internalType: "uint256", name: "unlockPercent", type: "uint256" },
          {
            internalType: "uint256",
            name: "linearVestingDuration",
            type: "uint256"
          },
          { internalType: "uint16[]", name: "percents", type: "uint16[]" },
          { internalType: "uint64[]", name: "times", type: "uint64[]" },
          { internalType: "address", name: "tokenFund", type: "address" },
          { internalType: "string", name: "name", type: "string" },
          {
            internalType: "enum VestingType",
            name: "vestingType",
            type: "uint8"
          }
        ],
        internalType: "struct CreatePool",
        name: "_createPool",
        type: "tuple"
      }
    ],
    name: "createPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_poolId", type: "uint256" }],
    name: "end",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_poolId", type: "uint256" }],
    name: "getCurrentClaimPercent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_poolId", type: "uint256" },
      { internalType: "address", name: "_claimer", type: "address" }
    ],
    name: "getPendingFund",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_poolId", type: "uint256" }],
    name: "getPoolInfo",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "projectId", type: "string" },
          { internalType: "uint256", name: "tge", type: "uint256" },
          { internalType: "uint256", name: "cliff", type: "uint256" },
          { internalType: "uint256", name: "unlockPercent", type: "uint256" },
          {
            internalType: "uint256",
            name: "linearVestingDuration",
            type: "uint256"
          },
          { internalType: "uint16[]", name: "percents", type: "uint16[]" },
          { internalType: "uint64[]", name: "times", type: "uint64[]" },
          { internalType: "uint256", name: "fundsTotal", type: "uint256" },
          { internalType: "uint256", name: "fundsClaimed", type: "uint256" },
          { internalType: "address", name: "tokenFund", type: "address" },
          { internalType: "string", name: "name", type: "string" },
          {
            internalType: "enum VestingType",
            name: "vestingType",
            type: "uint8"
          },
          { internalType: "enum PoolState", name: "state", type: "uint8" }
        ],
        internalType: "struct Pool",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_poolId", type: "uint256" },
      { internalType: "address", name: "_user", type: "address" }
    ],
    name: "getUserClaimInfo",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "fund", type: "uint256" },
          { internalType: "uint256", name: "released", type: "uint256" }
        ],
        internalType: "struct UserPool",
        name: "",
        type: "tuple"
      }
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
    inputs: [{ internalType: "uint256", name: "_poolId", type: "uint256" }],
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
    inputs: [],
    name: "poolIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "poolIndex", type: "uint256" }],
    name: "poolInfo",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "string", name: "projectId", type: "string" },
      { internalType: "uint256", name: "tge", type: "uint256" },
      { internalType: "uint256", name: "cliff", type: "uint256" },
      { internalType: "uint256", name: "unlockPercent", type: "uint256" },
      {
        internalType: "uint256",
        name: "linearVestingDuration",
        type: "uint256"
      },
      { internalType: "uint256", name: "fundsTotal", type: "uint256" },
      { internalType: "uint256", name: "fundsClaimed", type: "uint256" },
      { internalType: "address", name: "tokenFund", type: "address" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "enum VestingType", name: "vestingType", type: "uint8" },
      { internalType: "enum PoolState", name: "state", type: "uint8" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_poolId", type: "uint256" },
      { internalType: "address[]", name: "_users", type: "address[]" }
    ],
    name: "removeFund",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [{ internalType: "uint256", name: "_poolId", type: "uint256" }],
    name: "start",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      { internalType: "uint256", name: "poolIndex", type: "uint256" },
      { internalType: "address", name: "", type: "address" }
    ],
    name: "userPoolInfo",
    outputs: [
      { internalType: "uint256", name: "fund", type: "uint256" },
      { internalType: "uint256", name: "released", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const;
