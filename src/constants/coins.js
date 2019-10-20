export const coins = {
  1: [
    {
      symbol: "WETH",
      name: "Wrapped Ether",
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      decimals: 18,
      id: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      reserves_src: ["0x57f8160e1c59D16C01BbE181fD94db4E56b60495"],
      reserves_dest: ["0x57f8160e1c59D16C01BbE181fD94db4E56b60495"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "KNC",
      name: "KyberNetwork",
      address: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
      decimals: 18,
      id: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      },
      reserves_src: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7",
        "0xA467b88BBF9706622be2784aF724C4B44a9d26F4"
      ],
      reserves_dest: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7",
        "0xA467b88BBF9706622be2784aF724C4B44a9d26F4"
      ]
    },
    {
      symbol: "DAI",
      name: "DAI",
      address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
      decimals: 18,
      id: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
      reserves_src: [
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7",
        "0x04A487aFd662c4F9DEAcC07A7B10cFb686B682A4",
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0",
        "0x7a3370075a54B187d7bD5DceBf0ff2B5552d4F7D",
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F"
      ],
      reserves_dest: [
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7",
        "0x04A487aFd662c4F9DEAcC07A7B10cFb686B682A4",
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0",
        "0x7a3370075a54B187d7bD5DceBf0ff2B5552d4F7D",
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "OMG",
      name: "OmiseGO",
      address: "0xd26114cd6ee289accf82350c8d8487fedb8a0c07",
      decimals: 18,
      id: "0xd26114cd6ee289accf82350c8d8487fedb8a0c07",
      reserves_src: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7"
      ],
      reserves_dest: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "SNT",
      name: "Status",
      address: "0x744d70fdbe2ba4cf95131626614a1763df805b9e",
      decimals: 18,
      id: "0x744d70fdbe2ba4cf95131626614a1763df805b9e",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "ELF",
      name: "Aelf",
      address: "0xbf2179859fc6d5bee9bf9158632dc51678a4100e",
      decimals: 18,
      id: "0xbf2179859fc6d5bee9bf9158632dc51678a4100e",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "POWR",
      name: "Power Ledger",
      address: "0x595832f8fc6bf59c85c527fec3740a1b7a361269",
      decimals: 6,
      id: "0x595832f8fc6bf59c85c527fec3740a1b7a361269",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "MANA",
      name: "Mana",
      address: "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
      decimals: 18,
      id: "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "BAT",
      name: "Basic Attention Token",
      address: "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
      decimals: 18,
      id: "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
      reserves_src: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0"
      ],
      reserves_dest: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "REQ",
      name: "Request",
      address: "0x8f8221afbb33998d8584a2b05749ba73c37a938a",
      decimals: 18,
      id: "0x8f8221afbb33998d8584a2b05749ba73c37a938a",
      reserves_src: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"
      ],
      reserves_dest: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "RDN",
      name: "Raiden",
      address: "0x255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6",
      decimals: 18,
      id: "0x255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6",
      reserves_src: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7"
      ],
      reserves_dest: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "APPC",
      name: "AppCoins",
      address: "0x1a7a8bd9106f2b8d977e08582dc7d24c723ab0db",
      decimals: 18,
      id: "0x1a7a8bd9106f2b8d977e08582dc7d24c723ab0db",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "ENG",
      name: "Enigma",
      address: "0xf0ee6b27b759c9893ce4f094b49ad28fd15a23e4",
      decimals: 8,
      id: "0xf0ee6b27b759c9893ce4f094b49ad28fd15a23e4",
      reserves_src: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"
      ],
      reserves_dest: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "BQX",
      name: "Ethos",
      address: "0x5af2be193a6abca9c8817001f45744777db30756",
      decimals: 8,
      id: "0x5af2be193a6abca9c8817001f45744777db30756",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "AST",
      name: "AirSwap",
      address: "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
      decimals: 4,
      id: "0x27054b13b1b798b345b591a4d22e6562d47ea75a",
      reserves_src: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"
      ],
      reserves_dest: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "LINK",
      name: "Chain Link",
      address: "0x514910771af9ca656af840dff83e8264ecf986ca",
      decimals: 18,
      id: "0x514910771af9ca656af840dff83e8264ecf986ca",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "DGX",
      name: "Digix Gold Token",
      address: "0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf",
      decimals: 9,
      id: "0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "STORM",
      name: "Storm",
      address: "0xd0a4b8946cb52f0661273bfbc6fd0e0c75fc6433",
      decimals: 18,
      id: "0xd0a4b8946cb52f0661273bfbc6fd0e0c75fc6433",
      reserves_src: ["0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"],
      reserves_dest: ["0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "IOST",
      name: "IOStoken",
      address: "0xfa1a856cfa3409cfa145fa4e20eb270df3eb21ab",
      decimals: 18,
      id: "0xfa1a856cfa3409cfa145fa4e20eb270df3eb21ab",
      reserves_src: ["0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"],
      reserves_dest: ["0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "ABT",
      name: "ArcBlock",
      address: "0xb98d4c97425d9908e66e53a6fdf673acca0be986",
      decimals: 18,
      id: "0xb98d4c97425d9908e66e53a6fdf673acca0be986",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "ENJ",
      name: "Enjin Coin",
      address: "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c",
      decimals: 18,
      id: "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "BLZ",
      name: "Bluzelle",
      address: "0x5732046a883704404f284ce41ffadd5b007fd668",
      decimals: 18,
      id: "0x5732046a883704404f284ce41ffadd5b007fd668",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "POLY",
      name: "Polymath",
      address: "0x9992ec3cf6a55b00978cddf2b27bc6882d88d1ec",
      decimals: 18,
      id: "0x9992ec3cf6a55b00978cddf2b27bc6882d88d1ec",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "LBA",
      name: "Cred",
      address: "0xfe5f141bf94fe84bc28ded0ab966c16b17490657",
      decimals: 18,
      id: "0xfe5f141bf94fe84bc28ded0ab966c16b17490657",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "CVC",
      name: "Civic",
      address: "0x41e5560054824ea6b0732e656e3ad64e20e94e45",
      decimals: 8,
      id: "0x41e5560054824ea6b0732e656e3ad64e20e94e45",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "POE",
      name: "Po.et",
      address: "0x0e0989b1f9b8a38983c2ba8053269ca62ec9b195",
      decimals: 8,
      id: "0x0e0989b1f9b8a38983c2ba8053269ca62ec9b195",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "PAY",
      name: "TenX",
      address: "0xb97048628db6b661d4c2aa833e95dbe1a905b280",
      decimals: 18,
      id: "0xb97048628db6b661d4c2aa833e95dbe1a905b280",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "DTA",
      name: "Data",
      address: "0x69b148395ce0015c13e36bffbad63f49ef874e03",
      decimals: 18,
      id: "0x69b148395ce0015c13e36bffbad63f49ef874e03",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "BNT",
      name: "Bancor",
      address: "0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c",
      decimals: 18,
      id: "0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "TUSD",
      name: "TrueUSD",
      address: "0x8dd5fbce2f6a956c3022ba3663759011dd51e73e",
      decimals: 18,
      id: "0x8dd5fbce2f6a956c3022ba3663759011dd51e73e",
      reserves_src: [
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0",
        "0x7a3370075a54B187d7bD5DceBf0ff2B5552d4F7D"
      ],
      reserves_dest: [
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0",
        "0x7a3370075a54B187d7bD5DceBf0ff2B5552d4F7D"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "LEND",
      name: "EthLend",
      address: "0x80fb784b7ed66730e8b1dbd9820afd29931aab03",
      decimals: 18,
      id: "0x80fb784b7ed66730e8b1dbd9820afd29931aab03",
      reserves_src: ["0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"],
      reserves_dest: ["0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "MTL",
      name: "Metal",
      address: "0xf433089366899d83a9f26a773d59ec7ecf30355e",
      decimals: 8,
      id: "0xf433089366899d83a9f26a773d59ec7ecf30355e",
      reserves_src: ["0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"],
      reserves_dest: ["0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "MOC",
      name: "Moss Land",
      address: "0x865ec58b06bf6305b886793aa20a2da31d034e68",
      decimals: 18,
      id: "0x865ec58b06bf6305b886793aa20a2da31d034e68",
      reserves_src: ["0x742e8BB8e6bDE9CB2DF5449f8de7510798727fB1"],
      reserves_dest: ["0x742e8BB8e6bDE9CB2DF5449f8de7510798727fB1"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "REP",
      name: "Augur",
      address: "0x1985365e9f78359a9b6ad760e32412f4a445e862",
      decimals: 18,
      id: "0x1985365e9f78359a9b6ad760e32412f4a445e862",
      reserves_src: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0"
      ],
      reserves_dest: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "ZRX",
      name: "0x Protocol",
      address: "0xe41d2489571d322189246dafa5ebde1f4699f498",
      decimals: 18,
      id: "0xe41d2489571d322189246dafa5ebde1f4699f498",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "DAT",
      name: "Datum",
      address: "0x81c9151de0c8bafcd325a57e3db5a5df1cebf79c",
      decimals: 18,
      id: "0x81c9151de0c8bafcd325a57e3db5a5df1cebf79c",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "REN",
      name: "Republic",
      address: "0x408e41876cccdc0f92210600ef50372656052a38",
      decimals: 18,
      id: "0x408e41876cccdc0f92210600ef50372656052a38",
      reserves_src: ["0x45eb33D008801d547990cAF3b63B4F8aE596EA57"],
      reserves_dest: ["0x45eb33D008801d547990cAF3b63B4F8aE596EA57"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "QKC",
      name: "QuarkChain",
      address: "0xea26c4ac16d4a5a106820bc8aee85fd0b7b2b664",
      decimals: 18,
      id: "0xea26c4ac16d4a5a106820bc8aee85fd0b7b2b664",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "MKR",
      name: "Maker",
      address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
      decimals: 18,
      id: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
      reserves_src: [
        "0x04A487aFd662c4F9DEAcC07A7B10cFb686B682A4",
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0"
      ],
      reserves_dest: [
        "0x04A487aFd662c4F9DEAcC07A7B10cFb686B682A4",
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "EKO",
      name: "EchoLink",
      address: "0xa6a840e50bcaa50da017b91a0d86b8b2d41156ee",
      decimals: 18,
      id: "0xa6a840e50bcaa50da017b91a0d86b8b2d41156ee",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "OST",
      name: "Open Simple Token",
      address: "0x2c4e8f2d746113d0696ce89b35f0d8bf88e0aeca",
      decimals: 18,
      id: "0x2c4e8f2d746113d0696ce89b35f0d8bf88e0aeca",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "PT",
      name: "Promotion Token",
      address: "0x094c875704c14783049ddf8136e298b3a099c446",
      decimals: 18,
      id: "0x094c875704c14783049ddf8136e298b3a099c446",
      reserves_src: ["0x2295fc6BC32cD12fdBb852cFf4014cEAc6d79C10"],
      reserves_dest: ["0x2295fc6BC32cD12fdBb852cFf4014cEAc6d79C10"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "ABYSS",
      name: "ABYSS",
      address: "0x0e8d6b471e332f140e7d9dbb99e5e3822f728da6",
      decimals: 18,
      id: "0x0e8d6b471e332f140e7d9dbb99e5e3822f728da6",
      reserves_src: [
        "0x3e9FFBA3C3eB91f501817b031031a71de2d3163B",
        "0x1C802020Eea688E2B05936CDb98b8E6894ACC1c2"
      ],
      reserves_dest: [
        "0x3e9FFBA3C3eB91f501817b031031a71de2d3163B",
        "0x1C802020Eea688E2B05936CDb98b8E6894ACC1c2"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "WBTC",
      name: "Wrapped BTC",
      address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      decimals: 8,
      id: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      reserves_src: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x7a3370075a54B187d7bD5DceBf0ff2B5552d4F7D",
        "0x485c4Ec93D18eBd16623D455567886475aE28D04",
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0"
      ],
      reserves_dest: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x7a3370075a54B187d7bD5DceBf0ff2B5552d4F7D",
        "0x485c4Ec93D18eBd16623D455567886475aE28D04",
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "MLN",
      name: "Melon Token",
      address: "0xec67005c4e498ec7f55e092bd1d35cbc47c91892",
      decimals: 18,
      id: "0xec67005c4e498ec7f55e092bd1d35cbc47c91892",
      reserves_src: ["0xa33c7c22d0BB673c2aEa2C048BB883b679fa1BE9"],
      reserves_dest: ["0xa33c7c22d0BB673c2aEa2C048BB883b679fa1BE9"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      decimals: 6,
      id: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      reserves_src: [
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0",
        "0x1670DFb52806DE7789D5cF7D5c005cf7083f9A5D",
        "0x7a3370075a54B187d7bD5DceBf0ff2B5552d4F7D",
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F"
      ],
      reserves_dest: [
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0x5D154c145Db2ca90B8aB5e8Fe3E716AfA4AB7Ff0",
        "0x1670DFb52806DE7789D5cF7D5c005cf7083f9A5D",
        "0x7a3370075a54B187d7bD5DceBf0ff2B5552d4F7D",
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "EURS",
      name: "STASIS EURS",
      address: "0xdb25f211ab05b1c97d595516f45794528a807ad8",
      decimals: 2,
      id: "0xdb25f211ab05b1c97d595516f45794528a807ad8",
      reserves_src: ["0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"],
      reserves_dest: ["0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "CDT",
      name: "CoinDash",
      address: "0x177d39ac676ed1c67a2b268ad7f1e58826e5b0af",
      decimals: 18,
      id: "0x177d39ac676ed1c67a2b268ad7f1e58826e5b0af",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "MCO",
      name: "Monaco",
      address: "0xb63b606ac810a52cca15e44bb630fd42d8d1d83d",
      decimals: 8,
      id: "0xb63b606ac810a52cca15e44bb630fd42d8d1d83d",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "PAX",
      name: "Paxos Standard",
      address: "0x8e870d67f660d95d5be530380d0ec0bd388289e1",
      decimals: 18,
      id: "0x8e870d67f660d95d5be530380d0ec0bd388289e1",
      reserves_src: [
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0x7a3370075a54B187d7bD5DceBf0ff2B5552d4F7D",
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F"
      ],
      reserves_dest: [
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0x7a3370075a54B187d7bD5DceBf0ff2B5552d4F7D",
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "GEN",
      name: "DAOStack",
      address: "0x543ff227f64aa17ea132bf9886cab5db55dcaddf",
      decimals: 18,
      id: "0x543ff227f64aa17ea132bf9886cab5db55dcaddf",
      reserves_src: ["0xAA14DCAA0AdbE79cBF00edC6cC4ED17ed39240AC"],
      reserves_dest: ["0xAA14DCAA0AdbE79cBF00edC6cC4ED17ed39240AC"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "LRC",
      name: "Loopring",
      address: "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd",
      decimals: 18,
      id: "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "RLC",
      name: "iExec RLC",
      address: "0x607f4c5bb672230e8672085532f7e901544a7375",
      decimals: 9,
      id: "0x607f4c5bb672230e8672085532f7e901544a7375",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "NPXS",
      name: "Pundi X",
      address: "0xa15c7ebe1f07caf6bff097d8a589fb8ac49ae5b3",
      decimals: 18,
      id: "0xa15c7ebe1f07caf6bff097d8a589fb8ac49ae5b3",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "GNO",
      name: "Gnosis",
      address: "0x6810e776880c02933d47db1b9fc05908e5386b96",
      decimals: 18,
      id: "0x6810e776880c02933d47db1b9fc05908e5386b96",
      reserves_src: [
        "0x05461124C86C0AD7C5d8E012e1499fd9109fFb7d",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7"
      ],
      reserves_dest: [
        "0x05461124C86C0AD7C5d8E012e1499fd9109fFb7d",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "MYB",
      name: "MyBit",
      address: "0x5d60d8d7ef6d37e16ebabc324de3be57f135e0bc",
      decimals: 18,
      id: "0x5d60d8d7ef6d37e16ebabc324de3be57f135e0bc",
      reserves_src: ["0x1833AD67362249823515B59A8aA8b4f6B4358d1B"],
      reserves_dest: ["0x1833AD67362249823515B59A8aA8b4f6B4358d1B"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "BAM",
      name: "Bamboo",
      address: "0x22b3faaa8df978f6bafe18aade18dc2e3dfa0e0c",
      decimals: 18,
      id: "0x22b3faaa8df978f6bafe18aade18dc2e3dfa0e0c",
      reserves_src: ["0x302B35bd0B01312ec2652783c04955D7200C3D9b"],
      reserves_dest: ["0x302B35bd0B01312ec2652783c04955D7200C3D9b"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "SPN",
      name: "Sapien Network",
      address: "0x20f7a3ddf244dc9299975b4da1c39f8d5d75f05a",
      decimals: 6,
      id: "0x20f7a3ddf244dc9299975b4da1c39f8d5d75f05a",
      reserves_src: ["0x6b84DBd29643294703dBabf8Ed97cDef74EDD227"],
      reserves_dest: ["0x6b84DBd29643294703dBabf8Ed97cDef74EDD227"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "EQUAD",
      name: "Quadrant Protocol",
      address: "0xc28e931814725bbeb9e670676fabbcb694fe7df2",
      decimals: 18,
      id: "0xc28e931814725bbeb9e670676fabbcb694fe7df2",
      reserves_src: ["0x0232Ba609782Cea145Ec3663F52CF7aEb4AC773C"],
      reserves_dest: ["0x0232Ba609782Cea145Ec3663F52CF7aEb4AC773C"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "UPP",
      name: "Sentinel Protocol",
      address: "0xc86d054809623432210c107af2e3f619dcfbf652",
      decimals: 18,
      id: "0xc86d054809623432210c107af2e3f619dcfbf652",
      reserves_src: ["0x7e2fd015616263Add31a2AcC2A437557cEe80Fc4"],
      reserves_dest: ["0x7e2fd015616263Add31a2AcC2A437557cEe80Fc4"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "CND",
      name: "Cindicator",
      address: "0xd4c435f5b09f855c3317c8524cb1f586e42795fa",
      decimals: 18,
      id: "0xd4c435f5b09f855c3317c8524cb1f586e42795fa",
      reserves_src: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      reserves_dest: ["0x63825c174ab367968EC60f061753D3bbD36A0D8F"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      decimals: 6,
      id: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      reserves_src: [
        "0x7a3370075a54B187d7bD5DceBf0ff2B5552d4F7D",
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F"
      ],
      reserves_dest: [
        "0x7a3370075a54B187d7bD5DceBf0ff2B5552d4F7D",
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "SNX",
      name: "Synthetix Network",
      address: "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
      decimals: 18,
      id: "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
      reserves_src: ["0xa107dfa919c3f084a7893A260b99586981beb528"],
      reserves_dest: ["0xa107dfa919c3f084a7893A260b99586981beb528"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "BTU",
      name: "BTU Protocol",
      address: "0xb683d83a532e2cb7dfa5275eed3698436371cc9f",
      decimals: 18,
      id: "0xb683d83a532e2cb7dfa5275eed3698436371cc9f",
      reserves_src: ["0x08030715560a146E306b87CA93Fd618bb2A80363"],
      reserves_dest: ["0x08030715560a146E306b87CA93Fd618bb2A80363"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "TKN",
      name: "Monolith",
      address: "0xaaaf91d9b90df800df4f55c205fd6989c977e73a",
      decimals: 8,
      id: "0xaaaf91d9b90df800df4f55c205fd6989c977e73a",
      reserves_src: ["0x3480E12B6C2438e02319e34b4c23770679169190"],
      reserves_dest: ["0x3480E12B6C2438e02319e34b4c23770679169190"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    }
  ],
  3: [
    {
      symbol: "KNC",
      name: "KyberNetwork",
      address: "0x4e470dc7321e84ca96fcaedd0c8abcebbaeb68c6",
      decimals: 18,
      id: "0x4e470dc7321e84ca96fcaedd0c8abcebbaeb68c6",
      reserves_src: [
        "0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a",
        "0x356DbBe12E42E8B57D89F24929d48300b0FcAB76"
      ],
      reserves_dest: [
        "0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a",
        "0x356DbBe12E42E8B57D89F24929d48300b0FcAB76"
      ],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "OMG",
      name: "OmiseGO",
      address: "0x4bfba4a8f28755cb2061c413459ee562c6b9c51b",
      decimals: 18,
      id: "0x4bfba4a8f28755cb2061c413459ee562c6b9c51b",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "EOS",
      name: "Eos",
      address: "0xd5b4218b950a53ff07985e2d88346925c335eae7",
      decimals: 18,
      id: "0xd5b4218b950a53ff07985e2d88346925c335eae7",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "SNT",
      name: "Status",
      address: "0xbf5d8683b9be6c43fca607eb2a6f2626a18837a6",
      decimals: 18,
      id: "0xbf5d8683b9be6c43fca607eb2a6f2626a18837a6",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "ELF",
      name: "Aelf",
      address: "0x9fcc27c7320703c43368cf1a4bf076402cd0d6b4",
      decimals: 18,
      id: "0x9fcc27c7320703c43368cf1a4bf076402cd0d6b4",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "POWR",
      name: "Power Ledger",
      address: "0xa577731515303f0c0d00e236041855a5c4f114dc",
      decimals: 6,
      id: "0xa577731515303f0c0d00e236041855a5c4f114dc",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "MANA",
      name: "Mana",
      address: "0x72fd6c7c1397040a66f33c2ecc83a0f71ee46d5c",
      decimals: 18,
      id: "0x72fd6c7c1397040a66f33c2ecc83a0f71ee46d5c",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "BAT",
      name: "Basic Attention Token",
      address: "0xdb0040451f373949a4be60dcd7b6b8d6e42658b6",
      decimals: 18,
      id: "0xdb0040451f373949a4be60dcd7b6b8d6e42658b6",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "REQ",
      name: "Request",
      address: "0xb43d10bbe7222519da899b72bf2c7f094b6f79d7",
      decimals: 18,
      id: "0xb43d10bbe7222519da899b72bf2c7f094b6f79d7",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "GTO",
      name: "Gifto",
      address: "0xe55c607d58c53b2b06a8e38f67f4c0fcaeed2c31",
      decimals: 5,
      id: "0xe55c607d58c53b2b06a8e38f67f4c0fcaeed2c31",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "RDN",
      name: "Raiden",
      address: "0x5422ef695ed0b1213e2b953cfa877029637d9d26",
      decimals: 18,
      id: "0x5422ef695ed0b1213e2b953cfa877029637d9d26",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "APPC",
      name: "AppCoins",
      address: "0x2799f05b55d56be756ca01af40bf7350787f48d4",
      decimals: 18,
      id: "0x2799f05b55d56be756ca01af40bf7350787f48d4",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "ENG",
      name: "Enigma",
      address: "0x95cc8d8f29d0f7fcc425e8708893e759d1599c97",
      decimals: 8,
      id: "0x95cc8d8f29d0f7fcc425e8708893e759d1599c97",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "SALT",
      name: "Salt",
      address: "0xb47f1a9b121ba114d5e98722a8948e274d0f4042",
      decimals: 8,
      id: "0xb47f1a9b121ba114d5e98722a8948e274d0f4042",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "BQX",
      name: "Ethos",
      address: "0x9504a86a881f63da06302fb3639d4582022097db",
      decimals: 8,
      id: "0x9504a86a881f63da06302fb3639d4582022097db",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "ADX",
      name: "AdEx",
      address: "0x499990db50b34687cdafb2c8dabae4e99d6f38a7",
      decimals: 4,
      id: "0x499990db50b34687cdafb2c8dabae4e99d6f38a7",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "AST",
      name: "AirSwap",
      address: "0xef06f410c26a0ff87b3a43927459cce99268a2ef",
      decimals: 4,
      id: "0xef06f410c26a0ff87b3a43927459cce99268a2ef",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "RCN",
      name: "Ripio Credit Network",
      address: "0x99338aa9218c6c23aa9d8cc2f3efaf29954ea26b",
      decimals: 18,
      id: "0x99338aa9218c6c23aa9d8cc2f3efaf29954ea26b",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "ZIL",
      name: "Zilliqa",
      address: "0xad78afbbe48ba7b670fbc54c65708cbc17450167",
      decimals: 12,
      id: "0xad78afbbe48ba7b670fbc54c65708cbc17450167",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "DAI",
      name: "DAI",
      address: "0xad6d458402f60fd3bd25163575031acdce07538d",
      decimals: 18,
      id: "0xad6d458402f60fd3bd25163575031acdce07538d",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "LINK",
      name: "Chain Link",
      address: "0xb4f7332ed719eb4839f091eddb2a3ba309739521",
      decimals: 18,
      id: "0xb4f7332ed719eb4839f091eddb2a3ba309739521",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "IOST",
      name: "IOStoken",
      address: "0x27db28a6c4ac3d82a08d490cfb746e6f02bc467c",
      decimals: 18,
      id: "0x27db28a6c4ac3d82a08d490cfb746e6f02bc467c",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "STORM",
      name: "Storm",
      address: "0x8fff7de21de8ad9c510704407337542073fdc44b",
      decimals: 18,
      id: "0x8fff7de21de8ad9c510704407337542073fdc44b",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "BBO",
      name: "BigBom",
      address: "0xa94758d328af7ef1815e73053e95b5f86588c16d",
      decimals: 18,
      id: "0xa94758d328af7ef1815e73053e95b5f86588c16d",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "COFI",
      name: "ConFi",
      address: "0xb91786188f8d4e35d6d67799e9f162587bf4da03",
      decimals: 18,
      id: "0xb91786188f8d4e35d6d67799e9f162587bf4da03",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "BITX",
      name: "BitScreenerToken",
      address: "0x7a17267576318efb728bc4a0833e489a46ba138f",
      decimals: 18,
      id: "0x7a17267576318efb728bc4a0833e489a46ba138f",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "MOC",
      name: "Moss Land",
      address: "0x1742c81075031b8f173d2327e3479d1fc3feaa76",
      decimals: 18,
      id: "0x1742c81075031b8f173d2327e3479d1fc3feaa76",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "MAS",
      name: "MidasProtocol Ropsten",
      address: "0xc2c37d1a2cdd601ce665c4a785074670657f83ac",
      decimals: 18,
      id: "0xc2c37d1a2cdd601ce665c4a785074670657f83ac",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "KAT",
      name: "Kambria Token",
      address: "0xef75e34c50c1b109fe65ee696f12225de508b9f2",
      decimals: 18,
      id: "0xef75e34c50c1b109fe65ee696f12225de508b9f2",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "UPP",
      name: "Sentinel Protocol",
      address: "0xade0e0ed3ec60c7124ddc88c410af671493dc949",
      decimals: 18,
      id: "0xade0e0ed3ec60c7124ddc88c410af671493dc949",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "SPN",
      name: "Sapien Network",
      address: "0x7f7992a21e333baeeab065d54829122173caceb7",
      decimals: 6,
      id: "0x7f7992a21e333baeeab065d54829122173caceb7",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "HKN",
      name: "Hacken",
      address: "0x4aefa5bded67f5842ade8f025a738cb3363b7499",
      decimals: 8,
      id: "0x4aefa5bded67f5842ade8f025a738cb3363b7499",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "WETH",
      name: "Wrapped Ether",
      address: "0xbca556c912754bc8e7d4aad20ad69a1b1444f42d",
      decimals: 18,
      id: "0xbca556c912754bc8e7d4aad20ad69a1b1444f42d",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "BAM",
      name: "Bamboo",
      address: "0xe8e692f05ecdd531c4550a93d323939fb826f968",
      decimals: 18,
      id: "0xe8e692f05ecdd531c4550a93d323939fb826f968",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "SNX",
      name: "Synthetix Network",
      address: "0x013ae307648f529aa72c5767a334ddd37aab43c3",
      decimals: 18,
      id: "0x013ae307648f529aa72c5767a334ddd37aab43c3",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "MYB",
      name: "MyBit",
      address: "0xc68d7c356e1b725f75cbaf1306a2603abd7157ca",
      decimals: 18,
      id: "0xc68d7c356e1b725f75cbaf1306a2603abd7157ca",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "SUSD",
      name: "Synth sUSD",
      address: "0x8ae2a0bfb3315b63ee8e88ac7d3f6b5a68f01cf5",
      decimals: 18,
      id: "0x8ae2a0bfb3315b63ee8e88ac7d3f6b5a68f01cf5",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "EQUAD",
      name: "Quadrant Protocol",
      address: "0x0e953389a6002a2017d686ff9f448a1eab890d7b",
      decimals: 18,
      id: "0x0e953389a6002a2017d686ff9f448a1eab890d7b",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "BTU",
      name: "BTU Protocol",
      address: "0xfcd404ec70c662128d3a6bd508dfb3e598d79a0c",
      decimals: 18,
      id: "0xfcd404ec70c662128d3a6bd508dfb3e598d79a0c",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "XD",
      name: "Data Transaction Token",
      address: "0xeaf845462e78cfba40a2f11c13154ce5f103eeff",
      decimals: 18,
      id: "0xeaf845462e78cfba40a2f11c13154ce5f103eeff",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "TKN",
      name: "Monolith",
      address: "0xaa15075edf8e33867687428d0e49ae898e5b3513",
      decimals: 8,
      id: "0xaa15075edf8e33867687428d0e49ae898e5b3513",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    },
    {
      symbol: "FRECNX",
      name: "FreldoCoinX",
      address: "0xacbdbc20459d98c902e748b09cfbd5dd98b23cf9",
      decimals: 18,
      id: "0xacbdbc20459d98c902e748b09cfbd5dd98b23cf9",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }
    }
  ]
};
